import { portfolio } from '../../data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-name">{portfolio.name}</span>
            <span className="footer-meta">Software Engineer · ML Researcher · FAST-NUCES Lahore</span>
          </div>
          <div className="footer-right">
            <a href={`mailto:${portfolio.email}`} className="footer-contact-link">{portfolio.email}</a>
            <a href={portfolio.github} target="_blank" rel="noreferrer" className="footer-contact-link">GitHub</a>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="footer-contact-link">LinkedIn</a>
            <a href="/assets/Huzaifa_Naseer_Resume.pdf" download className="footer-contact-link">Resume</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
