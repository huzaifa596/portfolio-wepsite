import { useEffect, useState } from 'react'
import { navigation, portfolio } from '../../data/portfolio'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'

export function Navbar({ theme, onThemeToggle }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) setActiveSection(visibleEntry.target.id)
      },
      { rootMargin: '-32% 0px -58% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Huzaifa Naseer, back to top">
          <span className="brand__mark">HN</span>
          <span className="brand__name">Huzaifa</span>
        </a>

        <div className={`nav-panel ${open ? 'is-open' : ''}`} id="primary-navigation">
          <div className="nav-links">
            {navigation.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className={activeSection === href.slice(1) ? 'is-active' : ''}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions nav-actions--mobile">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <Button href="#contact" variant="compact" onClick={closeMenu}>Let&apos;s talk</Button>
          </div>
        </div>

        <div className="nav-actions nav-actions--desktop">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <Button href="#contact" variant="compact">Let&apos;s talk</Button>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </nav>
    </header>
  )
}
