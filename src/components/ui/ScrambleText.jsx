import { useEffect, useRef, useState } from 'react'

export function useTextScramble(targetText, options = {}) {
  const { duration = 1200, delay = 0, trigger = true } = options
  const [displayed, setDisplayed] = useState('')
  const chars = '!<>-_\\/[]{}—=+*^?#__abcdefgh'
  const rafRef = useRef(null)

  useEffect(() => {
    if (!trigger) return

    let start = null
    const len = targetText.length

    const timeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)

        let result = ''
        for (let i = 0; i < len; i++) {
          const charProgress = i / len
          if (progress > charProgress) {
            // Character is revealed
            const revealProgress = (progress - charProgress) / (1 - charProgress)
            if (revealProgress > 0.7) {
              result += targetText[i]
            } else {
              result += chars[Math.floor(Math.random() * chars.length)]
            }
          } else {
            result += chars[Math.floor(Math.random() * chars.length)]
          }
        }

        if (progress >= 1) {
          setDisplayed(targetText)
        } else {
          setDisplayed(result)
          rafRef.current = requestAnimationFrame(animate)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [targetText, duration, delay, trigger])

  return displayed
}

export function ScrambleText({ text, duration = 1200, delay = 0, className = '', as: Tag = 'span' }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const displayed = useTextScramble(text, { duration, delay, trigger: isVisible })

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {isVisible ? displayed : '\u00A0'.repeat(text.length)}
    </Tag>
  )
}
