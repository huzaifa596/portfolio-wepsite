import { useState, useEffect } from 'react'
import { Icon } from '../ui/Icon'

// ─── Tech Icon & Badge Mapping ───────────────────────────────────────────────
const techMeta = {
  'XGBoost': { color: '#e97316', icon: 'spark' },
  'LightGBM': { color: '#3b82f6', icon: 'zap' },
  'LSTM': { color: '#8b5cf6', icon: 'layers' },
  'React': { color: '#38bdf8', icon: 'react' },
  'Node.js': { color: '#4ade80', icon: 'nodejs' },
  'Express': { color: '#94a3b8', icon: 'terminal' },
  'MongoDB': { color: '#22c55e', icon: 'database' },
  'JWT': { color: '#f59e0b', icon: 'code' },
  'C++': { color: '#3b82f6', icon: 'cplusplus' },
  'x86 Assembly': { color: '#f43f5e', icon: 'cpu' },
  'Python': { color: '#facc15', icon: 'python' },
  'Scikit-Learn': { color: '#f97316', icon: 'spark' },
  'Pandas': { color: '#6366f1', icon: 'database' },
  'HTML5': { color: '#ef4444', icon: 'code' },
  'CSS3': { color: '#3b82f6', icon: 'spark' },
  'JavaScript': { color: '#fbbf24', icon: 'code' },
  'SHAP': { color: '#a78bfa', icon: 'spark' },
}

function TechBadge({ name }) {
  const meta = techMeta[name] || { color: 'var(--sky-muted)', icon: 'code' }
  return (
    <span className="tech-badge" style={{ '--badge-color': meta.color }}>
      <Icon name={meta.icon} size={12} className="tech-badge-icon" />
      <span className="tech-badge-name">{name}</span>
    </span>
  )
}

// ─── ML / Research Zone Data ──────────────────────────────────────────────────
const mlProjects = [
  {
    title: 'XEL-Sepsis',
    status: 'Active Clinical Research',
    dataset: 'MIMIC-IV ICU Clinical Database',
    records: '~50,000 patient admissions',
    task: 'Binary classification: early sepsis onset prediction',
    models: ['XGBoost', 'LightGBM', 'LSTM'],
    interpretability: 'SHAP (SHapley Additive exPlanations) per clinical feature',
    metric: 'AUROC > 0.90 Target (Early Alert: 6h ahead)',
    outcome: 'Explainable ensemble pipeline designed to catch ICU sepsis 6 hours prior to clinical diagnosis, providing interpretable feature contributions for ICU intensivists.',
    githubUrl: null,
    tags: ['XGBoost', 'LightGBM', 'LSTM', 'SHAP', 'Python'],
    shapFeatures: [
      { name: 'Serum Lactate Level', weight: 88, pos: true, val: '+0.42' },
      { name: 'SOFA Clinical Score', weight: 82, pos: true, val: '+0.38' },
      { name: 'WBC (White Blood Count)', weight: 70, pos: true, val: '+0.31' },
      { name: 'Mean Arterial Pressure', weight: 64, pos: false, val: '-0.26' },
      { name: 'Platelet Count', weight: 52, pos: false, val: '-0.19' },
    ]
  },
  {
    title: 'Dengue Outbreak Predictor',
    status: 'Completed Research — March 2026',
    dataset: 'Historical Pakistani Epidemiology Records',
    records: 'Weekly case counts across metropolitan districts',
    task: 'Time-series regression: weekly district-level surge forecasting',
    models: ['Scikit-Learn', 'Pandas'],
    interpretability: 'Gini Feature Importance + Humidity Correlation',
    metric: '94% Validation Accuracy (R² = 0.91)',
    outcome: 'Predictive modeling engine deployed to assist health departments in prioritizing district fumigation and bed allocations ahead of seasonal monsoons.',
    githubUrl: 'https://github.com/MuhammadAhmed1089/Dengue-Outbreak-Predictor',
    tags: ['Python', 'Scikit-Learn', 'Pandas'],
    shapFeatures: [
      { name: 'Monsoon Precipitation (mm)', weight: 92, pos: true, val: '+0.48' },
      { name: 'Mean Ambient Temperature', weight: 76, pos: true, val: '+0.34' },
      { name: 'Relative Humidity (%)', weight: 68, pos: true, val: '+0.28' },
      { name: 'Prior Week Case Velocity', weight: 84, pos: true, val: '+0.41' },
    ]
  },
]

// ─── MERN / Web Zone Data ────────────────────────────────────────────────────
const mernProjects = [
  {
    title: 'HireAtlas',
    subtitle: 'Full-Stack Talent Acquisition & Application Pipeline',
    date: 'Jan 2026',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    what: 'End-to-end recruitment platform featuring candidate portal, employer ATS dashboards, real-time application status tracking, and automated candidate shortlisting.',
    engineering: 'Engineered stateless JWT authentication with dual-role claims (employer vs candidate), compound MongoDB indexes for ultra-fast candidate filtering, and custom React reducer architecture eliminating heavy external state dependencies.',
    architecture: ['React Client UI', 'Express Middleware (Auth/Role Guard)', 'Mongoose Aggregation Pipeline', 'MongoDB Atlas'],
    githubUrl: 'https://github.com/huzaifa596/HireAtlas',
    liveUrl: null,
  },
  {
    title: 'Hospital Billing Management System',
    subtitle: 'MERN Engineering Internship — Tenbit Solutions',
    date: 'Jun–Aug 2026',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    what: 'Production healthcare management and billing ledger for private hospital clinics, handling multi-tier invoice generation, patient transaction logs, and auditor reporting.',
    engineering: 'Built role-based authorization matrix across Admin, Cashier, and Auditor levels. Implemented transactional invoice serialization with automatic PDF billing generation and schema-level data validation.',
    architecture: ['Staff Portal (React)', 'REST API Layer', 'Invoicing Transaction Engine', 'MongoDB Document Store'],
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Interactive Web UI Showcase',
    subtitle: 'Frontend Internship — BrainNet Telecommunications',
    date: 'Jun–Aug 2025',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    what: 'High-performance responsive portal suite built for a major telecommunications client, focusing on cross-browser fluid layouts, accessible DOM structure, and sub-second load times.',
    engineering: 'Implemented vanilla CSS responsive grid engines, zero-dependency SVG micro-animations, image srcset optimization, and strict Lighthouse accessibility compliance.',
    architecture: ['Semantic HTML5', 'Custom CSS Design Tokens', 'Vanilla ES6 Module Logic'],
    githubUrl: null,
    liveUrl: 'https://landing-page-school.netlify.app',
  },
]

// ─── Systems Zone Data ───────────────────────────────────────────────────────
const systemsProjects = [
  {
    title: 'Pop Till Drop',
    lang: 'x86 Assembly (8088)',
    date: 'Nov 2025',
    tags: ['x86 Assembly'],
    registers: { AX: '0x0013', BX: '0xA000', CX: '0x0140', DX: '0x00C8', IP: '0x0100' },
    lines: [
      'MOV AX, 0013h      ; Set VGA Mode 13h (320x200 256 colors)',
      'INT 10h            ; Trigger BIOS Video Interrupt',
      'MOV ES, [0A000h]   ; Base direct frame pointer into Video RAM',
      'IN  AL, 60h        ; Read scan-code from 8042 Keyboard Controller',
      'CMP AL, 1Eh        ; Check if [A] key pressed to pop balloon',
      'JNZ game_loop      ; Fixed-timestep interrupt sync loop',
    ],
    githubUrl: 'https://github.com/huzaifa596/assembly_game',
  },
  {
    title: 'Tetris Arcade Engine',
    lang: 'C++ (Pure Object-Oriented)',
    date: 'Dec 2024',
    tags: ['C++'],
    registers: { ROWS: '20', COLS: '10', SCORE: '14,850', LEVEL: '04', TICK: '16.6ms' },
    lines: [
      'Tetromino* piece = TetrominoFactory::createRandom();',
      'bool hit = board.checkCollision(piece->getMatrix(), nextX, nextY);',
      'if (!hit) { piece->applyPosition(nextX, nextY); }',
      'else { board.lockPiece(piece); int lines = board.clearLines(); }',
      'audioEngine.triggerSound(SFX_LINE_CLEAR);',
      'frameClock.syncFixedTimestep(60); // 60 FPS deterministic engine',
    ],
    githubUrl: null,
  },
]

// ─── Component: ML Card with interactive SHAP Visualizer ─────────────────────
function MLCard({ proj, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('specs') // 'specs' | 'shap'

  return (
    <article
      className={`wd-ml-card ${expanded ? 'is-expanded' : ''} reveal-on-scroll`}
      style={{ '--delay': `${index * 140}ms` }}
    >
      <div className="wd-ml-header">
        <div>
          <div className="wd-ml-top-tag">
            <span className="wd-bitcount-tag">RESEARCH_NODE</span>
            <span className="wd-ml-status">{proj.status}</span>
          </div>
          <h3 className="wd-ml-title">{proj.title}</h3>
        </div>
        <button
          type="button"
          className={`wd-expand-btn ${expanded ? 'is-open' : ''}`}
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          <span>{expanded ? 'Less' : 'Deep Dive'}</span>
          <Icon name="arrowRight" size={14} />
        </button>
      </div>

      <p className="wd-ml-summary">{proj.outcome}</p>

      {/* Target Metric Banner with Bitcount font */}
      <div className="wd-ml-metric-box">
        <span className="wd-ml-metric-label">KEY TARGET / BENCHMARK</span>
        <span className="wd-ml-metric-value">{proj.metric}</span>
      </div>

      <div className="wd-ml-tags">
        {proj.tags.map(t => <TechBadge key={t} name={t} />)}
      </div>

      {/* Interactive Expanded Detail view */}
      {expanded && (
        <div className="wd-ml-detail">
          <div className="wd-tab-bar">
            <button
              type="button"
              className={`wd-tab-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Model Architecture & Pipeline
            </button>
            <button
              type="button"
              className={`wd-tab-btn ${activeTab === 'shap' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('shap')}
            >
              SHAP Feature Importance
            </button>
          </div>

          {activeTab === 'specs' ? (
            <table className="wd-ml-table">
              <tbody>
                <tr>
                  <td className="wd-ml-key">Dataset</td>
                  <td className="wd-ml-val-cell">{proj.dataset}</td>
                </tr>
                <tr>
                  <td className="wd-ml-key">Scale</td>
                  <td className="wd-ml-val-cell">{proj.records}</td>
                </tr>
                <tr>
                  <td className="wd-ml-key">Task Formulation</td>
                  <td className="wd-ml-val-cell">{proj.task}</td>
                </tr>
                <tr>
                  <td className="wd-ml-key">Ensemble Models</td>
                  <td className="wd-ml-val-cell wd-ml-val-flex">
                    {proj.models.map(m => (
                      <code key={m} className="wd-ml-code">{m}</code>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="wd-ml-key">Interpretability</td>
                  <td className="wd-ml-val-cell">{proj.interpretability}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="wd-shap-container">
              <span className="wd-shap-heading">Top Clinical Predictors (SHAP Impact Values)</span>
              <div className="wd-shap-list">
                {proj.shapFeatures.map(f => (
                  <div key={f.name} className="wd-shap-item">
                    <div className="wd-shap-meta">
                      <span className="wd-shap-name">{f.name}</span>
                      <span className={`wd-shap-val ${f.pos ? 'is-positive' : 'is-negative'}`}>{f.val} SHAP</span>
                    </div>
                    <div className="wd-shap-bar-track">
                      <div
                        className={`wd-shap-bar-fill ${f.pos ? 'is-pos' : 'is-neg'}`}
                        style={{ width: `${f.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {proj.githubUrl && (
            <div className="wd-ml-actions">
              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="wd-link wd-link--icon">
                <Icon name="github" size={14} /> View Model Repository on GitHub
              </a>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

// ─── Component: MERN Card with interactive architecture preview ─────────────
function MERNCard({ proj, index = 0 }) {
  const [showNotes, setShowNotes] = useState(false)

  return (
    <article
      className="wd-mern-card reveal-on-scroll"
      style={{ '--delay': `${index * 140}ms` }}
    >
      <div className="wd-mern-top">
        <div>
          <span className="wd-bitcount-tag">SYSTEM_BUILD</span>
          <h3 className="wd-mern-title">{proj.title}</h3>
          <span className="wd-mern-subtitle">{proj.subtitle} · {proj.date}</span>
        </div>
        <div className="wd-mern-stack">
          {proj.stack.map(s => <TechBadge key={s} name={s} />)}
        </div>
      </div>

      <p className="wd-mern-what">{proj.what}</p>

      {/* Mini Architecture Flow */}
      <div className="wd-mern-arch-flow">
        <span className="wd-arch-label">PIPELINE:</span>
        <div className="wd-arch-steps">
          {proj.architecture.map((step, idx) => (
            <span key={step} className="wd-arch-step-wrap">
              <span className="wd-arch-step">{step}</span>
              {idx < proj.architecture.length - 1 && <span className="wd-arch-sep">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="wd-mern-footer">
        <button
          type="button"
          className="wd-notes-toggle"
          onClick={() => setShowNotes(v => !v)}
          aria-expanded={showNotes}
        >
          <span>{showNotes ? 'Hide Architectural Notes' : 'Inspect Architectural Notes'}</span>
          <span className={`wd-expand-icon ${showNotes ? 'is-open' : ''}`}>
            <Icon name="arrowRight" size={13} />
          </span>
        </button>

        <div className="wd-mern-links">
          {proj.githubUrl && (
            <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="wd-link wd-link--icon" title="View Source on GitHub">
              <Icon name="github" size={14} /> GitHub Repo
            </a>
          )}
          {proj.liveUrl && (
            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="wd-link wd-link--icon wd-link--live" title="Open Live Site">
              <Icon name="arrowUpRight" size={14} /> Live Deployment
            </a>
          )}
        </div>
      </div>

      {showNotes && (
        <div className="wd-mern-engineering">
          <span className="wd-mern-eng-label">TECHNICAL IMPLEMENTATION & DECISIONS</span>
          <p className="wd-mern-eng-body">{proj.engineering}</p>
        </div>
      )}
    </article>
  )
}

// ─── Component: Systems Card with live interactive opcode execution ─────────
function SystemsCard({ proj, index = 0 }) {
  const [running, setRunning] = useState(false)
  const [activeLine, setActiveLine] = useState(null)

  const handleRun = () => {
    setRunning(true)
    setActiveLine(0)
    let cur = 0
    const interval = setInterval(() => {
      cur++
      if (cur < proj.lines.length) {
        setActiveLine(cur)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setRunning(false)
          setActiveLine(null)
        }, 800)
      }
    }, 280)
  }

  return (
    <article
      className="wd-sys-card reveal-on-scroll"
      style={{ '--delay': `${index * 140}ms` }}
    >
      <div className="wd-sys-header">
        <div className="wd-sys-title-row">
          <div>
            <span className="wd-bitcount-tag">BARE_METAL</span>
            <h3 className="wd-sys-title">{proj.title}</h3>
          </div>
          <span className="wd-sys-date">{proj.date}</span>
        </div>
        <div className="wd-sys-header-row2">
          <code className="wd-sys-lang">{proj.lang}</code>
          <div className="wd-sys-tags">
            {proj.tags.map(t => <TechBadge key={t} name={t} />)}
          </div>
        </div>
      </div>

      {/* Register State Strip */}
      <div className="wd-sys-registers">
        <span className="wd-reg-tag">REGISTERS:</span>
        {Object.entries(proj.registers).map(([k, v]) => (
          <span key={k} className="wd-reg-item">
            <span className="wd-reg-k">{k}:</span>
            <span className="wd-reg-v">{v}</span>
          </span>
        ))}
      </div>

      {/* Terminal Interactive Window */}
      <div className={`wd-sys-terminal ${running ? 'is-running' : ''}`}>
        <div className="wd-sys-terminal-bar">
          <div className="wd-terminal-dots">
            <span className="wd-terminal-dot wd-terminal-dot--red" />
            <span className="wd-terminal-dot wd-terminal-dot--yellow" />
            <span className="wd-terminal-dot wd-terminal-dot--green" />
          </div>
          <span className="wd-terminal-title">{proj.lang.toLowerCase()} :: emulator v1.4</span>
          <span className="wd-terminal-status">{running ? 'EXEC_ACTIVE' : 'IDLE'}</span>
        </div>
        <ul className="wd-sys-lines">
          {proj.lines.map((line, i) => (
            <li
              key={i}
              className={`wd-sys-line ${activeLine === i ? 'is-executing' : ''}`}
            >
              <span className="wd-sys-ln">{String(i + 1).padStart(2, '0')}</span>
              <span className="wd-sys-prompt">{'>'}</span>
              <span className="wd-sys-line-text">{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="wd-sys-footer">
        <button
          type="button"
          className="wd-run-btn"
          onClick={handleRun}
          disabled={running}
        >
          <Icon name="terminal" size={13} />
          <span>{running ? 'Executing instruction loop...' : '▶ Step Instruction Loop'}</span>
        </button>
        {proj.githubUrl && (
          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="wd-link wd-link--icon">
            <Icon name="github" size={14} /> Assembly Source
          </a>
        )}
      </div>
    </article>
  )
}

// ─── Main Work Domains Section ───────────────────────────────────────────────
export function WorkDomains() {
  return (
    <section className="wd-section" id="work">

      {/* ── Zone A: ML / Clinical Research ── */}
      <div className="wd-zone" id="work-ml">
        <div className="shell">
          <div className="wd-zone-header reveal-on-scroll">
            <div className="wd-zone-tag-wrap">
              <span className="wd-zone-tag">ZONE A // MACHINE LEARNING & RESEARCH</span>
              <span className="wd-zone-badge">50,000+ ICU RECORDS</span>
            </div>
            <h2 className="wd-zone-title">
              Explainable ensemble learning on clinical & epidemiological datasets.
            </h2>
            <p className="wd-zone-desc">
              Focusing on clinical interpretability (SHAP values), early ICU sepsis prediction on MIMIC-IV, and time-series epidemiological disease forecasting.
            </p>
          </div>
          <div className="wd-ml-grid">
            {mlProjects.map((p, idx) => <MLCard key={p.title} proj={p} index={idx} />)}
          </div>
        </div>
      </div>

      {/* ── Zone B: MERN & Web Architectures ── */}
      <div className="wd-zone wd-zone--alt" id="work-mern">
        <div className="shell">
          <div className="wd-zone-header reveal-on-scroll">
            <div className="wd-zone-tag-wrap">
              <span className="wd-zone-tag">ZONE B // MERN & FULL-STACK SYSTEMS</span>
              <span className="wd-zone-badge">PRODUCTION CLIENTS</span>
            </div>
            <h2 className="wd-zone-title">
              Engineered backends, JWT authentication gates, and responsive interfaces.
            </h2>
            <p className="wd-zone-desc">
              Every project handles real state, structured schemas, role separation, and database performance considerations.
            </p>
          </div>
          <div className="wd-mern-list">
            {mernProjects.map((p, idx) => <MERNCard key={p.title} proj={p} index={idx} />)}
          </div>
        </div>
      </div>

      {/* ── Zone C: Systems & Low-Level Engineering ── */}
      <div className="wd-zone" id="work-systems">
        <div className="shell">
          <div className="wd-zone-header reveal-on-scroll">
            <div className="wd-zone-tag-wrap">
              <span className="wd-zone-tag">ZONE C // LOW-LEVEL SYSTEMS & GRAPHICS</span>
              <span className="wd-zone-badge">ZERO RUNTIME OVERHEAD</span>
            </div>
            <h2 className="wd-zone-title">
              Writing x86 (8088) Assembly and C++ OOP engines from scratch.
            </h2>
            <p className="wd-zone-desc">
              Hardware interrupts, VGA direct memory writes, register manipulation, and deterministic 60fps game loops without external engines.
            </p>
          </div>
          <div className="wd-sys-grid">
            {systemsProjects.map((p, idx) => <SystemsCard key={p.title} proj={p} index={idx} />)}
          </div>
        </div>
      </div>

    </section>
  )
}
