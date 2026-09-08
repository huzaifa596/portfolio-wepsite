import { useEffect, useRef, useState, useCallback } from 'react'
import { Icon } from '../ui/Icon'

const FLOATING_TECH_ITEMS = [
  {
    id: 'x86',
    label: 'x86_64 ASM',
    sub: 'Opcode Stepper · Pop Till Drop',
    icon: 'cpu',
    top: '12%',
    left: '8%',
    depth: 0.035,
    tag: 'SYSTEMS',
  },
  {
    id: 'pytorch',
    label: 'PyTorch / ML',
    sub: 'XEL-Sepsis · AUROC 0.93',
    icon: 'zap',
    top: '22%',
    left: '88%',
    depth: -0.045,
    tag: 'RESEARCH',
  },
  {
    id: 'react',
    label: 'React 19 & Vite',
    sub: 'HireAtlas · Glassmorphism',
    icon: 'react',
    top: '42%',
    left: '5%',
    depth: 0.05,
    tag: 'FRONTEND',
  },
  {
    id: 'xgboost',
    label: 'XGBoost + LSTM',
    sub: '50k+ MIMIC-IV ICU Cohort',
    icon: 'layers',
    top: '56%',
    left: '91%',
    depth: -0.038,
    tag: 'CLINICAL AI',
  },
  {
    id: 'cpp',
    label: 'C++20 Engine',
    sub: 'Tetris Arcade · OOP Core',
    icon: 'cplusplus',
    top: '72%',
    left: '7%',
    depth: 0.042,
    tag: 'NATIVE',
  },
  {
    id: 'node',
    label: 'Node.js & Express',
    sub: 'Hospital Billing API',
    icon: 'nodejs',
    top: '84%',
    left: '86%',
    depth: -0.04,
    tag: 'BACKEND',
  },
  {
    id: 'mongo',
    label: 'MongoDB Atlas',
    sub: 'Aggregation Pipelines',
    icon: 'database',
    top: '32%',
    left: '93%',
    depth: 0.03,
    tag: 'DATABASE',
  },
  {
    id: 'fast',
    label: 'FAST-NUCES',
    sub: 'BS Computer Science · 2028',
    icon: 'terminal',
    top: '64%',
    left: '3%',
    depth: -0.032,
    tag: 'ACADEMICS',
  },
]

export function InteractiveBackground({ theme = 'dark' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    isHovered: false,
    speed: 0,
    lastX: 0,
    lastY: 0,
  })
  const pulsesRef = useRef([])
  const [activeChip, setActiveChip] = useState(null)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })
  const rafParallaxRef = useRef(null)

  // Trigger cyber sonar wave on click anywhere on document
  const triggerSonarWave = useCallback((clientX, clientY) => {
    pulsesRef.current.push({
      x: clientX,
      y: clientY,
      radius: 0,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.45,
      alpha: 0.85,
      speed: 7.5,
    })
  }, [])

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't trigger if clicked on interactive buttons or form inputs to avoid distraction
      const target = e.target
      if (target.closest('button, a, input, [role="button"], textarea')) return
      triggerSonarWave(e.clientX, e.clientY)
    }

    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [triggerSonarWave])

  // Mouse move listener for Parallax and Canvas physics
  useEffect(() => {
    let targetPx = 0
    let targetPy = 0
    let currPx = 0
    let currPy = 0

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const m = mouseRef.current
      m.targetX = clientX
      m.targetY = clientY
      m.isHovered = true

      // Compute cursor velocity
      const dx = clientX - m.lastX
      const dy = clientY - m.lastY
      m.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 40)
      m.lastX = clientX
      m.lastY = clientY

      // Parallax normalized coordinates (-1 to 1)
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetPx = (clientX - cx)
      targetPy = (clientY - cy)
    }

    const handleMouseLeave = () => {
      const m = mouseRef.current
      m.isHovered = false
      m.targetX = -9999
      m.targetY = -9999
      targetPx = 0
      targetPy = 0
    }

    const updateParallax = () => {
      currPx += (targetPx - currPx) * 0.05
      currPy += (targetPy - currPy) * 0.05
      setParallaxOffset({ x: currPx, y: currPy })
      rafParallaxRef.current = requestAnimationFrame(updateParallax)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    rafParallaxRef.current = requestAnimationFrame(updateParallax)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (rafParallaxRef.current) cancelAnimationFrame(rafParallaxRef.current)
    }
  }, [])

  // Canvas Particles & Interactive Synapse Constellation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate balanced node constellation
    const isMobile = width < 768
    const particleCount = isMobile ? 32 : 68
    const particles = []

    const isLight = theme === 'light'
    const colorPrimary = isLight ? '33, 78, 52' : '82, 194, 133'     // Mint in dark, Spruce in light
    const colorSecondary = isLight ? '54, 65, 86' : '168, 237, 202'  // Cyan-slate in light, Ice-mint in dark

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        baseRadius: Math.random() * 1.8 + 1.2,
        radius: Math.random() * 1.8 + 1.2,
        alpha: Math.random() * 0.45 + 0.25,
        baseAlpha: Math.random() * 0.45 + 0.25,
        color: Math.random() > 0.3 ? colorPrimary : colorSecondary,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        connections: [],
      })
    }

    let animationFrameId
    let isVisible = true

    const handleVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const m = mouseRef.current
      // Smooth mouse lerping
      if (m.isHovered) {
        m.x += (m.targetX - m.x) * 0.15
        m.y += (m.targetY - m.y) * 0.15
      } else {
        m.x = -9999
        m.y = -9999
      }

      // ── 1. Update and draw expanding Sonar Ripple Waves ──────────
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const p = pulsesRef.current[i]
        p.radius += p.speed
        p.alpha -= 0.015

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          pulsesRef.current.splice(i, 1)
          continue
        }

        // Draw double wave ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${colorPrimary}, ${p.alpha * 0.45})`
        ctx.lineWidth = 1.5
        ctx.setLineDash([4, 6])
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0, p.radius - 12), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${colorSecondary}, ${p.alpha * 0.25})`
        ctx.lineWidth = 1
        ctx.setLineDash([])
        ctx.stroke()
        ctx.restore()

        // Push particles affected by wave
        particles.forEach((pt) => {
          const dx = pt.x - p.x
          const dy = pt.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (Math.abs(dist - p.radius) < 30) {
            const force = (1 - Math.abs(dist - p.radius) / 30) * 1.5
            pt.vx += (dx / dist) * force
            pt.vy += (dy / dist) * force
            pt.alpha = Math.min(1, pt.alpha + 0.3)
          }
        })
      }

      // ── 2. Draw Interactive Mouse Beacon & Force Lines ───────────
      if (m.isHovered && m.x > 0 && m.y > 0) {
        // Draw soft ambient spotlight ring around cursor
        const beaconRadius = isMobile ? 120 : 180
        const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, beaconRadius)
        gradient.addColorStop(0, `rgba(${colorPrimary}, 0.12)`)
        gradient.addColorStop(0.5, `rgba(${colorSecondary}, 0.04)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(m.x, m.y, beaconRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw micro target reticle at mouse
        ctx.save()
        ctx.beginPath()
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorPrimary}, 0.65)`
        ctx.fill()
        ctx.restore()
      }

      // ── 3. Update Particle Positions & Draw Connections ──────────
      const maxDistance = isMobile ? 95 : 135
      const mouseInfluenceRadius = isMobile ? 130 : 190

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!prefersReducedMotion) {
          p.pulsePhase += p.pulseSpeed
          p.x += p.vx
          p.y += p.vy

          // Damping for velocity boosts from sonar/mouse
          p.vx *= 0.985
          p.vy *= 0.985

          // Bounce off boundaries with margin
          if (p.x < 0) {
            p.x = 0
            p.vx = Math.abs(p.vx)
          } else if (p.x > width) {
            p.x = width
            p.vx = -Math.abs(p.vx)
          }
          if (p.y < 0) {
            p.y = 0
            p.vy = Math.abs(p.vy)
          } else if (p.y > height) {
            p.y = height
            p.vy = -Math.abs(p.vy)
          }

          // Interactive Mouse Gravitation / Repulsion
          if (m.isHovered && m.x > 0) {
            const dx = m.x - p.x
            const dy = m.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < mouseInfluenceRadius && dist > 1) {
              const normalX = dx / dist
              const normalY = dy / dist
              const strength = (1 - dist / mouseInfluenceRadius)

              // Interactive laser line to cursor if close
              if (dist < mouseInfluenceRadius * 0.85) {
                const laserAlpha = strength * (isLight ? 0.32 : 0.45)
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(m.x, m.y)
                ctx.strokeStyle = `rgba(${p.color}, ${laserAlpha})`
                ctx.lineWidth = 1.2
                ctx.stroke()
              }

              // Subtle magnetic displacement
              p.vx -= normalX * strength * 0.15
              p.vy -= normalY * strength * 0.15
              p.alpha = Math.min(0.9, p.baseAlpha + strength * 0.4)
            } else {
              p.alpha += (p.baseAlpha - p.alpha) * 0.05
            }
          }
        }

        // Draw connections between nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isLight ? 0.16 : 0.22)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Draw node body
        const pulse = Math.sin(p.pulsePhase) * 0.4 + 1
        const r = p.baseRadius * pulse

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.fill()

        // Occasional glowing core for select nodes
        if (i % 5 === 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.18})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  const handleChipClick = (item, e) => {
    e.stopPropagation()
    setActiveChip(activeChip === item.id ? null : item.id)
    triggerSonarWave(e.clientX, e.clientY)
  }

  return (
    <div className="interactive-bg-wrap" aria-hidden="true">
      {/* Interactive Neural Canvas Layer */}
      <canvas ref={canvasRef} className="bg-interactive-canvas" />

      {/* Subtle Engineering Dot Grid Overlay */}
      <div className="bg-grid-overlay" />

      {/* Floating Interactive Tech Glyphs with Parallax */}
      <div className="bg-floating-elements">
        {FLOATING_TECH_ITEMS.map((item) => {
          const posX = `calc(${item.left} + ${parallaxOffset.x * item.depth}px)`
          const posY = `calc(${item.top} + ${parallaxOffset.y * item.depth}px)`
          const isSelected = activeChip === item.id

          return (
            <div
              key={item.id}
              className={`bg-tech-item ${isSelected ? 'is-active' : ''}`}
              style={{
                left: posX,
                top: posY,
              }}
              onClick={(e) => handleChipClick(item, e)}
              title={`${item.label} — ${item.sub}`}
            >
              <div className="bg-tech-chip">
                <span className="bg-tech-tag">{item.tag}</span>
                <div className="bg-tech-main">
                  <Icon name={item.icon} size={13} className="bg-tech-icon" />
                  <span className="bg-tech-label">{item.label}</span>
                </div>
                {isSelected && (
                  <div className="bg-tech-sub">
                    <span>{item.sub}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
