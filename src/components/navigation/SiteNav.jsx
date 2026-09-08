import { useState, useEffect } from 'react'
import { portfolio } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

const navLinks = [
  { id: 'overview', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Background' },
]

export function SiteNav({ theme, toggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
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

        <nav className="site-nav-links" aria-label="Main navigation">
          {navLinks.map(link => (
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
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
            <span className="site-nav-theme-text">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
          <a
            href={`mailto:${portfolio.email}`}
            className="site-nav-cta"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  )
}
