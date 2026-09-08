import { portfolio, stats } from '../../data/portfolio'
import { Icon } from '../ui/Icon'
import { ProfileAvatar } from '../ui/ProfileAvatar'
import { Hero3DCanvas } from '../canvas/Hero3DCanvas'

export function Hero() {
  return (
    <section className="hero-section" id="overview">
      {/* 3D Sky-Blue Interactive Particle Canvas */}
      <Hero3DCanvas />

      {/* Atmospheric Subtle Grid */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="shell hero-shell">
        {/* Top Developer Spec Pill (NO GREEN DOT) */}
        <div className="hero-top-pill reveal-on-scroll">
          <span className="spec-badge">RESEARCH & DEV</span>
          <span className="spec-divider">/</span>
          <span className="spec-text">FAST-NUCES LAHORE · BSCS</span>
          <span className="spec-divider">/</span>
          <span className="spec-text">{portfolio.location.toUpperCase()}</span>
        </div>

        {/* Two-Column Hero Stage */}
        <div className="hero-stage">
          {/* Left: Bold Satoshi Headline & Identity */}
          <div className="hero-headline-col reveal-on-scroll delay-1">
            <h1 className="hero-main-title">
              Crafting <span className="text-sky-gradient">Full-Stack Systems</span> & Explainable Healthcare AI.
            </h1>

            <p className="hero-lead">
              I’m <strong>Huzaifa Naseer</strong> — a software engineer building resilient web platforms in <strong>React, Node.js & MongoDB</strong>, low-level engines in <strong>C++ & x86 Assembly</strong>, and researching ensemble deep learning models for early ICU clinical diagnostics.
            </p>

            {/* CTAs */}
            <div className="hero-action-row">
              <a href="#research-lab" className="btn-sky-primary">
                <span>Explore Sepsis AI Lab</span>
                <Icon name="arrowRight" size={16} />
              </a>

              <a href="#systems" className="btn-sky-secondary">
                <span>Inspect Systems</span>
              </a>

              <a
                href="/assets/Huzaifa_Naseer_Resume.pdf"
                download
                className="btn-sky-ghost"
                title="Download Official Resume PDF"
              >
                <Icon name="download" size={15} />
                <span>Resume</span>
              </a>
            </div>

            {/* Quick Skills Marquee / Chips */}
            <div className="hero-stack-chips">
              <span className="stack-label">CORE STACK:</span>
              <div className="stack-chips-wrap">
                {['React', 'Node.js', 'Express', 'MongoDB', 'C++', 'Python', 'XGBoost', 'LightGBM', 'LSTM', 'x86 Assembly'].map((s) => (
                  <span key={s} className="stack-chip">
                    <code>{s}</code>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3D Interactive Profile Picture */}
          <div className="hero-media-col reveal-on-scroll delay-2">
            <div className="profile-media-frame">
              <ProfileAvatar size="large" />
              <div className="media-caption-box">
                <span className="caption-name">{portfolio.name}</span>
                <span className="caption-role">BSCS Candidate (2024–2028)</span>
                <div className="caption-badges">
                  <span className="caption-pill">CGPA 3.13 / 4.0</span>
                  <span className="caption-pill">98th %ile NTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="hero-stats-deck reveal-on-scroll delay-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-index">0{i + 1}</span>
              <div className="stat-content">
                <strong className="stat-number">{stat.value}</strong>
                <span className="stat-description">{stat.label}</span>
              </div>
            </div>
          ))}
          <div className="stat-card">
            <span className="stat-index">04</span>
            <div className="stat-content">
              <strong className="stat-number text-sky">MIMIC-IV</strong>
              <span className="stat-description">ICU Clinical Dataset Research</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
