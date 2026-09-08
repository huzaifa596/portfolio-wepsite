import { useState, useEffect } from 'react'
import { experience, education, certifications } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

export function TimelineVault() {
  const [activeTab, setActiveTab] = useState('experience') // 'experience' | 'education' | 'certs' | 'landscape'

  // Gradient Descent simulator state
  const [learningRate, setLearningRate] = useState(0.04)
  const [momentum, setMomentum] = useState(0.85)
  const [epoch, setEpoch] = useState(24)
  const [trajectory, setTrajectory] = useState([
    { x: -35, y: -28, loss: 2.45 },
    { x: -28, y: -20, loss: 1.88 },
    { x: -18, y: -12, loss: 1.32 },
    { x: -10, y: -5, loss: 0.85 },
    { x: -4, y: -1, loss: 0.42 },
    { x: 0, y: 0, loss: 0.05 },
  ])

  // Recalculate trajectory based on learning rate
  useEffect(() => {
    let currX = -38
    let currY = -32
    let vx = 0
    let vy = 0
    const points = [{ x: currX, y: currY, loss: Number((currX*currX*0.001 + currY*currY*0.001 + 2.1).toFixed(3)) }]

    for (let i = 1; i <= epoch; i++) {
      // Gradients for synthetic bowl loss function L = 0.5*x^2 + 0.8*y^2
      const gradX = currX * 0.12
      const gradY = currY * 0.16

      vx = momentum * vx - learningRate * gradX * 50
      vy = momentum * vy - learningRate * gradY * 50

      currX += vx
      currY += vy

      const lossVal = Math.max(0.02, Number((0.0008 * (currX * currX + currY * currY) + Math.sin(currX*0.2)*0.1).toFixed(4)))
      points.push({ x: currX, y: currY, loss: lossVal })
    }
    setTrajectory(points)
  }, [learningRate, momentum, epoch])

  return (
    <section className="vault-section" id="timeline">
      <div className="shell">
        <div className="reveal-on-scroll">
          <div className="section-pill">
            <span className="section-pill__tag">Career & Credentials</span>
          </div>
          <h2 className="section-title">Experience & Certified Credentials</h2>
          <p className="section-desc">
            Industry engineering internships, university academic milestones at FAST-NUCES, and verified professional certifications.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="vault-tabs reveal-on-scroll delay-1">
          <button
            type="button"
            className={`vault-tab-btn ${activeTab === 'experience' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <span>Engineering Internships ({experience.length})</span>
          </button>
          <button
            type="button"
            className={`vault-tab-btn ${activeTab === 'education' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <span>Academic Milestones ({education.length})</span>
          </button>
          <button
            type="button"
            className={`vault-tab-btn ${activeTab === 'certs' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('certs')}
          >
            <span>Verified Certifications ({certifications.length})</span>
          </button>
          <button
            type="button"
            className={`vault-tab-btn ${activeTab === 'landscape' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('landscape')}
          >
            <Icon name="spark" size={14} />
            <span>Loss Landscape Optimizer</span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="vault-content reveal-on-scroll delay-2">
          {activeTab === 'experience' && (
            <div className="vault-timeline">
              {experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="vault-timeline-card">
                  <div className="timeline-meta">
                    <span className="timeline-period">{item.period}</span>
                    {item.current && <span className="timeline-badge-current">Present Role</span>}
                  </div>

                  <div className="timeline-body">
                    <div className="timeline-header">
                      <h3 className="timeline-role">{item.role}</h3>
                      <span className="timeline-company">{item.company}</span>
                    </div>

                    <p className="timeline-summary">{item.summary}</p>

                    <ul className="timeline-bullets">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>

                    <div className="timeline-tags">
                      {item.tags.map((t) => (
                        <span key={t} className="vault-tag">
                          <code>{t}</code>
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="vault-grid">
              {education.map((edu) => (
                <div key={edu.school} className="vault-edu-card">
                  <div className="edu-period-badge">
                    <code>{edu.period}</code>
                  </div>
                  <h3 className="edu-school">{edu.school}</h3>
                  <p className="edu-qual">{edu.qualification}</p>
                  <div className="edu-score-chip">
                    <span>{edu.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="vault-grid">
              {certifications.map((cert) => (
                <div key={cert.title} className="vault-cert-card">
                  <div className="cert-top">
                    <div className="cert-badge-icon">
                      <Icon name="spark" size={18} />
                    </div>
                    <span className="cert-date">{cert.date}</span>
                  </div>

                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-issuer">{cert.issuer}</span>

                  <div className="cert-foot">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-verify-btn"
                      >
                        <span>Verify Credential</span>
                        <Icon name="arrowUpRight" size={14} />
                      </a>
                    ) : (
                      <span className="cert-verified-label">MIT Affiliate Research Certified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'landscape' && (
            <div className="loss-landscape-pane">
              <div className="landscape-controls-bar">
                <div className="control-group">
                  <span className="control-label">Learning Rate ($\alpha$):</span>
                  <input
                    type="range"
                    min="0.01"
                    max="0.09"
                    step="0.005"
                    value={learningRate}
                    onChange={(e) => setLearningRate(Number(e.target.value))}
                    className="control-input"
                  />
                  <code className="control-val">{learningRate.toFixed(3)}</code>
                </div>

                <div className="control-group">
                  <span className="control-label">Momentum ($\beta$):</span>
                  <input
                    type="range"
                    min="0.50"
                    max="0.98"
                    step="0.02"
                    value={momentum}
                    onChange={(e) => setMomentum(Number(e.target.value))}
                    className="control-input"
                  />
                  <code className="control-val">{momentum.toFixed(2)}</code>
                </div>

                <div className="control-group">
                  <span className="control-label">Epochs:</span>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="2"
                    value={epoch}
                    onChange={(e) => setEpoch(Number(e.target.value))}
                    className="control-input"
                  />
                  <code className="control-val">{epoch}</code>
                </div>
              </div>

              <div className="landscape-canvas-box">
                <div className="landscape-overlay-stats">
                  <span className="stat-pill-mini">Global Minimum: L = 0.024</span>
                  <span className="stat-pill-mini">Optimizer: AdamW / Momentum</span>
                </div>
                <svg className="landscape-svg" viewBox="-60 -60 120 120" preserveAspectRatio="xMidYMid meet">
                  {/* Contour rings */}
                  {[50, 40, 30, 20, 10, 4].map((r, idx) => (
                    <ellipse
                      key={r}
                      cx="0"
                      cy="0"
                      rx={r}
                      ry={r * 0.75}
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.15)"
                      strokeWidth="1.2"
                      strokeDasharray={idx % 2 === 0 ? 'none' : '4 2'}
                    />
                  ))}
                  <circle cx="0" cy="0" r="3" fill="#38bdf8" />
                  
                  {/* Optimization Trajectory Line */}
                  <polyline
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={trajectory.map(p => `${p.x},${p.y}`).join(' ')}
                  />

                  {/* Trajectory Points */}
                  {trajectory.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={i === trajectory.length - 1 ? 4.5 : 2.5}
                        fill={i === trajectory.length - 1 ? '#ffffff' : '#38bdf8'}
                        stroke="#040812"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
