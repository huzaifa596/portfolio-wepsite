import { useState, useEffect } from 'react'
import './styles/tokens.css'
import './styles/global.css'
import './styles/site.css'

import { useTheme } from './hooks/useTheme'
import { useScrollProgress, useScrollReveal } from './hooks/useScrollObserver'

import { SiteNav } from './components/navigation/SiteNav'
import { InteractiveBackground } from './components/canvas/InteractiveBackground'
import { Opening } from './components/sections/Opening'
import { WorkDomains } from './components/sections/WorkDomains'
import { Experience } from './components/sections/Experience'
import { Background } from './components/sections/Background'
import { Footer } from './components/layout/Footer'

function App() {
  const { theme, toggleTheme } = useTheme()
  const scrollProgress = useScrollProgress()
  useScrollReveal()

  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['overview', 'work', 'experience', 'education']
      const scrollPos = window.scrollY + 120

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
    <div className="app-root">
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <SiteNav
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <InteractiveBackground theme={theme} />

      <main>
        <Opening />
        <WorkDomains />
        <Experience />
        <Background />
      </main>

      <Footer />
    </div>
  )
}

export default App
