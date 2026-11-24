import { createContext, useContext, useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'
export const MotionContext = createContext(true)
export const useMotion = () => useContext(MotionContext)

// Motion is on unless the system asks for less or the visitor pauses it.
export function useMotionSetting() {
  const [reduced, setReduced] = useState(() => matchMedia(QUERY).matches)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const mq = matchMedia(QUERY)
    const sync = () => setReduced(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return { reduced, paused, setPaused, on: !reduced && !paused }
}

export function useInView(ref, { once = false, threshold = 0.35 } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) setInView(false)
      },
      { threshold },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, once, threshold])
  return inView
}
