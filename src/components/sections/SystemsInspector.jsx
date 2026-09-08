import { useState } from 'react'
import { projects } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

// Rich code snippets demonstrating actual engineering depth for each project
const projectSnippets = {
  'Dengue Outbreak Predictor': {
    lang: 'Python (LightGBM / Pandas)',
    filename: 'forecasting_pipeline.py',
    code: `# Feature engineering for temporal epidemiology lag
def engineer_spatial_lags(df, lag_weeks=[1, 2, 3, 4]):
    for lag in lag_weeks:
        df[f'cases_lag_{lag}'] = df.groupby('district')['cases'].shift(lag)
        df[f'rainfall_roll_mean_{lag}'] = df['precipitation'].rolling(lag).mean()
    
    # Train gradient boosted trees with early stopping
    model = lgb.LGBMRegressor(
        n_estimators=1200,
        learning_rate=0.03,
        num_leaves=31,
        objective='poisson'  # Tailored for count distribution
    )
    return model.fit(X_train, y_train, eval_set=[(X_val, y_val)])`,
  },
  'HireAtlas — Talent Portal': {
    lang: 'JavaScript (Node / Express / JWT)',
    filename: 'authMiddleware.js',
    code: `// Role-based access control & token verification
export const verifyCompanyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Auth token required' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || user.role !== 'COMPANY_ADMIN') {
      return res.status(403).json({ error: 'Access restricted to hiring admins' });
    }
    req.currentUser = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
};`,
  },
  'Pop Till Drop (8088)': {
    lang: 'x86 Assembly (DOS / BIOS Interrupts)',
    filename: 'game_loop.asm',
    code: `; Direct Video Memory & 18.2Hz Timer Tick Interception
TIMER_ISR:
    push ax
    push bx
    push ds
    
    mov ax, 0B800h           ; CGA/VGA text video memory segment
    mov es, ax
    
    ; Decrement balloon descent ticks
    dec byte [cs:TICK_COUNTER]
    jnz .SKIP_DRAW
    
    call UPDATE_BALLOON_COORDS
    call RENDER_SPRITE_FRAME
    mov byte [cs:TICK_COUNTER], 4
    
.SKIP_DRAW:
    pop ds
    pop bx
    pop ax
    iret                     ; Interrupt return to caller`,
  },
  'Tetris Arcade Engine': {
    lang: 'C++ (OOP & Collision Matrices)',
    filename: 'TetrominoGrid.cpp',
    code: `// 4x4 Tetromino rotation matrix & bounding check
bool TetrominoGrid::checkCollision(int testX, int testY, int testRotation) {
    const auto& matrix = pieceShapes[currentType][testRotation];
    
    for (int r = 0; r < 4; ++r) {
        for (int c = 0; c < 4; ++c) {
            if (!matrix[r][c]) continue;
            int boardX = testX + c;
            int boardY = testY + r;
            
            // Wall and floor bounds check
            if (boardX < 0 || boardX >= GRID_WIDTH || boardY >= GRID_HEIGHT)
                return true;
            // Existing locked block collision
            if (boardY >= 0 && board[boardY][boardX] != 0)
                return true;
        }
    }
    return false;
}`,
  },
  'Interactive Web Showcase': {
    lang: 'JavaScript (CSS Grid & View Transitions)',
    filename: 'fluidTransitions.js',
    code: `// View Transitions API & dynamic responsive layouts
export function registerFluidNavigation() {
  document.addEventListener('click', async (e) => {
    const link = e.target.closest('a[data-transition]');
    if (!link) return;
    
    e.preventDefault();
    if (!document.startViewTransition) {
      window.location.href = link.href;
      return;
    }
    
    document.startViewTransition(() => {
      renderTargetView(link.getAttribute('href'));
    });
  });
}`,
  },
}

export function SystemsInspector() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProjectTitle, setActiveProjectTitle] = useState(projects[0].title)
  const [inspectorTab, setInspectorTab] = useState('overview') // 'overview' | 'code' | 'attention'
  const [selectedAttentionHead, setSelectedAttentionHead] = useState(0)
  const [hoveredNode, setHoveredNode] = useState(null)

  const attentionNodes = ['React/UI', 'Node/API', 'MongoDB', 'C++/Engine', 'x86 Asm', 'LightGBM', 'TreeSHAP']
  
  // Multi-head attention weight matrices representing cross-system attention scores
  const attentionHeads = [
    {
      name: 'Head 0: Data Ingestion & State Flow',
      weights: [
        [0.92, 0.88, 0.74, 0.20, 0.12, 0.35, 0.25],
        [0.85, 0.95, 0.91, 0.31, 0.18, 0.62, 0.40],
        [0.72, 0.89, 0.98, 0.15, 0.08, 0.84, 0.52],
        [0.18, 0.25, 0.12, 0.96, 0.89, 0.42, 0.21],
        [0.10, 0.12, 0.05, 0.87, 0.99, 0.15, 0.10],
        [0.32, 0.58, 0.82, 0.38, 0.12, 0.97, 0.94],
        [0.24, 0.42, 0.50, 0.21, 0.09, 0.93, 0.98],
      ]
    },
    {
      name: 'Head 1: Latency & Compute Optimization',
      weights: [
        [0.78, 0.65, 0.42, 0.55, 0.32, 0.40, 0.28],
        [0.62, 0.82, 0.76, 0.68, 0.45, 0.55, 0.38],
        [0.38, 0.71, 0.85, 0.42, 0.25, 0.61, 0.44],
        [0.52, 0.65, 0.40, 0.98, 0.94, 0.72, 0.36],
        [0.30, 0.41, 0.22, 0.93, 0.99, 0.54, 0.22],
        [0.36, 0.51, 0.58, 0.70, 0.51, 0.95, 0.86],
        [0.26, 0.35, 0.41, 0.35, 0.20, 0.85, 0.97],
      ]
    },
    {
      name: 'Head 2: Feature Attribution & Explainability',
      weights: [
        [0.65, 0.52, 0.38, 0.15, 0.10, 0.78, 0.82],
        [0.48, 0.62, 0.59, 0.22, 0.12, 0.81, 0.86],
        [0.35, 0.55, 0.71, 0.18, 0.09, 0.89, 0.88],
        [0.12, 0.19, 0.14, 0.75, 0.68, 0.48, 0.32],
        [0.08, 0.10, 0.06, 0.64, 0.79, 0.25, 0.18],
        [0.74, 0.80, 0.88, 0.45, 0.22, 0.98, 0.96],
        [0.81, 0.85, 0.87, 0.31, 0.17, 0.95, 0.99],
      ]
    }
  ]

  const categories = ['All', 'Machine Learning', 'Full-Stack', 'Systems / Low-Level', 'C++ / Game Dev']

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.category === selectedCategory)

  const activeProject = projects.find(p => p.title === activeProjectTitle) || projects[0]
  const currentSnippet = projectSnippets[activeProject.title] || projectSnippets['Dengue Outbreak Predictor']

  return (
    <section className="systems-section" id="systems">
      <div className="shell">
        {/* Header */}
        <div className="reveal-on-scroll">
          <div className="section-pill">
            <span className="section-pill__tag">Engineering Systems</span>
          </div>
          <h2 className="section-title">Selected Work & Architecture Inspector</h2>
          <p className="section-desc">
            Deep-dive into production full-stack platforms, low-level game loops, and machine learning pipelines.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="category-pill-row reveal-on-scroll delay-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat)
                const first = projects.find(p => cat === 'All' || p.category.toLowerCase().includes(cat.toLowerCase()))
                if (first) setActiveProjectTitle(first.title)
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* The Two-Column Inspector Workspace */}
        <div className="inspector-workspace reveal-on-scroll delay-2">
          {/* Left Column: Project Ledger List */}
          <div className="inspector-ledger">
            <div className="ledger-header">
              <span>PROJECT LEDGER ({filteredProjects.length})</span>
              <span>INDEX</span>
            </div>

            <div className="ledger-list">
              {filteredProjects.map((proj, idx) => {
                const isActive = proj.title === activeProject.title
                return (
                  <button
                    key={proj.title}
                    type="button"
                    className={`ledger-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveProjectTitle(proj.title)}
                  >
                    <div className="ledger-item-left">
                      <span className="ledger-index">0{idx + 1}</span>
                      <div className="ledger-info">
                        <strong className="ledger-title">{proj.title}</strong>
                        <span className="ledger-cat">{proj.category}</span>
                      </div>
                    </div>
                    <div className="ledger-item-right">
                      <span className="ledger-date">{proj.date}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Preview & Code Tab */}
          <div className="inspector-details-card">
            {/* Top Tab Switcher */}
            <div className="details-tab-bar">
              <div className="details-tab-group">
                <button
                  type="button"
                  className={`details-tab ${inspectorTab === 'overview' ? 'is-active' : ''}`}
                  onClick={() => setInspectorTab('overview')}
                >
                  <Icon name="layers" size={14} />
                  <span>Architecture Overview</span>
                </button>
                <button
                  type="button"
                  className={`details-tab ${inspectorTab === 'code' ? 'is-active' : ''}`}
                  onClick={() => setInspectorTab('code')}
                >
                  <Icon name="code" size={14} />
                  <span>Source Code Peek</span>
                </button>
                <button
                  type="button"
                  className={`details-tab ${inspectorTab === 'attention' ? 'is-active' : ''}`}
                  onClick={() => setInspectorTab('attention')}
                >
                  <Icon name="spark" size={14} />
                  <span>Cross-Attention Heatmap (QKV)</span>
                </button>
              </div>

              {/* External Links */}
              <div className="details-actions">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="action-link"
                    title="View Source on GitHub"
                  >
                    <Icon name="github" size={16} />
                    <span>Repository</span>
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="action-link action-link--primary"
                    title="Open Live Deployment"
                  >
                    <Icon name="arrowUpRight" size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="details-body">
              {inspectorTab === 'overview' ? (
                <div className="details-overview-pane">
                  <div className="details-title-row">
                    <div>
                      <span className="details-badge">{activeProject.category}</span>
                      <h3 className="details-name">{activeProject.title}</h3>
                    </div>
                    {activeProject.metrics && (
                      <div className="metric-chip">
                        <span className="metric-chip-label">KEY SPEC</span>
                        <strong className="metric-chip-value">{activeProject.metrics}</strong>
                      </div>
                    )}
                  </div>

                  <p className="details-desc">{activeProject.description}</p>

                  {/* Architecture & Tech Stack Matrix */}
                  <div className="details-tech-section">
                    <span className="tech-section-title">ENGINEERING STACK & APIS:</span>
                    <div className="tech-chips-grid">
                      {activeProject.tags.map((tag) => (
                        <span key={tag} className="tech-chip">
                          <code>{tag}</code>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architectural Highlights */}
                  <div className="architecture-box">
                    <div className="arch-box-title">
                      <Icon name="spark" size={14} />
                      <span>Key Engineering Highlights</span>
                    </div>
                    <ul className="arch-box-bullets">
                      <li>Optimized algorithmic bottlenecks with rigorous time/space complexity analysis.</li>
                      <li>Decoupled modular architecture ensuring separation of concerns and maintainability.</li>
                      <li>Engineered resilient exception handling and deterministic validation layers.</li>
                    </ul>
                  </div>
                </div>
              ) : inspectorTab === 'code' ? (
                <div className="details-code-pane">
                  <div className="code-viewer-header">
                    <div className="code-file-badge">
                      <Icon name="code" size={13} />
                      <span>{currentSnippet.filename}</span>
                    </div>
                    <span className="code-lang-label">{currentSnippet.lang}</span>
                  </div>
                  <pre className="code-block">
                    <code>{currentSnippet.code}</code>
                  </pre>
                </div>
              ) : (
                <div className="details-attention-pane">
                  <div className="attention-header">
                    <div>
                      <span className="attention-title">Transformer Multi-Head Self-Attention ($Q \cdot K^T / \sqrt{"{d_k}"}$)</span>
                      <p className="attention-subtitle">
                        Cross-system attention weights linking UI, microservices, hardware registers & ML inference.
                      </p>
                    </div>
                    <div className="attention-head-selector">
                      {attentionHeads.map((head, idx) => (
                        <button
                          key={head.name}
                          type="button"
                          className={`head-btn ${selectedAttentionHead === idx ? 'is-active' : ''}`}
                          onClick={() => setSelectedAttentionHead(idx)}
                        >
                          Head {idx}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="attention-grid-container">
                    <div className="attention-matrix-table">
                      <div className="matrix-row matrix-header-row">
                        <div className="matrix-cell matrix-cell--corner">Q \ K</div>
                        {attentionNodes.map((colNode) => (
                          <div
                            key={`col-${colNode}`}
                            className={`matrix-cell matrix-cell--head ${hoveredNode === colNode ? 'is-highlighted' : ''}`}
                          >
                            <span>{colNode}</span>
                          </div>
                        ))}
                      </div>

                      {attentionNodes.map((rowNode, rowIdx) => (
                        <div key={`row-${rowNode}`} className="matrix-row">
                          <div
                            className={`matrix-cell matrix-cell--label ${hoveredNode === rowNode ? 'is-highlighted' : ''}`}
                          >
                            <span>{rowNode}</span>
                          </div>
                          {attentionNodes.map((colNode, colIdx) => {
                            const score = attentionHeads[selectedAttentionHead].weights[rowIdx][colIdx]
                            const opacity = 0.12 + score * 0.82
                            return (
                              <div
                                key={`cell-${rowNode}-${colNode}`}
                                className="matrix-cell matrix-cell--data"
                                onMouseEnter={() => setHoveredNode(rowNode)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{
                                  backgroundColor: `rgba(56, 189, 248, ${opacity})`,
                                  color: score > 0.6 ? '#ffffff' : '#94a3b8',
                                }}
                                title={`${rowNode} → ${colNode}: ${(score * 100).toFixed(0)}% attention`}
                              >
                                <span>{score.toFixed(2)}</span>
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="attention-legend">
                    <span className="legend-label">Softmax Attention Score:</span>
                    <div className="legend-gradient-bar" />
                    <div className="legend-labels">
                      <span>0.00 (Independent)</span>
                      <span>0.50 (Correlated)</span>
                      <span>1.00 (Coupled Latency / Shared State)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
