import { education, certifications } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

const instituteLogos = {
  'FAST National University of Computer and Emerging Sciences, Lahore': {
    icon: 'academic',
    color: 'var(--sky)',
    short: 'FAST-NUCES',
    badge: 'UNDERGRADUATE',
  },
  'Government College University (GCU), Lahore': {
    icon: 'building',
    color: '#3b82f6',
    short: 'GCU LAHORE',
    badge: 'COLLEGE (FSC)',
  },
  'Unique High School, Wahdat Road, Lahore': {
    icon: 'shield',
    color: '#f59e0b',
    short: 'UNIQUE HIGH',
    badge: 'MATRICULATION',
  },
}

const certLogos = {
  'Programming with JavaScript': {
    icon: 'meta',
    color: '#0081fb',
    issuerTag: 'META CERTIFIED',
  },
  'Developing Websites and Front-Ends with Bootstrap': {
    icon: 'ibm',
    color: '#0f62fe',
    issuerTag: 'IBM VERIFIED',
  },
  'Human Research: Data & Specimens Research': {
    icon: 'citi',
    color: 'var(--sky)',
    issuerTag: 'CITI / MIT AFFILIATES',
  },
  'CITI Conflicts of Interest': {
    icon: 'shield',
    color: '#8b5cf6',
    issuerTag: 'RESEARCH COMPLIANCE',
  },
}

export function Background() {
  return (
    <section className="bg-section" id="education">
      <div className="shell">
        <div className="bg-header reveal-on-scroll">
          <span className="section-tag">Academic & Professional Credentials</span>
          <h2 className="bg-title">Education, honors, and verified certifications.</h2>
        </div>

        <div className="bg-grid">
          {/* ── Left Column: Education Cards ── */}
          <div className="bg-column reveal-on-scroll delay-1">
            <div className="bg-column-header">
              <span className="bg-column-tag">INSTITUTIONAL EDUCATION</span>
              <span className="bg-column-count">3 DEGREE MILESTONES</span>
            </div>

            <div className="bg-cards-list">
              {education.map((item, idx) => {
                const meta = instituteLogos[item.school] || {
                  icon: 'academic',
                  color: 'var(--sky)',
                  short: 'ACADEMIC',
                  badge: 'EDUCATION',
                }
                return (
                  <article
                    key={item.school}
                    className="bg-card bg-card--edu reveal-on-scroll"
                    style={{ '--delay': `${idx * 120}ms` }}
                  >
                    <div className="bg-card-top">
                      <div className="bg-logo-badge" style={{ '--logo-color': meta.color }}>
                        <Icon name={meta.icon} size={18} />
                        <span className="bg-logo-text">{meta.short}</span>
                      </div>
                      <span className="bg-card-period">{item.period}</span>
                    </div>

                    <h3 className="bg-card-school">{item.school}</h3>
                    <p className="bg-card-qual">{item.qualification}</p>

                    <div className="bg-card-footer">
                      <span className="bg-card-detail">
                        <Icon name="spark" size={13} className="bg-spark-icon" />
                        {item.detail}
                      </span>
                      <span className="bg-status-pill">{meta.badge}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* ── Right Column: Certifications Cards ── */}
          <div className="bg-column reveal-on-scroll delay-2">
            <div className="bg-column-header">
              <span className="bg-column-tag">PROFESSIONAL LICENSES</span>
              <span className="bg-column-count">4 ACTIVE CERTIFICATES</span>
            </div>

            <div className="bg-cards-list">
              {certifications.map((cert, idx) => {
                const meta = certLogos[cert.title] || {
                  icon: 'award',
                  color: 'var(--sky)',
                  issuerTag: 'VERIFIED',
                }
                return (
                  <article
                    key={cert.title}
                    className="bg-card bg-card--cert reveal-on-scroll"
                    style={{ '--delay': `${idx * 120 + 80}ms` }}
                  >
                    <div className="bg-card-top">
                      <div className="bg-logo-badge" style={{ '--logo-color': meta.color }}>
                        <Icon name={meta.icon} size={18} />
                        <span className="bg-logo-text">{meta.issuerTag}</span>
                      </div>
                      <span className="bg-card-period">{cert.date}</span>
                    </div>

                    <h3 className="bg-card-title">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-cert-link"
                          title="Verify Credential on Coursera"
                        >
                          <span>{cert.title}</span>
                          <Icon name="arrowUpRight" size={14} className="bg-cert-link-icon" />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h3>

                    <p className="bg-card-issuer">{cert.issuer}</p>

                    <div className="bg-card-footer">
                      <span className="bg-verified-pill">
                        <span className="bg-verified-dot" />
                        <span>VERIFIED CREDENTIAL</span>
                      </span>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-verify-btn"
                        >
                          <span>Verify</span>
                          <Icon name="arrowUpRight" size={12} />
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
