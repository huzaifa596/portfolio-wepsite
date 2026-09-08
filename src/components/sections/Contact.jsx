import { portfolio } from '../../data/portfolio'
import { SectionHeading } from '../layout/SectionHeading'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact__orb contact__orb--one" aria-hidden="true" />
      <div className="contact__orb contact__orb--two" aria-hidden="true" />

      <div className="shell contact__inner">
        <Reveal>
          <SectionHeading
            label="Get In Touch"
            title={
              <>
                Let&apos;s build something <span className="text-gradient">remarkable</span> together.
              </>
            }
            align="center"
          />
          <p className="contact__copy">
            Currently open to internships, software engineering roles, and AI research collaborations. Let&apos;s talk!
          </p>
          <div className="contact__action-group">
            <Button href={`mailto:${portfolio.email}`} className="contact__button">
              Send an Email <Icon name="arrowRight" size={17} />
            </Button>
            <Button
              href={portfolio.whatsapp}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="contact__button"
            >
              <Icon name="chat" size={17} /> Message on WhatsApp
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="contact-grid glass-card">
            <a href={`mailto:${portfolio.email}`} className="contact-card-item">
              <div className="contact-card-item__icon"><Icon name="mail" size={20} /></div>
              <div className="contact-card-item__text">
                <small>Email</small>
                <span>{portfolio.email}</span>
              </div>
            </a>

            <a href={`tel:${portfolio.phone.replace(/\s/g, '')}`} className="contact-card-item">
              <div className="contact-card-item__icon"><Icon name="phone" size={20} /></div>
              <div className="contact-card-item__text">
                <small>Phone / WhatsApp</small>
                <span>{portfolio.phone}</span>
              </div>
            </a>

            <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="contact-card-item">
              <div className="contact-card-item__icon"><Icon name="linkedin" size={20} /></div>
              <div className="contact-card-item__text">
                <small>LinkedIn</small>
                <span>in/huzaifa-naseer-231728234</span>
              </div>
            </a>

            <a href={portfolio.github} target="_blank" rel="noreferrer" className="contact-card-item">
              <div className="contact-card-item__icon"><Icon name="github" size={20} /></div>
              <div className="contact-card-item__text">
                <small>GitHub</small>
                <span>github.com/huzaifa596</span>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
