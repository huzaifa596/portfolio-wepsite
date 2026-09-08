import { useState, useEffect } from 'react'
import './styles/tokens.css'
import './styles/global.css'
import './styles/portfolio.css'
import './styles/profile-avatar.css'
import './styles/whoami.css'

import { useTheme } from './hooks/useTheme'
import { useScrollProgress, useScrollReveal } from './hooks/useScrollObserver'

import { FloatingNav } from './components/navigation/FloatingNav'
import { Hero } from './components/sections/Hero'
import { WhoAmI } from './components/sections/WhoAmI'
import { Experience } from './components/sections/Experience'
import { Education } from './components/sections/Education'
import { Projects } from './components/sections/Projects'
import { Footer } from './components/layout/Footer'

function App() {
  const { theme, toggleTheme } = useTheme()
  const scrollProgress = useScrollProgress()
  useScrollReveal()

  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['overview', 'about', 'experience', 'education', 'projects']
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
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Floating Nav */}
      <FloatingNav
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main>
        {/* 1 — Hero / Landing */}
        <Hero />

        {/* 2 — Who Am I & Passions */}
        <WhoAmI />

        {/* 3 — Work Experience */}
        <Experience />

        {/* 4 — Education */}
        <Education />

        {/* 5 — Projects */}
        <Projects />
      </main>

      <Footer />
    </div>
  )
}

export default App
