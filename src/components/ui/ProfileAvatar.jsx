import { useState, useRef } from 'react'

export function ProfileAvatar({ size = 'default', src = '/assets/profile.jpeg', alt = 'Huzaifa Naseer' }) {
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    const el = containerRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      className={`profile-avatar profile-avatar--${size}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="profile-avatar__inner">
        {hasError ? (
          <div className="profile-avatar__fallback">
            <span className="fallback-initials">HN</span>
            <span className="fallback-tag">ENGINEER</span>
          </div>
        ) : (
          <>
            <img
              src={src}
              alt={alt}
              className="profile-avatar__img"
              onError={() => setHasError(true)}
            />
            <div className="profile-avatar__overlay" />
          </>
        )}
      </div>

      {/* Decorative Sky Blue Tech Corner Brackets */}
      <div className="profile-avatar__bracket profile-avatar__bracket--tl" />
      <div className="profile-avatar__bracket profile-avatar__bracket--br" />
      <div className="profile-avatar__halo" />
    </div>
  )
}
