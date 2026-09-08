import { certifications } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'

export function Certifications() {
  return (
    <section className="certs-section section--alt" id="certifications">
      <div className="shell">
        <Reveal>
          <div className="section-label">
            <span className="section-label__num">06</span>
            <div className="section-label__line" />
            <span className="section-label__text">CERTIFICATIONS</span>
          </div>
        </Reveal>

        <div className="certs__grid">
          {certifications.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 80}>
              <div className="certs__item">
                <div className="certs__item-top">
                  <h3>{cert.title}</h3>
                  <span className="certs__issuer">{cert.issuer}</span>
                </div>
                <div className="certs__item-bottom">
                  <span className="certs__date">{cert.date}</span>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noreferrer" className="certs__verify magnetic-target">
                      Verify <Icon name="arrowUpRight" size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
