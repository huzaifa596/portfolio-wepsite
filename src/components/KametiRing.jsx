import { useEffect, useRef, useState } from 'react'
import { useMotion, useInView } from '../hooks/motion'

const MEMBERS = 6
const C = 220
const R = 156
const at = (i) => {
  const t = (i / MEMBERS) * Math.PI * 2 - Math.PI / 2
  return [C + R * Math.cos(t), C + R * Math.sin(t)]
}
// Each round every member pays in, then one member takes the pot.
const PHASES = [
  ['ready', 350],
  ['collect', 1300],
  ['payout', 1500],
]

export function KametiRing() {
  const ref = useRef(null)
  const motion = useMotion()
  const inView = useInView(ref, { threshold: 0.4 })
  const [{ round, phase }, setState] = useState({ round: 0, phase: 2 })
  const playing = motion && inView

  useEffect(() => {
    if (!playing) return
    const id = setTimeout(
      () => setState((s) => (s.phase < 2 ? { ...s, phase: s.phase + 1 } : { round: (s.round + 1) % MEMBERS, phase: 0 })),
      PHASES[phase][1],
    )
    return () => clearTimeout(id)
  }, [playing, phase, round])

  const name = PHASES[phase][0]
  const [wx, wy] = at(round)
  return (
    <div className="kameti-panel">
      <svg ref={ref} className={`kameti is-${name}`} viewBox="0 0 440 440" role="img" aria-label="A savings committee. Every member pays in each round, and one member takes the whole pot.">
        <circle cx={C} cy={C} r={R} className="k-orbit" />
        {Array.from({ length: MEMBERS }, (_, i) => {
          const [x, y] = at(i)
          return <path key={i} d={`M${x} ${y}L${C} ${C}`} className="k-spoke" />
        })}
        {Array.from({ length: MEMBERS }, (_, i) => {
          const [x, y] = at(i)
          const home = name === 'ready'
          return <circle key={i} r="10" className="k-coin" style={{ transform: `translate(${home ? x : C}px, ${home ? y : C}px)` }} />
        })}
        <circle r="20" className="k-pot-coin" style={{ transform: name === 'payout' ? `translate(${wx}px, ${wy}px)` : `translate(${C}px, ${C}px)` }} />
        <circle cx={C} cy={C} r="58" className="k-pot" />
        <text x={C} y={C - 4} className="k-text">round</text>
        <text x={C} y={C + 24} className="k-round">{round + 1} of {MEMBERS}</text>
        {Array.from({ length: MEMBERS }, (_, i) => {
          const [x, y] = at(i)
          const took = i < round || (i === round && name === 'payout')
          return (
            <g key={i} className={took ? 'k-member took' : 'k-member'}>
              <circle cx={x} cy={y} r="32" />
              <path d={`M${x - 13} ${y + 17}a13 13 0 0 1 26 0M${x - 7} ${y - 6}a7 7 0 1 0 14 0a7 7 0 1 0 -14 0`} />
            </g>
          )
        })}
      </svg>
      <p className="label k-caption">{name === 'payout' ? 'one member takes the pot' : 'everyone pays in'}</p>
    </div>
  )
}
