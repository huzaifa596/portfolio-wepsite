import { useRef } from 'react'
import { useInView } from '../hooks/motion'
import { award, feature, research, sanjhi, sites } from '../content'
import { KametiRing } from './KametiRing'
import { PopScreen } from './PopScreen'
import { Topology } from './Topology'
import { External, Stack } from './Bits'

const School = () => (
  <div className="school">
    <p className="school-mark"><strong>1067</strong><span>of 1100 in matric</span></p>
    <ol className="stops">
      <li><span className="label">2020 to 2022</span>Unique High School</li>
      <li><span className="label">2022 to 2024</span>Government College University</li>
      <li className="stop-next"><span className="label">Aug 2024</span>FAST-NUCES</li>
    </ol>
  </div>
)

const Loop = () => (
  <svg className="loop" viewBox="0 0 440 440" role="img" aria-label="The game loop: read input, move, check collision, draw, then again.">
    <circle cx="220" cy="220" r="140" className="loop-ring" />
    <g className="loop-dot"><circle cx="220" cy="80" r="15" /></g>
    {[['Read input', 220, 80], ['Move', 360, 220], ['Check collision', 220, 360], ['Draw', 80, 220]].map(([t, x, y], i) => {
      const w = t.length * 11 + 40
      return (
        <g key={t} className="loop-step" style={{ '--i': i }}>
          <rect x={Math.min(440 - w, Math.max(0, x - w / 2))} y={y - 24} width={w} height="48" rx="8" />
          <text x={Math.min(440 - w, Math.max(0, x - w / 2)) + w / 2} y={y + 6}>{t}</text>
        </g>
      )
    })}
    <text x="220" y="216" className="loop-mid">C++</text>
    <text x="220" y="242" className="loop-sub">December 2024</text>
  </svg>
)

const Sites = () => (
  <div className="sites">
    {sites.map((s) => (
      <External key={s.host} className="site-card" href={`https://${s.host}`}>
        <span className="site-frame">
          <span className="site-bar label"><i /><i /><span>{s.host}</span></span>
          <span className="site-shot"><img src={`/assets/sites/${s.shot}.webp`} width="880" height="591" alt="" loading="lazy" /></span>
        </span>
        <span className="site-name"><strong>{s.name}</strong><span>{s.kind}</span></span>
      </External>
    ))}
  </div>
)

function Layers() {
  const ref = useRef(null)
  const lit = useInView(ref, { once: true, threshold: 0.5 })
  return (
    <ol ref={ref} className={lit ? 'layers lit' : 'layers'} aria-label="HireAtlas architecture, from client to database">
      {feature.layers.map(([name, detail], i) => (
        <li key={name} style={{ '--i': i }}>
          <strong>{name}</strong>
          <span className="label">{detail}</span>
        </li>
      ))}
    </ol>
  )
}

const Ensemble = () => (
  <svg className="ensemble" viewBox="0 0 480 440" role="img" aria-label="Three models, XGBoost, LightGBM and LSTM, feed one answer. SHAP explains the answer.">
    {[70, 220, 370].map((y, i) => (
      <path key={y} className="en-wire" style={{ '--i': i }} d={`M150 ${y}C230 ${y} 230 220 300 220`} />
    ))}
    <path className="en-wire en-why" d="M360 264V330" />
    {[['XGBoost', 70], ['LightGBM', 220], ['LSTM', 370]].map(([t, y]) => (
      <g key={t} className="en-box"><rect x="0" y={y - 32} width="152" height="64" rx="8" /><text x="76" y={y + 7}>{t}</text></g>
    ))}
    <g className="en-box en-answer"><rect x="290" y="176" width="140" height="88" rx="8" /><text x="360" y="228">answer</text></g>
    <g className="en-box en-reason"><rect x="290" y="330" width="140" height="72" rx="8" /><text x="360" y="362">SHAP</text><text x="360" y="386" className="en-small">the reason</text></g>
  </svg>
)

const Sanjhi = () => (
  <div className="sanjhi">
    <div className="shots">
      <figure className="shot shot-web">
        <span className="site-bar label"><i /><i /><span>sanjhiai.netlify.app</span></span>
        <img src="/assets/sanjhi/welcome.webp" width="1200" height="750" alt="Sanjhi welcome screen in English and Urdu" loading="lazy" />
      </figure>
      <figure className="shot shot-phone shot-a">
        <img src="/assets/sanjhi/create.webp" width="560" height="1148" alt="Creating a committee in Sanjhi by describing it in plain words" loading="lazy" />
      </figure>
      <figure className="shot shot-phone shot-b">
        <img src="/assets/sanjhi/schedule.webp" width="560" height="1148" alt="Setting the schedule and payout order of a committee in Sanjhi" loading="lazy" />
      </figure>
    </div>
    <div className="sanjhi-how">
      <KametiRing />
      <div className="sanjhi-facts">
        <ul className="points">{sanjhi.points.map((p) => <li key={p}>{p}</li>)}</ul>
        <Stack items={sanjhi.stack} />
      </div>
    </div>
    <div className="badge-row" id="finalist">
      <div className="lanyard">
        <svg className="strap" viewBox="0 0 120 150" aria-hidden="true"><path d="M28 0L60 138" stroke="#ff8a2b" strokeWidth="12" /><path d="M92 0L60 138" stroke="#9be7be" strokeWidth="12" /><rect x="46" y="126" width="28" height="24" rx="5" fill="#dfe8e1" /></svg>
        <div className="badge">
          <span className="label">Alibaba x BanoQabil</span>
          <strong>AI Hackathon</strong>
          <em>Finalist</em>
          <span className="label">Huzaifa Naseer</span>
        </div>
      </div>
      <div className="badge-text">
        <h3>{award.title}</h3>
        {award.detail && <p>{award.detail}</p>}
        {award.certificate && <External className="btn btn-orange" href={award.certificate}>See the certificate</External>}
      </div>
    </div>
  </div>
)

const Network = () => (
  <div className="net">
    <Topology />
    <div className="questions">
      {research.questions.map(([q, how]) => (
        <div key={q}><h3>{q}</h3><p>{how}</p></div>
      ))}
    </div>
    <div className="research-meta">
      <div><h3>Methods in hand</h3><p>{research.methods}</p></div>
      <div><h3>Publications</h3><p>{research.publications}</p></div>
    </div>
  </div>
)

export const SCENES = {
  school: School,
  loop: Loop,
  sites: Sites,
  crt: PopScreen,
  layers: Layers,
  ensemble: Ensemble,
  sanjhi: Sanjhi,
  network: Network,
}
// Scenes that take the full width under the text.
export const WIDE = new Set(['sites', 'sanjhi', 'network'])
