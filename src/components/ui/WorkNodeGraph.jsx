import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { Icon } from './Icon'

export const projectMindmapData = {
  'XEL-Sepsis': {
    id: 'xel-sepsis',
    title: 'XEL-Sepsis (ICU Clinical AI)',
    year: '2026',
    domain: 'ML / Research',
    anchor: '#work-ml',
    summary: 'Explainable clinical AI ensemble for early sepsis risk prediction on 50,000+ ICU admissions.',
    domainColor: 'var(--sky)',
    branches: [
      {
        id: 'foundations',
        label: 'Clinical Dataset & Biomarkers',
        subnodes: ['50k+ MIMIC-IV ICU Cohort', '34 Physiological Features', 'SOFA Score Alignment'],
        icon: 'database',
        color: '#60a5fa',
      },
      {
        id: 'core-ml',
        label: 'Core AI & Ensemble Architecture',
        subnodes: ['XGBoost + LightGBM Boosting', 'LSTM Temporal Sequence Head', 'Cross-Validated Ensemble'],
        icon: 'layers',
        color: '#34d399',
      },
      {
        id: 'explainability',
        label: 'Explainability & SHAP Telemetry',
        subnodes: ['SHAP Summary Feature Bars', 'Clinician Risk Attribution', 'Dynamic Feature Importance'],
        icon: 'spark',
        color: '#a78bfa',
      },
      {
        id: 'benchmarks',
        label: 'Clinical Benchmarks & Metrics',
        subnodes: ['AUROC > 0.93 Target', '6-Hour Early Warning Window', 'High Sensitivity (0.88+)'],
        icon: 'zap',
        color: '#fbbf24',
      },
      {
        id: 'deployment',
        label: 'Interactive Clinical Stepper',
        subnodes: ['Live ROC Target Stepper', 'Lead Author Paper (2026)', 'View Interactive Zone ↗'],
        icon: 'arrowRight',
        color: '#38bdf8',
        isAction: true,
      },
    ],
  },
  'Dengue Outbreak Predictor': {
    id: 'dengue-predictor',
    title: 'Dengue Outbreak Forecasting',
    year: '2026',
    domain: 'ML / Research',
    anchor: '#work-ml',
    summary: 'Epidemiological time-series forecasting model for municipal health surveillance.',
    domainColor: 'var(--sky)',
    branches: [
      {
        id: 'data-foundations',
        label: 'Epidemiological Surveillance Data',
        subnodes: ['Weekly District Caseloads', 'Rainfall & Humidity Vectors', 'Multi-Year Historical Trends'],
        icon: 'database',
        color: '#60a5fa',
      },
      {
        id: 'core-pipeline',
        label: 'Predictive Feature Pipeline',
        subnodes: ['Scikit-Learn Lag Regression', 'Seasonal Trend Decomposition', 'Feature Scaling & Imputation'],
        icon: 'layers',
        color: '#34d399',
      },
      {
        id: 'accuracy',
        label: 'Model Accuracy & Validation',
        subnodes: ['94% District Prediction Accuracy', 'Mean Absolute Error < 4.2%', 'Metropolitan District Testing'],
        icon: 'zap',
        color: '#fbbf24',
      },
      {
        id: 'dash',
        label: 'Outbreak Risk Visualizer',
        subnodes: ['Python · Pandas · Seaborn', 'Interactive Risk Heatmaps', 'Jump to Research Lab ↗'],
        icon: 'arrowRight',
        color: '#38bdf8',
        isAction: true,
      },
    ],
  },
  'HireAtlas': {
    id: 'hireatlas',
    title: 'HireAtlas Talent Infrastructure',
    year: '2026',
    domain: 'MERN / Web',
    anchor: '#work-mern',
    summary: 'Full-stack recruitment portal with real-time application pipelines and JWT auth.',
    domainColor: 'var(--sky-muted)',
    branches: [
      {
        id: 'ui-layer',
        label: 'Frontend UI & Glassmorphism',
        subnodes: ['React 19 & Vite Toolchain', 'Reactive Kanban Workflow', 'Glassmorphism Design Tokens'],
        icon: 'react',
        color: '#38bdf8',
      },
      {
        id: 'api-layer',
        label: 'Node.js & Express REST Endpoints',
        subnodes: ['Stateless JWT Authentication', 'Role-Based Route Middleware', 'Candidate Search & Filtering'],
        icon: 'nodejs',
        color: '#34d399',
      },
      {
        id: 'db-layer',
        label: 'MongoDB Atlas Pipeline',
        subnodes: ['Aggregation Pipelines', 'Normalized Schema Modeling', 'High-Throughput Indexing'],
        icon: 'database',
        color: '#60a5fa',
      },
      {
        id: 'explore-mern',
        label: 'Interactive MERN Pipeline',
        subnodes: ['Live Step-by-Step Architecture', 'Source Code on GitHub', 'Explore MERN Zone ↗'],
        icon: 'arrowRight',
        color: '#a78bfa',
        isAction: true,
      },
    ],
  },
  'Hospital Billing System': {
    id: 'hospital-billing',
    title: 'Hospital Billing Core System',
    year: '2026',
    domain: 'MERN / Web',
    anchor: '#work-mern',
    summary: 'Production healthcare management & invoicing suite developed at Tenbit Solutions.',
    domainColor: 'var(--sky-muted)',
    branches: [
      {
        id: 'role-tenbit',
        label: 'Tenbit Solutions Internship',
        subnodes: ['Full-Stack MERN Intern', 'Production Medical Invoicing', 'Transactional Data Integrity'],
        icon: 'building',
        color: '#60a5fa',
      },
      {
        id: 'security-rbac',
        label: 'Security & Access Control',
        subnodes: ['Role-Based Access (RBAC)', 'Cashier, Doctor & Admin Views', 'Audit Trail & Event Logs'],
        icon: 'shield',
        color: '#fbbf24',
      },
      {
        id: 'automation',
        label: 'Invoice & Calculation Engine',
        subnodes: ['Automated Tax Calculations', 'PDF Invoice Generators', 'Payment Status Tracking'],
        icon: 'zap',
        color: '#34d399',
      },
      {
        id: 'view-log',
        label: 'Engineering Deliverables',
        subnodes: ['MERN Architecture Pipeline', 'Enterprise Deployment Log', 'View Full Breakdown ↗'],
        icon: 'arrowRight',
        color: '#38bdf8',
        isAction: true,
      },
    ],
  },
  'Interactive Web Showcase': {
    id: 'web-showcase',
    title: 'Modern Web Showcase',
    year: '2026',
    domain: 'MERN / Web',
    anchor: '#work-mern',
    summary: 'Suite of modern interactive web layouts with 98+ Lighthouse performance.',
    domainColor: 'var(--sky-muted)',
    branches: [
      {
        id: 'css-architecture',
        label: 'CSS Grid & Modern Design',
        subnodes: ['Semantic HTML5 Markup', 'Vanilla CSS Custom Properties', 'Responsive Flexbox Layouts'],
        icon: 'spark',
        color: '#a78bfa',
      },
      {
        id: 'performance',
        label: 'Performance & Web Vitals',
        subnodes: ['98+ Lighthouse Web Vitals', 'Zero Layout Shift (CLS 0.0)', 'Micro-Interactions & Hover'],
        icon: 'zap',
        color: '#34d399',
      },
      {
        id: 'cloud-deploy',
        label: 'Live Netlify Cloud Edge',
        subnodes: ['Continuous Edge Deployment', 'landing-page-school.netlify.app', 'Launch Live Site ↗'],
        icon: 'arrowUpRight',
        color: '#60a5fa',
        isAction: true,
      },
    ],
  },
  'Pop Till Drop (x86 Assembly)': {
    id: 'pop-till-drop',
    title: 'Pop Till Drop (x86 Engine)',
    year: '2025',
    domain: 'Systems',
    anchor: '#work-systems',
    summary: 'Arcade video game written in bare-metal 16-bit 8088 Assembly with interrupt handlers.',
    domainColor: 'var(--cyan)',
    branches: [
      {
        id: 'cpu-registers',
        label: '16-Bit 8088 Real Mode',
        subnodes: ['Registers (AX, BX, CX, DX, IP)', 'Stack & Segment Math (DS, CS, SS)', 'DOSBox Emulation Environment'],
        icon: 'cpu',
        color: '#60a5fa',
      },
      {
        id: 'interrupts',
        label: 'Hardware Interrupt Service Routines',
        subnodes: ['INT 08h Timer Clock ISR', 'INT 09h Asynchronous Keyboard ISR', 'INT 10h Video Bios Routines'],
        icon: 'zap',
        color: '#fbbf24',
      },
      {
        id: 'video-ram',
        label: 'Direct 0xB800 Video Memory',
        subnodes: ['Memory-Mapped Framebuffer', '80x25 Color Text Mode Buffers', 'Direct Port I/O Instructions'],
        icon: 'terminal',
        color: '#34d399',
      },
      {
        id: 'stepper',
        label: 'Live x86 Opcode Stepper',
        subnodes: ['Step Line-by-Line Assembly', 'Inspect Real-time Registers', 'Run Assembly Stepper ↗'],
        icon: 'arrowRight',
        color: '#a78bfa',
        isAction: true,
      },
    ],
  },
  'Tetris Arcade Engine': {
    id: 'tetris-arcade',
    title: 'C++20 Tetris Game Engine',
    year: '2024',
    domain: 'Systems',
    anchor: '#work-systems',
    summary: 'Classic arcade engine engineered from scratch in modern C++ with OOP architecture.',
    domainColor: 'var(--cyan)',
    branches: [
      {
        id: 'cpp-oop',
        label: 'Modern C++20 OOP Design',
        subnodes: ['Block Class Encapsulation', 'Grid State Manager Pattern', 'Clean Header Abstractions'],
        icon: 'cplusplus',
        color: '#60a5fa',
      },
      {
        id: 'collision-matrix',
        label: 'Matrix Math & Wall Kicks',
        subnodes: ['2D Matrix Transposition', 'Bounding Box Collision Logic', 'Piece Drop Preview Math'],
        icon: 'spark',
        color: '#a78bfa',
      },
      {
        id: 'frame-loop',
        label: 'Deterministic Game Loop',
        subnodes: ['Fixed Timestep Delta Clock', 'Line Clear Score Calculation', 'Stack-Allocated Board Buffer'],
        icon: 'zap',
        color: '#34d399',
      },
      {
        id: 'systems-deep',
        label: 'Systems Engine Deep Dive',
        subnodes: ['Interactive Logic Explorer', 'C++ Source Walkthrough', 'Jump to Systems Zone ↗'],
        icon: 'arrowRight',
        color: '#fbbf24',
        isAction: true,
      },
    ],
  },
}

export const projectGraphData = projectMindmapData

export function WorkNodeGraph({ activeProjectKey }) {
  const currentProject = projectMindmapData[activeProjectKey] || projectMindmapData['XEL-Sepsis']
  const [activeBranchId, setActiveBranchId] = useState(null)
  const [hoveredBranchId, setHoveredBranchId] = useState(null)
  const [rootExpanded, setRootExpanded] = useState(true)

  const treeAreaRef = useRef(null)
  const rootHandleRef = useRef(null)
  const branchRefs = useRef({})
  const [wireCoords, setWireCoords] = useState([])

  // Recalculate precise bezier wire coordinates relative to treeAreaRef
  const updateWires = useCallback(() => {
    const treeArea = treeAreaRef.current
    const rootHandle = rootHandleRef.current
    if (!treeArea || !rootHandle) return

    const treeRect = treeArea.getBoundingClientRect()
    const rRect = rootHandle.getBoundingClientRect()

    // Root start point is the exact center of the circle handle '<'
    const startX = rRect.left + rRect.width / 2 - treeRect.left
    const startY = rRect.top + rRect.height / 2 - treeRect.top

    const wires = currentProject.branches.map((b) => {
      const branchEl = branchRefs.current[b.id]
      if (!branchEl) return null

      const bRect = branchEl.getBoundingClientRect()
      // End point is the left-center of the child node pill
      const endX = bRect.left - treeRect.left
      const endY = bRect.top + bRect.height / 2 - treeRect.top

      return {
        id: b.id,
        startX,
        startY,
        endX,
        endY,
      }
    }).filter(Boolean)

    setWireCoords(wires)
  }, [currentProject])

  useLayoutEffect(() => {
    updateWires()
    const raf = requestAnimationFrame(updateWires)
    const t = setTimeout(updateWires, 100)

    const treeArea = treeAreaRef.current
    let ro
    if (treeArea && window.ResizeObserver) {
      ro = new ResizeObserver(() => {
        updateWires()
      })
      ro.observe(treeArea)
    }

    window.addEventListener('resize', updateWires)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', updateWires)
    }
  }, [updateWires, activeBranchId, rootExpanded, activeProjectKey])

  const handleBranchClick = (branch) => {
    if (branch.isAction) {
      const el = document.querySelector(currentProject.anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setActiveBranchId(activeBranchId === branch.id ? null : branch.id)
  }

  return (
    <div className="mindmap-node-card">
      
      {/* Mindmap Header */}
      <div className="mindmap-header">
        <div className="mindmap-header-left">
          <span className="mindmap-badge">NOTEBOOK_LM // TREE GRAPH</span>
          <span className="mindmap-title-tag">{currentProject.title}</span>
        </div>
        <div className="mindmap-header-right">
          <span className="mindmap-pulse-dot" />
          <span>{currentProject.branches.length} BRANCHES</span>
        </div>
      </div>

      {/* Interactive Mindmap Tree Canvas (the exact relative coordinate parent) */}
      <div className="mindmap-tree-area" ref={treeAreaRef}>
        
        {/* Left: Root Node Capsule with Circular '<' Handle */}
        <div className="mindmap-root-col">
          <div className="mindmap-root-node">
            <div className="mindmap-root-content">
              <span className="mindmap-root-tag">ROOT</span>
              <span className="mindmap-root-name">{currentProject.title}</span>
            </div>
            {/* The single Circular '<' Handle exactly on the right edge */}
            <button
              type="button"
              ref={rootHandleRef}
              className={`mindmap-handle-circle ${rootExpanded ? 'is-expanded' : ''}`}
              onClick={() => setRootExpanded(!rootExpanded)}
              title="Toggle Mindmap Branches"
              aria-label="Toggle Mindmap Branches"
            >
              <span>‹</span>
            </button>
          </div>
        </div>

        {/* SVG Bezier Connecting Wires */}
        {rootExpanded && (
          <svg className="mindmap-svg-layer" aria-hidden="true">
            <defs>
              <linearGradient id="mindmapWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="mindmapWireGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
              </linearGradient>
            </defs>

            {wireCoords.map((wire) => {
              const { id, startX, startY, endX, endY } = wire
              // Organic fan-out cubic bezier curve
              const dx = Math.max((endX - startX) * 0.55, 30)
              const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`
              const isHovered = hoveredBranchId === id
              const isActive = activeBranchId === id

              return (
                <g key={id}>
                  {/* Background Track with glow */}
                  <path
                    d={pathD}
                    className={`mindmap-wire ${isHovered || isActive ? 'is-active' : ''}`}
                    fill="none"
                    stroke={isHovered || isActive ? 'url(#mindmapWireGradActive)' : 'url(#mindmapWireGrad)'}
                    strokeWidth={isHovered || isActive ? '3' : '1.8'}
                  />
                  {/* Flowing animated pulse dashes */}
                  <path
                    d={pathD}
                    className="mindmap-wire-dash"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={isHovered ? '2' : '1.2'}
                    strokeDasharray="4 10"
                  />
                </g>
              )
            })}
          </svg>
        )}

        {/* Right: Stack of Child Node Pills with Circular '>' Handles */}
        {rootExpanded && (
          <div className="mindmap-branches-col">
            {currentProject.branches.map((b) => {
              const isActive = activeBranchId === b.id
              const isHovered = hoveredBranchId === b.id

              return (
                <div
                  key={b.id}
                  ref={(el) => (branchRefs.current[b.id] = el)}
                  className={`mindmap-branch-wrap ${isActive ? 'is-expanded' : ''}`}
                >
                  {/* The Child Node Pill matching the screenshot */}
                  <div
                    className={`mindmap-child-node ${isActive ? 'is-active' : ''} ${b.isAction ? 'is-action' : ''}`}
                    onMouseEnter={() => setHoveredBranchId(b.id)}
                    onMouseLeave={() => setHoveredBranchId(null)}
                    onClick={() => handleBranchClick(b)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="mindmap-child-content">
                      <Icon name={b.icon} size={13} className="mindmap-child-icon" style={{ color: b.color }} />
                      <span className="mindmap-child-label">{b.label}</span>
                    </div>

                    {/* Circular '>' Handle on Right Edge */}
                    <div className={`mindmap-child-handle ${isActive ? 'is-open' : ''}`}>
                      <span>›</span>
                    </div>
                  </div>

                  {/* Expanded 2nd-Level Sub-Nodes (Mindmap detail leaves) */}
                  {isActive && (
                    <div className="mindmap-subnodes-drawer">
                      {b.subnodes.map((sub, sIdx) => (
                        <div key={sIdx} className="mindmap-subnode-pill">
                          <span className="mindmap-subnode-dot" style={{ background: b.color }} />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

      </div>

      {/* Mindmap Footer */}
      <div className="mindmap-footer">
        <span className="mindmap-footer-hint">
          Click any <strong>›</strong> node to expand sub-tasks or jump directly to code
        </span>
        <a href={currentProject.anchor} className="mindmap-footer-cta">
          <span>Jump to {currentProject.title}</span>
          <Icon name="arrowRight" size={13} />
        </a>
      </div>

    </div>
  )
}
