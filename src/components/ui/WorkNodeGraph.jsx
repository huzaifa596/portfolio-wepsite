import { useState } from 'react'
import { Icon } from './Icon'

export const projectGraphData = {
  'XEL-Sepsis': {
    id: 'xel-sepsis',
    title: 'XEL-Sepsis',
    year: '2026',
    domain: 'ML / Research',
    anchor: '#work-ml',
    summary: 'Explainable clinical AI ensemble for early sepsis prediction on 50,000+ ICU stays.',
    domainColor: 'var(--sky)',
    nodes: [
      { id: 'data', type: 'DATASET', label: '50,000+ MIMIC-IV ICU Cohort', icon: 'database', desc: 'Physiological vitals, lab biomarkers & SOFA scores' },
      { id: 'arch', type: 'ARCHITECTURE', label: 'XGBoost + LightGBM + LSTM', icon: 'layers', desc: 'Ensemble model capturing static & temporal dynamics' },
      { id: 'interp', type: 'INTERPRETABILITY', label: 'SHAP Feature Attribution', icon: 'spark', desc: 'Real-time clinician risk factor explainability' },
      { id: 'metric', type: 'BENCHMARK', label: 'AUROC > 0.93 Target', icon: 'zap', desc: '6-Hour early warning window before clinical onset' },
      { id: 'action', type: 'DEEP DIVE', label: 'Interactive Model Stepper ↗', icon: 'arrowRight', desc: 'Inspect live SHAP importance & ROC target' }
    ]
  },
  'Dengue Outbreak Predictor': {
    id: 'dengue-predictor',
    title: 'Dengue Outbreak Predictor',
    year: '2026',
    domain: 'ML / Research',
    anchor: '#work-ml',
    summary: 'Epidemiological machine learning forecasting for Pakistani municipal districts.',
    domainColor: 'var(--sky)',
    nodes: [
      { id: 'data', type: 'DATASET', label: 'District Epidemiology Time-Series', icon: 'database', desc: 'Multi-year weekly caseloads & climate vectors' },
      { id: 'arch', type: 'PIPELINE', label: 'Scikit-Learn Regression Engine', icon: 'layers', desc: 'Feature scaling & lag-time seasonal regression' },
      { id: 'metric', type: 'VALIDATION', label: '94% Prediction Accuracy', icon: 'zap', desc: 'Validated on national health surveillance datasets' },
      { id: 'stack', type: 'STACK', label: 'Python · Pandas · Seaborn', icon: 'code', desc: 'Interactive geographic outbreak risk mapping' },
      { id: 'action', type: 'DEEP DIVE', label: 'View Research Specs ↗', icon: 'arrowRight', desc: 'Jump to ML research overview' }
    ]
  },
  'HireAtlas': {
    id: 'hireatlas',
    title: 'HireAtlas',
    year: '2026',
    domain: 'MERN / Web',
    anchor: '#work-mern',
    summary: 'Full-stack candidate tracking & technical recruitment portal.',
    domainColor: 'var(--sky-muted)',
    nodes: [
      { id: 'ui', type: 'FRONTEND', label: 'React 19 + Glassmorphism UI', icon: 'react', desc: 'Vite-powered reactive workflow dashboard' },
      { id: 'api', type: 'BACKEND', label: 'Node.js & Express REST API', icon: 'nodejs', desc: 'Stateless JWT auth & role-based middleware' },
      { id: 'db', type: 'DATABASE', label: 'MongoDB Atlas Aggregations', icon: 'database', desc: 'High-throughput candidate query pipelines' },
      { id: 'feature', type: 'FEATURE', label: 'Application State Machine', icon: 'layers', desc: 'Kanban job pipeline with real-time status transitions' },
      { id: 'action', type: 'DEEP DIVE', label: 'Inspect MERN Pipeline ↗', icon: 'arrowRight', desc: 'View interactive architecture diagram' }
    ]
  },
  'Hospital Billing System': {
    id: 'hospital-billing',
    title: 'Hospital Billing System',
    year: '2026',
    domain: 'MERN / Web',
    anchor: '#work-mern',
    summary: 'Production billing & invoice infrastructure built during Tenbit Solutions internship.',
    domainColor: 'var(--sky-muted)',
    nodes: [
      { id: 'role', type: 'INTERNSHIP', label: 'Tenbit Solutions MERN Role', icon: 'building', desc: 'Production-grade healthcare administrative software' },
      { id: 'sec', type: 'SECURITY', label: 'Role-Based Access Control', icon: 'shield', desc: 'Granular permissions for Doctors, Cashiers & Admins' },
      { id: 'flow', type: 'WORKFLOW', label: 'Automated Invoice Generator', icon: 'zap', desc: 'Real-time billing calculations & transaction logs' },
      { id: 'stack', type: 'STACK', label: 'MongoDB · Express · React · Node', icon: 'layers', desc: 'Full-stack transactional logging pipeline' },
      { id: 'action', type: 'DEEP DIVE', label: 'View Engineering Log ↗', icon: 'arrowRight', desc: 'Jump to Tenbit internship deliverables' }
    ]
  },
  'Interactive Web Showcase': {
    id: 'web-showcase',
    title: 'Interactive Web Showcase',
    year: '2026',
    domain: 'MERN / Web',
    anchor: '#work-mern',
    summary: 'Collection of high-performance responsive landing pages & animations.',
    domainColor: 'var(--sky-muted)',
    nodes: [
      { id: 'css', type: 'AESTHETICS', label: 'Modern CSS Grid & Glassmorphism', icon: 'spark', desc: 'Subtle micro-animations and zero layout shift' },
      { id: 'perf', type: 'PERFORMANCE', label: '98+ Lighthouse Web Vitals', icon: 'zap', desc: 'Optimized bundle footprint and responsive scaling' },
      { id: 'deploy', type: 'DEPLOYMENT', label: 'Live on Netlify Cloud', icon: 'check', desc: 'Continuous deployment with global CDN edge' },
      { id: 'action', type: 'DEEP DIVE', label: 'Open Live Showcase ↗', icon: 'arrowUpRight', desc: 'landing-page-school.netlify.app' }
    ]
  },
  'Pop Till Drop (x86 Assembly)': {
    id: 'pop-till-drop',
    title: 'Pop Till Drop (x86 Assembly)',
    year: '2025',
    domain: 'Systems',
    anchor: '#work-systems',
    summary: 'Real-time arcade game built in bare-metal 16-bit 8088 Assembly language.',
    domainColor: 'var(--cyan)',
    nodes: [
      { id: 'cpu', type: 'PROCESSOR', label: '16-Bit 8088 Real Mode', icon: 'cpu', desc: 'Direct register manipulation (AX, BX, CX, DX, IP)' },
      { id: 'isr', type: 'INTERRUPTS', label: 'INT 08h & INT 09h Handlers', icon: 'zap', desc: 'Hardware timer tick clock & custom keyboard ISR' },
      { id: 'vram', type: 'HARDWARE', label: 'Direct 0xB800 Video RAM', icon: 'terminal', desc: 'Zero-overhead text-mode buffer writes' },
      { id: 'engine', type: 'GAME LOOP', label: 'Real-Time Balloon Physics', icon: 'layers', desc: 'Dynamic ascending speeds & collision checks' },
      { id: 'action', type: 'DEEP DIVE', label: 'Step Opcode Stepper ↗', icon: 'arrowRight', desc: 'Run line-by-line assembly in browser' }
    ]
  },
  'Tetris Arcade Engine': {
    id: 'tetris-arcade',
    title: 'Tetris Arcade Engine',
    year: '2024',
    domain: 'Systems',
    anchor: '#work-systems',
    summary: 'Pure C++ object-oriented Tetris engine with collision matrix logic.',
    domainColor: 'var(--cyan)',
    nodes: [
      { id: 'lang', type: 'CORE', label: 'Pure Modern C++20 OOP', icon: 'cplusplus', desc: 'Encapsulated block matrices and clean inheritance' },
      { id: 'math', type: 'COLLISION', label: '2D Rotation & Wall Kicks', icon: 'spark', desc: 'Matrix transposition & bounding box checks' },
      { id: 'time', type: 'SYSTEMS', label: 'Fixed Timestep Game Clock', icon: 'zap', desc: 'Deterministic frame rate & line-clear scoring' },
      { id: 'mem', type: 'MEMORY', label: 'Buffer Array Memory Grid', icon: 'database', desc: 'Stack-allocated 2D board state' },
      { id: 'action', type: 'DEEP DIVE', label: 'View C++ Breakdown ↗', icon: 'arrowRight', desc: 'Jump to systems zone' }
    ]
  }
}

export function WorkNodeGraph({ activeProjectKey, onSelectProject, viewMode = 'split' }) {
  const currentProject = projectGraphData[activeProjectKey] || projectGraphData['XEL-Sepsis']
  const [hoveredNodeId, setHoveredNodeId] = useState(null)

  const handleNodeClick = (anchor) => {
    if (!anchor) return
    const el = document.querySelector(anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="work-node-graph-card">
      {/* Node Graph Header */}
      <div className="node-graph-header">
        <div className="node-graph-header-left">
          <span className="node-graph-pill">NOTEBOOK_LM // NODE GRAPH</span>
          <span className="node-graph-domain-tag" style={{ color: currentProject.domainColor }}>
            {currentProject.domain} · {currentProject.year}
          </span>
        </div>
        <div className="node-graph-status">
          <span className="node-graph-live-dot" />
          <span>{currentProject.nodes.length} CONNECTED NODES</span>
        </div>
      </div>

      {/* Main Interactive Node Canvas */}
      <div className="node-graph-canvas">
        
        {/* Central Root Project Node */}
        <div className="node-root-container">
          <div className="node-item node-item--root">
            <div className="node-root-chip">
              <span className="node-chip-tag">SOURCE ROOT</span>
              <h4 className="node-root-title">{currentProject.title}</h4>
              <p className="node-root-desc">{currentProject.summary}</p>
            </div>
            <div className="node-port node-port--right" />
          </div>
        </div>

        {/* SVG Connecting Synaptic Wires */}
        <svg className="node-graph-svg" aria-hidden="true">
          <defs>
            <linearGradient id="nodeWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--sky)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--sky-bright)" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="nodeWireGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--sky-bright)" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {currentProject.nodes.map((node, idx) => {
            const total = currentProject.nodes.length
            // Calculate organic fan-out bezier curves
            const startX = 14
            const startY = 50
            const endX = 86
            const endY = ((idx + 0.5) / total) * 100
            const cX1 = startX + 32
            const cX2 = endX - 32

            const isActive = hoveredNodeId === node.id

            return (
              <g key={node.id}>
                {/* Background glow track */}
                <path
                  d={`M ${startX}% ${startY}% C ${cX1}% ${startY}%, ${cX2}% ${endY}%, ${endX}% ${endY}%`}
                  className={`node-wire-glow ${isActive ? 'is-active' : ''}`}
                  fill="none"
                  strokeWidth={isActive ? '3.5' : '1.5'}
                />
                {/* Animated pulse packet traveling along wire */}
                <path
                  d={`M ${startX}% ${startY}% C ${cX1}% ${startY}%, ${cX2}% ${endY}%, ${endX}% ${endY}%`}
                  className="node-wire-pulse"
                  fill="none"
                  stroke={isActive ? 'url(#nodeWireGradActive)' : 'url(#nodeWireGrad)'}
                  strokeWidth={isActive ? '2.5' : '1.5'}
                />
              </g>
            )
          })}
        </svg>

        {/* Child Leaf Task Nodes */}
        <div className="node-leaves-container">
          {currentProject.nodes.map((node) => {
            const isHovered = hoveredNodeId === node.id
            const isAction = node.type === 'DEEP DIVE' || node.type === 'EXPLORE'

            return (
              <div
                key={node.id}
                className={`node-item node-item--leaf ${isHovered ? 'is-hovered' : ''} ${isAction ? 'node-item--action' : ''}`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => handleNodeClick(currentProject.anchor)}
                role="button"
                tabIndex={0}
                title={`Click to jump to ${currentProject.title} section`}
              >
                <div className="node-port node-port--left" />
                <div className="node-leaf-chip">
                  <div className="node-leaf-header">
                    <span className="node-leaf-tag">{node.type}</span>
                    <Icon name={node.icon} size={13} className="node-leaf-icon" />
                  </div>
                  <div className="node-leaf-label">{node.label}</div>
                  <div className="node-leaf-desc">{node.desc}</div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* Node Graph Footer Navigation */}
      <div className="node-graph-footer">
        <span className="node-footer-hint">
          💡 Click any node to jump directly to deep-dive architecture & opcode steppers
        </span>
        <a
          href={currentProject.anchor}
          className="node-footer-cta"
        >
          <span>Jump to {currentProject.title}</span>
          <Icon name="arrowRight" size={13} />
        </a>
      </div>
    </div>
  )
}
