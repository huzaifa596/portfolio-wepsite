import { useState, useEffect } from 'react'
import { portfolio } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

export function FloatingNav({ theme, toggleTheme, activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { id: 'overview', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
  ]

  const handleLinkClick = (id) => {
    setMobileOpen(false)
    if (onNavigate) {
      onNavigate(id)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`floating-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="floating-nav-container">
        {/* Brand */}
        <button
          type="button"
          className="nav-brand"
          onClick={() => handleLinkClick('overview')}
          aria-label="Scroll to top"
        >
          <span className="brand-badge">HN</span>
          <span className="brand-name">Huzaifa Naseer</span>
        </button>

        {/* Desktop Nav Pills */}
        <nav className="nav-dock" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-dock-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right Utility Controls */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="nav-btn theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* External Quick Link */}
          <a
            href={portfolio.github}
            target="_blank"
            rel="noreferrer"
            className="nav-btn"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <Icon name="github" size={18} />
          </a>

          {/* Contact CTA */}
          <a
            href={`mailto:${portfolio.email}`}
            className="nav-cta-btn"
          >
            <span>Get in Touch</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="nav-btn mobile-menu-toggle"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                <span>{item.label}</span>
              </button>
            ))}
            <div className="mobile-drawer-footer">
              <a href={portfolio.github} target="_blank" rel="noreferrer" className="mobile-pill-link">
                GitHub
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="mobile-pill-link">
                LinkedIn
              </a>
              <a href="/assets/Huzaifa_Naseer_Resume.pdf" download className="mobile-pill-link">
                Resume PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
