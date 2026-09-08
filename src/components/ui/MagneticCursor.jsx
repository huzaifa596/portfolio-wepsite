import { useEffect, useRef } from 'react'

export function MagneticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ('ontouchstart' in window) return // disable on touch

    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let isHovering = false

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleEnterInteractive = () => {
      isHovering = true
      ring.classList.add('is-hovering')
    }

    const handleLeaveInteractive = () => {
      isHovering = false
      ring.classList.remove('is-hovering')
    }

    document.addEventListener('mousemove', handleMove, { passive: true })

    // Observe interactive elements
    const observer = new MutationObserver(() => attachListeners())
    observer.observe(document.body, { childList: true, subtree: true })

    function attachListeners() {
      document.querySelectorAll('a, button, .magnetic-target').forEach(el => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
        el.addEventListener('mouseenter', handleEnterInteractive)
        el.addEventListener('mouseleave', handleLeaveInteractive)
      })
    }
    attachListeners()

    let raf
    const animate = () => {
      // Dot follows mouse tightly
      dotX += (mouseX - dotX) * 0.25
      dotY += (mouseY - dotY) * 0.25
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`

      // Ring follows with more delay
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      const scale = isHovering ? 2.2 : 1
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${scale})`

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', handleMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
