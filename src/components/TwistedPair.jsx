import { useEffect, useRef } from 'react'
import { useMotion, useInView } from '../hooks/motion'

const ORANGE = '#FF8A2B'
const MINT = '#9BE7BE'
const SPRUCE = '#0F3325'
const TWISTS = 7 // odd, so the pair is continuous on both sides of the loop
const DRAW_MS = 900
const OPEN_MS = 700
const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

// Draws the cable behind the hero: a tight twist that opens into a loop
// around the portrait. Geometry is measured from the portrait element.
export function TwistedPair({ portraitRef }) {
  const canvasRef = useRef(null)
  const elapsed = useRef(0)
  const motion = useMotion()
  const inView = useInView(canvasRef, { threshold: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let geo
    let raf = 0
    let last = 0

    const measure = () => {
      const box = canvas.getBoundingClientRect()
      const art = portraitRef.current
      const p = art.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(box.width * dpr)
      canvas.height = Math.round(box.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const r = art.offsetWidth / 2 // unscaled, because the portrait animates in
      const span = r * 3.64
      const px = p.left - box.left + p.width / 2
      const H = span / TWISTS
      geo = {
        w: box.width,
        h: box.height,
        H,
        span,
        cy: p.top - box.top + p.height / 2,
        x0: px - span / 2,
        tight: H * 0.36,
        loop: r * 1.34,
        sw: Math.max(14, r * 0.136),
      }
    }

    const offset = (x, open) => {
      const { x0, H, span, tight, loop } = geo
      const twist = -tight * Math.sin((Math.PI * (x - x0)) / H)
      if (x < x0 || x > x0 + span) return twist
      const round = -loop * Math.sin((Math.PI * (x - x0)) / span)
      return twist + (round - twist) * open
    }

    const buildStrand = (sign, front, open) => {
      const pts = []
      let len = 0
      const end = Math.min(front, geo.w + 24)
      for (let x = -24; x <= end; x += 4) {
        const y = geo.cy + sign * offset(x, open)
        if (pts.length) len += Math.hypot(4, y - pts[pts.length - 1].y)
        pts.push({ x, y, len })
      }
      return pts
    }

    const stroke = (pts, a, b, color, width, dash) => {
      const i0 = Math.max(0, Math.floor((a + 24) / 4))
      const i1 = Math.min(pts.length - 1, Math.ceil((b + 24) / 4))
      if (i1 <= i0) return
      ctx.beginPath()
      for (let i = i0; i <= i1; i++) ctx.lineTo(pts[i].x, pts[i].y)
      ctx.setLineDash(dash || [])
      ctx.lineDashOffset = dash ? pts[i0].len : 0
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.stroke()
    }

    const strand = (pts, a, b, color, packets) => {
      stroke(pts, a, b, color, geo.sw)
      stroke(pts, a, b, 'rgba(255,255,255,.75)', geo.sw / 8, [16, 12])
      for (const x of packets) {
        const from = Math.max(a, x - 13)
        const to = Math.min(b, x + 13)
        if (to > from) stroke(pts, from, to, '#fff', geo.sw * 0.52)
      }
    }

    const draw = (ms) => {
      const { w, h, x0, H, sw } = geo
      const front = -24 + (w + 48) * ease(ms / DRAW_MS)
      const open = ease((ms - DRAW_MS * 0.7) / OPEN_MS)
      const moving = Number.isFinite(ms) && ms > DRAW_MS + OPEN_MS
      ctx.clearRect(0, 0, w, h)
      ctx.lineJoin = 'round'
      const a = buildStrand(1, front, open)
      const b = buildStrand(-1, front, open)
      const run = moving ? ms - DRAW_MS - OPEN_MS : 0
      const travel = w + 120
      // Transmit runs left to right, receive runs right to left.
      const tx = moving ? [0, 0.5].map((o) => ((run * 0.2 + o * travel) % travel) - 60) : []
      const rx = moving ? [0.25, 0.75].map((o) => w + 60 - ((run * 0.2 + o * travel) % travel)) : []

      const first = Math.floor((-24 - x0) / H)
      const final = Math.ceil((w + 24 - x0) / H)
      for (let k = first; k <= final; k++) {
        const x = x0 + k * H
        const from = x - H / 2 - 2
        const to = x + H / 2 + 2
        const orangeTop = k % 2 === 0
        const under = orangeTop ? [b, MINT, rx] : [a, ORANGE, tx]
        const over = orangeTop ? [a, ORANGE, tx] : [b, MINT, rx]
        strand(under[0], from, to, under[1], under[2])
        if (Math.abs(offset(x, open)) < sw * 0.6) {
          stroke(over[0], x - H * 0.26, x + H * 0.26, SPRUCE, sw * 1.5)
        }
        strand(over[0], from, to, over[1], over[2])
      }
    }

    const frame = (now) => {
      elapsed.current += last ? Math.min(now - last, 500) : 0
      last = now
      draw(elapsed.current)
      raf = requestAnimationFrame(frame)
    }
    const still = () => draw(Infinity)

    const playing = motion && inView
    measure()
    if (playing) raf = requestAnimationFrame(frame)
    else still()

    const ro = new ResizeObserver(() => {
      measure()
      if (!playing) still()
    })
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [motion, inView, portraitRef])

  return <canvas ref={canvasRef} className="pair" aria-hidden="true" />
}
