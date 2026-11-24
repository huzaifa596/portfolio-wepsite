import { useRef } from 'react'
import { useInView } from '../hooks/motion'

// T568B pin order. Pins 1 and 2 transmit, 3 and 6 receive.
const WIRES = [
  ['#FF8A2B', true, true],
  ['#FF8A2B', false, true],
  ['#9BE7BE', true, true],
  ['#5B8DEF', false, false],
  ['#5B8DEF', true, false],
  ['#9BE7BE', false, true],
  ['#9A6B4B', true, false],
  ['#9A6B4B', false, false],
]

export function Plug({ got }) {
  const ref = useRef(null)
  const on = useInView(ref, { once: true, threshold: 0.4 })
  return (
    <svg ref={ref} className={`plug${on ? ' on' : ''}${got ? ' got' : ''}`} viewBox="0 10 360 310" aria-hidden="true">
      {WIRES.map(([color, striped, live], i) => {
        const x = 53 + i * 36
        return (
          <g key={i} opacity={live ? 1 : 0.28}>
            {striped && <path d={`M${x} 80V460`} stroke="#fff" strokeWidth="20" />}
            <path d={`M${x} 80V460`} stroke={color} strokeWidth="20" strokeDasharray={striped ? '18 18' : undefined} />
          </g>
        )
      })}
      <rect x="22" y="22" width="316" height="260" rx="12" fill="#fff" fillOpacity=".1" stroke="#B4CDBF" strokeWidth="3" />
      {WIRES.map(([, , live], i) => (
        <rect key={i} className={live ? 'pin live' : 'pin'} style={{ '--i': i }} x={46 + i * 36} y="22" width="14" height="74" />
      ))}
    </svg>
  )
}
