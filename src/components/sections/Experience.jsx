import { experience } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

export function Experience() {
  return (
    <section className="exp-section section--alt" id="experience">
      <div className="shell">
        <Reveal>
          <div className="section-label">
            <span className="section-label__num">02</span>
            <div className="section-label__line" />
            <span className="section-label__text">EXPERIENCE</span>
          </div>
        </Reveal>

        <div className="exp__list">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.role}`} delay={index * 100}>
              <article className="exp__item">
                <div className="exp__item-left">
                  <span className="exp__period">{item.period}</span>
                  {item.current && (
                    <span className="exp__current-badge"><i />NOW</span>
                  )}
                </div>
                <div className="exp__item-right">
                  <div className="exp__item-top">
                    <h3 className="exp__company">{item.company}</h3>
                    <span className="exp__role">{item.role}</span>
                  </div>
                  <p className="exp__summary">{item.summary}</p>
                  <ul className="exp__bullets">
                    {item.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="exp__tags">
                    {item.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
