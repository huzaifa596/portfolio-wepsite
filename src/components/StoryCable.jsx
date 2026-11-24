import { useEffect, useRef } from 'react'
import { useMotion, useInView } from '../hooks/motion'

const WHITE = [244, 248, 244]
const ORANGE = [255, 138, 43]
const MINT = [155, 231, 190]
const EDGE = '#0A2419'
const STEP = 5

const clamp = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)
const ramp = (v, a, b) => smooth(clamp((v - a) / (b - a)))
const mix = (a, b, t) => a + (b - a) * t
const rgb = (c) => `rgb(${c.map(Math.round).join(' ')})`
const blend = (a, b, t) => rgb(a.map((v, i) => mix(v, b[i], t)))

// One cable runs through the whole story and draws itself as you read.
// It follows the empty .lane column of each chapter, so CSS decides its route.
// Chapter 1 is a plain wire, 2 dyes it orange, 6 brings in mint, 7 twists them.
export function StoryCable({ storyRef }) {
  const canvasRef = useRef(null)
  const tipRef = useRef(0)
  const motion = useMotion()
  const inView = useInView(canvasRef, { threshold: 0 })

  useEffect(() => {
    const story = storyRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let pts = []
    let chunks = []
    let size = {}
    let raf = 0
    let clock = 0
    let last = 0

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const top0 = story.getBoundingClientRect().top
      const left0 = story.getBoundingClientRect().left
      const lanes = [...story.querySelectorAll('[data-lane]')].map((el) => {
        const r = el.getBoundingClientRect()
        const page = el.closest('[data-page]').getBoundingClientRect()
        return { key: el.dataset.lane, x: r.left - left0 + r.width / 2, top: page.top - top0, bottom: page.bottom - top0 }
      })
      if (!lanes.length) return
      const small = w < 961
      const sw = small ? 8 : 18
      const A = small ? 8 : 22
      const H = small ? 30 : 66
      const sep = small ? 15 : 44
      const turn = small ? 60 : 260
      const page = (key) => lanes.find((l) => l.key === key)
      const dye = page('the-first-colour')
      const join = page('a-second-strand')
      const twist = page('twisted-together')
      const plug = story.querySelector('.plug')?.getBoundingClientRect()
      const endY = plug ? plug.top - top0 + 6 : story.offsetHeight
      size = { w, h, sw }

      // Centre line, with a slow sway so it never looks ruled.
      const centre = (y) => {
        let i = lanes.findIndex((l) => y < l.bottom)
        if (i < 0) i = lanes.length - 1
        let x = lanes[i].x
        const next = lanes[i + 1]
        const prev = lanes[i - 1]
        if (next && y > lanes[i].bottom - turn) x = mix(x, next.x, ramp(y, lanes[i].bottom - turn, lanes[i].bottom + turn))
        else if (prev && y < lanes[i].top + turn) x = mix(prev.x, x, ramp(y, lanes[i].top - turn, lanes[i].top + turn))
        return x + Math.sin(y / 210) * (small ? 2.5 : 16) * ramp(endY - y, 0, 300)
      }

      pts = []
      let len = 0
      for (let y = 0; y <= endY; y += STEP) {
        const cx = centre(y)
        const dx = (centre(y + 2) - centre(y - 2)) / 4
        const n = Math.hypot(1, dx)
        if (pts.length) len += Math.hypot(cx - pts[pts.length - 1].cx, STEP)
        const phi = (Math.PI * len) / H
        const tw = ramp(y, twist.top - 160, twist.top + 340)
        const here = y >= join.top + turn
        const arrive = ramp(y, join.top + turn, join.top + turn + 400)
        const edge = small ? -(cx + 20) : w - cx + 40
        const side = small ? -1 : 1
        const o = mix(0, mix(-side * (sep / 2), A * Math.sin(phi), tw), arrive)
        const m = mix(edge, mix(side * (sep / 2), -A * Math.sin(phi), tw), arrive)
        const nx = 1 / n
        const ny = -dx / n
        pts.push({
          y, cx, len, tw, here, phi,
          k: Math.round(phi / Math.PI),
          dye: ramp(y, dye.top + 60, dye.top + (dye.bottom - dye.top) * 0.6),
          ox: cx + nx * o, oy: y + ny * o,
          mx: cx + nx * m, my: y + ny * m,
          gap: Math.abs(o - m),
        })
      }
      chunks = []
      for (let i = 0; i < pts.length; i++) {
        const c = chunks[chunks.length - 1]
        if (c && c.k === pts[i].k && i - c.from < 60) c.to = i
        else chunks.push({ k: pts[i].k, from: i, to: i })
      }
    }

    const line = (a, b, strand, color, width, dash) => {
      if (b <= a) return
      const X = strand + 'x'
      const Y = strand + 'y'
      ctx.beginPath()
      for (let i = a; i <= b; i++) ctx.lineTo(pts[i][X], pts[i][Y])
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.setLineDash(dash || [])
      ctx.lineDashOffset = dash ? pts[a].len : 0
      ctx.stroke()
    }

    const wire = (a, b, strand, color) => {
      const { sw } = size
      line(a, b, strand, EDGE, sw + (sw > 10 ? 5 : 3))
      line(a, b, strand, color, sw)
      line(a, b, strand, 'rgba(255,255,255,.7)', Math.max(1, sw / 8), [14, 12])
    }

    const draw = (time) => {
      const { w, h, sw } = size
      if (!pts.length) return
      const scroll = -story.getBoundingClientRect().top
      ctx.setTransform(ctx.getTransform().a, 0, 0, ctx.getTransform().a, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(0, -Math.max(0, scroll))
      ctx.lineJoin = 'round'
      const seeTop = scroll - 80
      const seeBottom = scroll + h + 80

      // Follow the reader in arc length, so sideways runs glide.
      const want = pts[Math.min(pts.length - 1, Math.max(0, Math.floor((scroll + h * 0.64) / STEP)))].len
      tipRef.current = motion ? tipRef.current + (want - tipRef.current) * 0.13 : pts[pts.length - 1].len
      const tip = tipRef.current
      let tipIndex = 0

      for (const c of chunks) {
        if (pts[c.from].len > tip) break
        let to = Math.min(pts.length - 1, c.to + 1)
        while (to > c.from && pts[to].len > tip) to--
        tipIndex = to
        if (pts[to].y < seeTop || pts[c.from].y > seeBottom) continue
        const mid = pts[(c.from + to) >> 1]
        const color = blend(WHITE, ORANGE, mid.dye)
        const start = Math.max(0, c.from - 1)
        if (!mid.here) {
          wire(start, to, 'o', color)
          continue
        }
        const orangeTop = c.k % 2 === 0
        const order = orangeTop ? [['m', rgb(MINT)], ['o', color]] : [['o', color], ['m', rgb(MINT)]]
        wire(start, to, order[0][0], order[0][1])
        if (mid.tw > 0.4 && mid.gap < sw * 1.1) {
          ctx.globalCompositeOperation = 'destination-out'
          const pad = Math.floor((to - c.from) * 0.2)
          line(c.from + pad, to - pad, order[1][0], '#000', sw * 1.6)
          ctx.globalCompositeOperation = 'source-over'
        }
        wire(start, to, order[1][0], order[1][1])
      }

      if (motion) {
        const total = pts[pts.length - 1].len
        const span = 820
        for (let j = 0; j < total / span; j++) {
          for (const [strand, dir] of [['o', 1], ['m', -1]]) {
            const at = (((j * span + dir * time * 0.16) % total) + total) % total
            if (at > tip - 30) continue
            const i = find(at)
            const p = pts[i]
            if (p.y < seeTop || p.y > seeBottom || (strand === 'm' && !p.here) || p.dye < 0.5) continue
            if (p.tw > 0.5 && (p.k % 2 === 0) !== (strand === 'o')) continue
            const reach = sw > 10 ? 4 : 2
            line(Math.max(0, i - reach), Math.min(pts.length - 1, i + reach), strand, '#fff', sw * 0.5)
          }
        }
        const t = pts[tipIndex]
        ctx.setLineDash([])
        if (t && tipIndex < pts.length - 3) {
          for (const strand of t.here ? ['m', 'o'] : ['o']) {
            ctx.beginPath()
            ctx.arc(t[strand + 'x'], t[strand + 'y'], sw * 0.72, 0, 7)
            ctx.fillStyle = '#fff'
            ctx.fill()
            ctx.lineWidth = Math.max(2, sw * 0.28)
            ctx.strokeStyle = strand === 'm' ? rgb(MINT) : blend([120, 140, 130], ORANGE, t.dye)
            ctx.stroke()
          }
        }
      }
      ctx.restore()
    }

    const find = (len) => {
      let a = 0
      let b = pts.length - 1
      while (a < b) {
        const m = (a + b) >> 1
        if (pts[m].len < len) a = m + 1
        else b = m
      }
      return a
    }

    const frame = (now) => {
      clock += last ? Math.min(now - last, 100) : 0
      last = now
      draw(clock)
      raf = requestAnimationFrame(frame)
    }
    const still = () => draw(0)

    build()
    const playing = motion && inView
    if (playing) raf = requestAnimationFrame(frame)
    else still()
    if (!playing) addEventListener('scroll', still, { passive: true })
    const ro = new ResizeObserver(() => {
      build()
      if (!playing) still()
    })
    ro.observe(story)
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', still)
      ro.disconnect()
    }
  }, [motion, inView, storyRef])

  return <canvas ref={canvasRef} className="story-cable" aria-hidden="true" />
}
