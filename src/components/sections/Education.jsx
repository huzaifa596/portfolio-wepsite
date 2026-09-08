import { education } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

export function Education() {
  return (
    <section className="edu-section section--alt" id="education">
      <div className="shell">
        <Reveal>
          <div className="section-label">
            <span className="section-label__num">03</span>
            <div className="section-label__line" />
            <span className="section-label__text">EDUCATION</span>
          </div>
        </Reveal>

        <div className="edu__list">
          {education.map((item, index) => (
            <Reveal key={item.school} delay={index * 100}>
              <div className="edu__item">
                <div className="edu__item-period">{item.period}</div>
                <div className="edu__item-body">
                  <h3>{item.school}</h3>
                  <p className="edu__qual">{item.qualification}</p>
                  <strong className="edu__detail">{item.detail}</strong>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
