import { useEffect, useRef, useState } from 'react'
import { useMotion, useInView } from '../hooks/motion'

const COLS = 32
const ROWS = 14
const INKS = ['#FF8A2B', '#9BE7BE', '#F3F6F1', '#5B8DEF']

// A text-mode screen: balloons are characters that rise on each timer tick.
export function PopScreen() {
  const ref = useRef(null)
  const balloons = useRef(null)
  const motion = useMotion()
  const inView = useInView(ref, { threshold: 0.3 })
  const [score, setScore] = useState(0)
  const [ticks, setTicks] = useState(0)

  if (!balloons.current) {
    balloons.current = Array.from({ length: 7 }, (_, i) => ({ c: 3 + ((i * 17) % (COLS - 6)), r: 2 + ((i * 7) % ROWS), ink: INKS[i % 4], burst: 0 }))
  }

  const paint = () => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const cw = canvas.width / COLS
    const ch = canvas.height / ROWS
    ctx.fillStyle = '#04100b'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = `600 ${ch * 1.02}px "Martian Mono Variable", monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const put = (s, c, r, ink) => {
      ctx.fillStyle = ink
      ctx.fillText(s, (c + 0.5) * cw, (r + 0.5) * ch)
    }
    for (const b of balloons.current) {
      if (b.burst) {
        for (const [dc, dr, s] of [[0, 0, '*'], [-1, -1, '\\'], [1, -1, '/'], [-1, 1, '/'], [1, 1, '\\']]) put(s, b.c + dc, b.r + dr, '#fff')
      } else {
        put('(', b.c - 1, b.r, b.ink)
        put('@', b.c, b.r, b.ink)
        put(')', b.c + 1, b.r, b.ink)
        put('|', b.c, b.r + 1, '#6d8a7b')
      }
    }
  }

  useEffect(() => {
    paint()
    document.fonts?.ready.then(() => ref.current && paint())
    if (!motion || !inView) return
    const id = setInterval(() => {
      for (const b of balloons.current) {
        if (b.burst && b.burst++ < 4) continue
        b.r -= 1
        if (b.burst || b.r < -2) Object.assign(b, { r: ROWS + Math.floor(Math.random() * 5), c: 2 + Math.floor(Math.random() * (COLS - 4)), burst: 0 })
      }
      setTicks((t) => t + 4)
      paint()
    }, 220) // four ticks of the 18.2 Hz timer
    return () => clearInterval(id)
  }, [motion, inView])

  const pop = (e) => {
    const box = ref.current.getBoundingClientRect()
    const keyboard = e.detail === 0
    const c = ((e.clientX - box.left) / box.width) * COLS
    const r = ((e.clientY - box.top) / box.height) * ROWS
    const live = balloons.current.filter((b) => !b.burst && b.r >= 0 && b.r < ROWS)
    const hit = keyboard ? live[0] : live.map((b) => [Math.hypot((b.c + 0.5 - c) * 0.6, b.r + 0.5 - r), b]).sort((x, y) => x[0] - y[0]).filter(([d]) => d < 2.6).map(([, b]) => b)[0]
    if (!hit) return
    hit.burst = 1
    setScore((s) => s + 1)
    paint()
  }

  return (
    <div className="crt">
      <button type="button" className="crt-screen" onClick={pop} aria-label={`Pop a balloon. ${score} popped so far.`}>
        <canvas ref={ref} width="880" height="660" />
      </button>
      <p className="label crt-status" aria-hidden="true">
        <span>INT 08h tick {String(ticks).padStart(5, '0')}</span>
        <span>{score ? `popped ${String(score).padStart(3, '0')}` : 'press one to pop it'}</span>
      </p>
    </div>
  )
}
