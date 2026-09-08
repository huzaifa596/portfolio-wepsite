import { useState, useEffect } from 'react'
import { portfolio } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

const navLinks = [
  { id: 'overview', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Background' },
  { id: 'contact', label: 'Contact' },
]

export function SiteNav({ theme, toggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleClick = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="shell site-nav-inner">
          <button
            type="button"
            className="site-nav-brand"
            onClick={() => handleClick('overview')}
            aria-label="Back to top"
          >
            <span className="site-nav-initials">HN</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="site-nav-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`site-nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                onClick={() => handleClick(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="site-nav-actions">
            <button
              type="button"
              className="site-nav-theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
              <span className="site-nav-theme-text">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
            </button>
            <button
              type="button"
              className="site-nav-cta"
              onClick={() => handleClick('contact')}
            >
              Get in touch
            </button>
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="site-nav-mobile-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span className="mobile-nav-title">NAVIGATE // STATIONS</span>
              <button
                type="button"
                className="mobile-nav-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <nav className="mobile-nav-list">
              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  type="button"
                  className={`mobile-nav-item ${activeSection === link.id ? 'is-active' : ''}`}
                  onClick={() => handleClick(link.id)}
                >
                  <span className="mobile-nav-num">0{idx + 1}</span>
                  <span className="mobile-nav-label">{link.label}</span>
                  <Icon name="arrowRight" size={14} className="mobile-nav-arrow" />
                </button>
              ))}
            </nav>
            <div className="mobile-nav-footer">
              <button
                type="button"
                className="mobile-nav-contact-btn"
                onClick={() => handleClick('contact')}
              >
                <span>Initiate Contact</span>
                <Icon name="arrowRight" size={14} />
              </button>
              <span className="mobile-nav-author">HUZAIFA NASEER · FAST-NUCES CS</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
