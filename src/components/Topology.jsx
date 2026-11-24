import { useEffect, useRef, useState } from 'react'
import { useMotion, useInView } from '../hooks/motion'

const N = { a: [50, 260], b: [190, 100], c: [200, 400], d: [370, 230], e: [500, 70], f: [510, 410], g: [610, 250] }
const line = (p, q) => `M${N[p].join(' ')}L${N[q].join(' ')}`
const route = (nodes) => 'M' + [...nodes].map((n) => N[n].join(' ')).join('L')
const DIRECT = route('abdg')
const SAFE = route('acfg')
const STEPS = [2200, 1300, 3000] // direct, congestion predicted, rerouted

// Rests on the rerouted state, which is the whole point of the picture.
export function Topology() {
  const ref = useRef(null)
  const motion = useMotion()
  const inView = useInView(ref)
  const [step, setStep] = useState(2)
  const playing = motion && inView

  useEffect(() => {
    if (!playing) {
      setStep(2)
      return
    }
    const id = setTimeout(() => setStep((s) => (s + 1) % 3), STEPS[step])
    return () => clearTimeout(id)
  }, [playing, step])

  const active = step === 2 ? 'acfg' : 'abdg'
  return (
    <svg
      ref={ref}
      className={`topology step-${step}`}
      viewBox="0 0 660 480"
      role="img"
      aria-label="Network diagram. A model predicts congestion on the direct link, and traffic moves to another route first."
    >
      {['ab', 'ac', 'bd', 'cd', 'be', 'cf', 'eg', 'fg', 'bc', 'dg'].map((k) => (
        <path key={k} d={line(k[0], k[1])} className="t-link" />
      ))}
      <path d={DIRECT} className="t-route t-direct" />
      <path d={SAFE} className="t-route t-safe" />
      <path d={line('d', 'g')} className="t-risk" />
      {playing
        ? [0, 1, 2].map((i) => (
            <g key={i}>
              {[['t-direct', DIRECT], ['t-safe', SAFE]].map(([c, d]) => (
                <rect key={c} className={`t-packet ${c}`} x="-11" y="-8" width="22" height="16" rx="3">
                  <animateMotion dur="2.4s" begin={`${-i * 0.8}s`} repeatCount="indefinite" path={d} />
                </rect>
              ))}
            </g>
          ))
        : [[125, 330], [300, 403], [420, 406], [560, 330]].map(([x, y]) => (
            <rect key={x} className="t-packet t-safe" x={x - 11} y={y - 8} width="22" height="16" rx="3" />
          ))}
      {Object.entries(N).map(([k, [x, y]]) => (
        <circle key={k} cx={x} cy={y} r={'ag'.includes(k) ? 24 : 17} className={active.includes(k) ? 't-node on' : 't-node'} />
      ))}
      <text x="352" y="200" className="t-label t-label-risk">congestion predicted</text>
      <text x="262" y="462" className="t-label t-label-safe">traffic moved here first</text>
    </svg>
  )
}
