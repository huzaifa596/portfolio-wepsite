import { useEffect, useRef } from 'react'

export function useHorizontalScroll(ref, speed = 0.5) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = 1 - (rect.top / viewH)
      el.style.setProperty('--scroll-x', `${progress * speed * 100}px`)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])
}

export function useParallax(ref, factor = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const center = rect.top + rect.height / 2
      const offset = (center - viewH / 2) * factor
      el.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, factor])
}

export function SplitReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-revealed')
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`split-reveal ${className}`} style={{ '--split-delay': `${delay}ms` }}>
      {children}
    </div>
  )
}
