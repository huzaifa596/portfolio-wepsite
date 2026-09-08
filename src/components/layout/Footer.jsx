import { portfolio } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="shell">
        <div className="footer-top reveal-on-scroll">
          <div className="footer-headline">
            <span className="footer-tagline">OPEN FOR OPPORTUNITIES</span>
            <h2 className="footer-title">Let’s build something intelligent.</h2>
            <p className="footer-sub">
              Available for full-stack engineering roles, healthcare ML research collaborations, and high-impact systems projects.
            </p>
          </div>

          <div className="footer-action-links">
            <a href={`mailto:${portfolio.email}`} className="footer-cta-primary">
              <Icon name="mail" size={18} />
              <span>{portfolio.email}</span>
            </a>
            <a
              href={portfolio.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="footer-cta-secondary"
            >
              <Icon name="message" size={18} />
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-dot-sky" />
            <span className="footer-name">{portfolio.name}</span>
            <span className="footer-copy">· Software Engineer & ML Researcher</span>
          </div>

          <div className="footer-nav-socials">
            <a href={portfolio.github} target="_blank" rel="noreferrer" className="footer-social-link">
              GitHub
            </a>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="footer-social-link">
              LinkedIn
            </a>
            <a href="/assets/Huzaifa_Naseer_Resume.pdf" download className="footer-social-link">
              Resume PDF
            </a>
            <button type="button" onClick={scrollToTop} className="footer-back-to-top" title="Scroll back to top">
              <Icon name="arrowUp" size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
