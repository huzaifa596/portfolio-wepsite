import { experience } from '../../data/portfolio'

export function Experience() {
  return (
    <section className="exp-section" id="experience">
      <div className="shell">
        <div className="exp-header reveal-on-scroll">
          <span className="section-tag">Experience</span>
          <h2 className="exp-title">Three internships, three stacks, two years.</h2>
        </div>

        <div className="exp-timeline">
          {experience.map((item, index) => (
            <article key={`${item.company}-${item.role}`} className="exp-entry reveal-on-scroll" style={{ '--delay': `${index * 80}ms` }}>
              <div className="exp-entry-left">
                <span className="exp-period">{item.period}</span>
                {item.current && <span className="exp-now">NOW</span>}
              </div>
              <div className="exp-entry-line">
                <div className="exp-entry-dot" />
                {index < experience.length - 1 && <div className="exp-entry-line-track" />}
              </div>
              <div className="exp-entry-right">
                <div className="exp-entry-heading">
                  <h3 className="exp-company">{item.company}</h3>
                  <span className="exp-role">{item.role}</span>
                </div>
                <p className="exp-summary">{item.summary}</p>
                <ul className="exp-bullets">
                  {item.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="exp-tech">
                  {item.tags.map(t => <code key={t} className="exp-tech-item">{t}</code>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
