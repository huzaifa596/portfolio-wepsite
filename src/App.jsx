import { useState, useEffect } from 'react'
import './styles/tokens.css'
import './styles/global.css'
import './styles/portfolio.css'
import './styles/profile-avatar.css'

import { useTheme } from './hooks/useTheme'
import { useScrollProgress, useScrollReveal } from './hooks/useScrollObserver'

import { FloatingNav } from './components/navigation/FloatingNav'
import { Hero } from './components/sections/Hero'
import { ResearchLab } from './components/sections/ResearchLab'
import { SystemsInspector } from './components/sections/SystemsInspector'
import { InteractiveTerminal } from './components/sections/InteractiveTerminal'
import { TimelineVault } from './components/sections/TimelineVault'
import { Footer } from './components/layout/Footer'

function App() {
  const { theme, toggleTheme } = useTheme()
  const scrollProgress = useScrollProgress()
  useScrollReveal()

  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['overview', 'research-lab', 'systems', 'terminal', 'timeline']
      const scrollPos = window.scrollY + 240

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [])

  return (
    <div className="portfolio-app-root">
      {/* Top Scroll Progress Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Floating Dynamic Navigation Dock */}
      <FloatingNav
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main>
        {/* View 1: Command Center Overview */}
        <Hero />

        {/* View 2: Interactive Research Lab (XEL-Sepsis Clinical AI) */}
        <ResearchLab />

        {/* View 3: Engineering Systems & Architecture Inspector */}
        <SystemsInspector />

        {/* View 4: Developer Shell (Interactive Terminal) */}
        <InteractiveTerminal />

        {/* View 5: Timeline & Verified Credentials Vault */}
        <TimelineVault />
      </main>

      {/* Footer & Direct Contact Endpoints */}
      <Footer />
    </div>
  )
}

export default App
