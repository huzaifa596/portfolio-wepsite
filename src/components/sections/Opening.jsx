import { useState, useRef, useEffect } from 'react'
import { portfolio } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

// Flat index of core work items with domain tag & year
const workIndex = [
  { title: 'XEL-Sepsis', year: '2026', domain: 'ML / Research', anchor: '#work-ml' },
  { title: 'Dengue Outbreak Predictor', year: '2026', domain: 'ML / Research', anchor: '#work-ml' },
  { title: 'HireAtlas', year: '2026', domain: 'MERN / Web', anchor: '#work-mern' },
  { title: 'Hospital Billing System', year: '2026', domain: 'MERN / Web', anchor: '#work-mern' },
  { title: 'Interactive Web Showcase', year: '2026', domain: 'MERN / Web', anchor: '#work-mern' },
  { title: 'Pop Till Drop (x86 Assembly)', year: '2025', domain: 'Systems', anchor: '#work-systems' },
  { title: 'Tetris Arcade Engine', year: '2024', domain: 'Systems', anchor: '#work-systems' },
]

const domainColors = {
  'ML / Research': 'var(--sky)',
  'MERN / Web': 'var(--sky-muted)',
  'Systems': 'var(--cyan)',
}

const motivationalQuotes = [
  { opcode: '0x01', text: 'FROM x86 REGISTERS TO DISTRIBUTED CLOUD CLUSTERS.' },
  { opcode: '0x02', text: 'CLINICAL AI: PRECISION MATTERS WHEN LIVES ARE ON THE LINE.' },
  { opcode: '0x03', text: 'FIRST SOLVE THE SYSTEM ARCHITECTURE, THEN WRITE THE CODE.' },
  { opcode: '0x04', text: 'AUROC > 0.90 — BENCHMARK WITH RIGOR, SHIP WITH PRIDE.' },
  { opcode: '0x05', text: 'CLEAN ABSTRACTIONS, LOW LATENCY, ZERO UNCHECKED ASSUMPTIONS.' },
]

// Interactive Bitcount motivational badge & ticker
function BitcountTicker() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [bits, setBits] = useState('01001000 01001110') // 'HN' in binary
  const [pulse, setPulse] = useState(false)

  const cycleQuote = () => {
    setPulse(true)
    setQuoteIdx((prev) => (prev + 1) % motivationalQuotes.length)
    const randomHex = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase()
    setBits(`0x${randomHex} // FAST_CS28`)
    setTimeout(() => setPulse(false), 300)
  }

  const current = motivationalQuotes[quoteIdx]

  return (
    <div className={`bitcount-ticker-bar ${pulse ? 'is-pulsing' : ''}`} onClick={cycleQuote} role="button" tabIndex={0} title="Click to cycle motivational telemetry">
      <div className="bitcount-ticker-left">
        <span className="bitcount-pill">SYS_CORE</span>
        <span className="bitcount-bits">{bits}</span>
      </div>
      <div className="bitcount-ticker-quote">
        <span className="bitcount-opcode">[{current.opcode}]</span>
        <span className="bitcount-text">{current.text}</span>
      </div>
      <div className="bitcount-ticker-btn" aria-label="Cycle quote">
        <Icon name="spark" size={12} />
        <span>CYCLE</span>
      </div>
    </div>
  )
}

// 3D hanging ID card with outer-top drop animation & interactive 3D mouse tilt
function IDCard() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imgError, setImgError] = useState(false)
  const [isDropped, setIsDropped] = useState(false)
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  useEffect(() => {
    // Trigger drop-in animation from outer top after initial render
    const t = setTimeout(() => setIsDropped(true), 60)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -14
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 14
    const gx = ((e.clientX - rect.left) / rect.width) * 100
    const gy = ((e.clientY - rect.top) / rect.height) * 100
    setTilt({ x: rx, y: ry })
    setGlare({ x: gx, y: gy })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50 })
  }

  return (
    <div
      className={`id-card-rig ${isDropped ? 'is-dropped' : 'is-waiting'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Lanyard ribbon & metallic spring clip */}
      <div className="id-card-lanyard">
        <div className="id-card-strap-wrap">
          <div className="id-card-strap" />
        </div>
        <div className="id-card-clip-assembly">
          <div className="id-card-clip-body">
            <div className="id-card-clip-rivet" />
          </div>
          <div className="id-card-swivel-ring" />
          <div className="id-card-clear-strap" />
        </div>
      </div>

      {/* The 3D ID Badge Card */}
      <div
        ref={cardRef}
        className="id-card"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0
            ? 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 80ms ease-out',
        }}
      >
        {/* Specular Glare Reflection */}
        <div
          className="id-card-glare"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(82, 194, 133, 0.26) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 75%)`
          }}
        />

        {/* Lanyard Slot Hole */}
        <div className="id-card-slot">
          <div className="id-card-slot-inner" />
        </div>

        {/* Card Header Stripe with Hologram Chip */}
        <div className="id-card-stripe">
          <div className="id-card-stripe-left">
            <span className="id-card-inst">FAST-NUCES</span>
            <span className="id-card-dept">DEPT OF COMPUTER SCIENCE</span>
          </div>
          <div className="id-card-stripe-right">
            <span className="id-card-hologram">NFC 0x484E</span>
            <span className="id-card-cohort">2024–2028</span>
          </div>
        </div>

        {/* Photo Slot */}
        <div className="id-card-photo-wrap">
          {imgError ? (
            <div className="id-card-photo-fallback">
              <span className="id-card-photo-initials">HN</span>
              <span className="id-card-photo-sub">FAST-NUCES CS</span>
            </div>
          ) : (
            <img
              src="/assets/profile.jpeg"
              alt="Huzaifa Naseer"
              className="id-card-photo"
              onError={() => setImgError(true)}
            />
          )}
          <div className="id-card-active-pill">
            <span className="id-card-active-dot" />
            <span>DEV_STATION // ONLINE</span>
          </div>
          <div className="id-card-verified-badge" title="Verified Engineering Student">
            <Icon name="check" size={11} />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Identity Information */}
        <div className="id-card-info">
          <div className="id-card-name-row">
            <h2 className="id-card-name">Huzaifa Naseer</h2>
            <span className="id-card-id-tag">#CS-2028</span>
          </div>
          <p className="id-card-role">Software Engineer · ML Researcher</p>
          
          {/* High-Contrast Badges */}
          <div className="id-card-badges">
            <span className="id-card-badge id-card-badge--gold">
              <span className="id-card-badge-k">CGPA</span>
              <span className="id-card-badge-v">3.13</span>
            </span>
            <span className="id-card-badge">
              <span className="id-card-badge-k">NTS</span>
              <span className="id-card-badge-v">98th %ile</span>
            </span>
            <span className="id-card-badge id-card-badge--sky">
              <span className="id-card-badge-k">PUB</span>
              <span className="id-card-badge-v">XEL-Sepsis</span>
            </span>
          </div>
        </div>

        {/* Card Security Strip & Barcode */}
        <div className="id-card-footer">
          <div className="id-card-barcode">
            {Array.from({ length: 34 }).map((_, i) => (
              <div
                key={i}
                className="id-card-barcode-bar"
                style={{
                  height: `${Math.sin(i * 1.6) * 7 + 13}px`,
                  opacity: i % 4 === 0 ? 0.95 : i % 2 === 0 ? 0.65 : 0.35
                }}
              />
            ))}
          </div>
          <div className="id-card-uid-wrap">
            <span className="id-card-uid">0x484E-2028-SYS</span>
            <span className="id-card-uid-sub">ICU MIMIC-IV LEAD</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Opening() {
  const [hoveredDomain, setHoveredDomain] = useState(null)

  return (
    <section className="opening-section" id="overview">
      <div className="shell">
        
        {/* Bitcount Prop Double Motivational Telemetry Bar */}
        <BitcountTicker />

        <div className="opening-grid">

          {/* Left column — identity & deep intro */}
          <div className="opening-identity">
            <div className="opening-name-block">
              <span className="opening-label">HUZAIFA NASEER // FAST-NUCES CS</span>
              <div className="opening-status">
                <span className="opening-status-dot" aria-hidden="true" />
                <span>Available for summer internships, backend roles, and ML research</span>
              </div>
            </div>

            <h1 className="opening-headline">
              Software engineer building scalable MERN backends, training ensemble models on ICU data, and writing x86 assembly.
            </h1>

            {/* Prominent Action & Social Buttons (Placed Outside Card) */}
            <div className="opening-actions-strip">
              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
                className="opening-btn opening-btn--github"
                title="View GitHub Repositories"
              >
                <Icon name="github" size={17} />
                <span>GitHub Profile</span>
              </a>
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noreferrer"
                className="opening-btn opening-btn--linkedin"
                title="Connect on LinkedIn"
              >
                <Icon name="linkedin" size={17} />
                <span>LinkedIn</span>
              </a>
              <a
                href="/assets/Huzaifa_Naseer_Resume.pdf"
                download
                className="opening-btn opening-btn--resume"
                title="Download Resume PDF"
              >
                <Icon name="download" size={17} />
                <span>Download Resume</span>
              </a>
              <a
                href={`mailto:${portfolio.email}`}
                className="opening-btn opening-btn--mail"
                title="Send Email"
              >
                <Icon name="mail" size={17} />
                <span>{portfolio.email}</span>
              </a>
            </div>

            <div className="opening-meta-block">
              <div className="opening-meta-row">
                <span className="opening-meta-key">ACADEMICS</span>
                <span className="opening-meta-val">
                  BS Computer Science at <strong>FAST-NUCES Lahore</strong> (2024–2028). CGPA 3.13. 98th percentile in NTS National Aptitude Test.
                </span>
              </div>
              <div className="opening-meta-row">
                <span className="opening-meta-key">RESEARCH</span>
                <span className="opening-meta-val">
                  Lead author on <strong>XEL-Sepsis</strong>: Explainable ensemble learning (XGBoost + LightGBM + LSTM) on 50k+ MIMIC-IV ICU admissions for 6-hour early clinical alert.
                </span>
              </div>
            </div>

            {/* Interactive Work index */}
            <div className="opening-index">
              <div className="opening-index-header">
                <span className="opening-index-label">DIRECT WORK INDEX</span>
                <span className="opening-index-count">7 REPOSITORIES & PAPERS</span>
              </div>
              <ol className="opening-index-list">
                {workIndex.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.anchor}
                      className={`opening-index-row ${hoveredDomain && hoveredDomain !== item.domain ? 'is-dimmed' : ''}`}
                      onMouseEnter={() => setHoveredDomain(item.domain)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    >
                      <span className="opening-index-title">{item.title}</span>
                      <span className="opening-index-right">
                        <span
                          className="opening-index-domain"
                          style={{ color: domainColors[item.domain] }}
                        >
                          {item.domain}
                        </span>
                        <span className="opening-index-year">{item.year}</span>
                        <Icon name="arrowRight" size={12} className="opening-index-arrow" />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="opening-index-footer">
                <span className="opening-index-footer-text">
                  3 engineering internships · 3 distinct technical zones · Active clinical paper
                </span>
              </div>
            </div>
          </div>

          {/* Right column — 3D hanging ID card */}
          <div className="opening-card-col">
            <IDCard />
          </div>

        </div>
      </div>
    </section>
  )
}
