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
  const sparksRef = useRef([])
  const [activeChip, setActiveChip] = useState(null)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })
  const rafParallaxRef = useRef(null)

  // Trigger cyber sonar wave on click anywhere on document
  const triggerSonarWave = useCallback((clientX, clientY) => {
    pulsesRef.current.push({
      x: clientX,
      y: clientY,
      radius: 0,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.5,
      alpha: 0.9,
      speed: 8.5,
    })
  }, [])

  useEffect(() => {
    const handleGlobalClick = (e) => {
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
      const spd = Math.sqrt(dx * dx + dy * dy)
      m.speed = Math.min(spd, 50)
      m.lastX = clientX
      m.lastY = clientY

      // Spawn interactive micro-sparkles on rapid movement
      if (spd > 12 && sparksRef.current.length < 24) {
        sparksRef.current.push({
          x: clientX + (Math.random() - 0.5) * 16,
          y: clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          alpha: 0.8,
          life: 1.0,
        })
      }

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

    // Generate balanced, lively node constellation
    const isMobile = width < 768
    const particleCount = isMobile ? 44 : 86
    const particles = []

    const isLight = theme === 'light'
    const colorPrimary = isLight ? '33, 78, 52' : '82, 194, 133'     // Mint in dark, Spruce in light
    const colorSecondary = isLight ? '54, 65, 86' : '168, 237, 202'  // Cyan-slate in light, Ice-mint in dark

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.45 : 0.75),
        vy: (Math.random() - 0.5) * (isMobile ? 0.45 : 0.75),
        baseRadius: Math.random() * 2.0 + 1.2,
        radius: Math.random() * 2.0 + 1.2,
        alpha: Math.random() * 0.5 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.35 ? colorPrimary : colorSecondary,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.03,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.015 + Math.random() * 0.02,
      })
    }

    // Packet signal impulses moving along connections
    const packets = []
    for (let i = 0; i < 18; i++) {
      packets.push({
        p1Idx: Math.floor(Math.random() * particleCount),
        p2Idx: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.014,
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
        m.x += (m.targetX - m.x) * 0.18
        m.y += (m.targetY - m.y) * 0.18
      } else {
        m.x = -9999
        m.y = -9999
      }

      // ── 1. Update and draw expanding Sonar Ripple Waves ──────────
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const p = pulsesRef.current[i]
        p.radius += p.speed
        p.alpha -= 0.014

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          pulsesRef.current.splice(i, 1)
          continue
        }

        // Draw double wave ring with high-contrast glow
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${colorPrimary}, ${p.alpha * 0.6})`
        ctx.lineWidth = 1.8
        ctx.setLineDash([6, 6])
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0, p.radius - 14), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${colorSecondary}, ${p.alpha * 0.35})`
        ctx.lineWidth = 1.2
        ctx.setLineDash([])
        ctx.stroke()
        ctx.restore()

        // Push particles affected by wave
        particles.forEach((pt) => {
          const dx = pt.x - p.x
          const dy = pt.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (Math.abs(dist - p.radius) < 36) {
            const force = (1 - Math.abs(dist - p.radius) / 36) * 2.2
            pt.vx += (dx / (dist || 1)) * force
            pt.vy += (dy / (dist || 1)) * force
            pt.alpha = Math.min(1, pt.alpha + 0.4)
          }
        })
      }

      // ── 2. Update and draw Sparkles / Embers ─────────────────────
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const spk = sparksRef.current[i]
        spk.x += spk.vx
        spk.y += spk.vy
        spk.life -= 0.035

        if (spk.life <= 0) {
          sparksRef.current.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(spk.x, spk.y, spk.radius * spk.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorPrimary}, ${spk.alpha * spk.life})`
        ctx.fill()
      }

      // ── 3. Draw Interactive Mouse Beacon & Force Field ───────────
      if (m.isHovered && m.x > 0 && m.y > 0) {
        const beaconRadius = isMobile ? 140 : 210
        const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, beaconRadius)
        gradient.addColorStop(0, `rgba(${colorPrimary}, 0.16)`)
        gradient.addColorStop(0.4, `rgba(${colorSecondary}, 0.06)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(m.x, m.y, beaconRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Target reticle
        ctx.save()
        ctx.beginPath()
        ctx.arc(m.x, m.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorPrimary}, 0.8)`
        ctx.fill()
        ctx.restore()
      }

      // ── 4. Update Particle Positions & Draw Connections ──────────
      const maxDistance = isMobile ? 110 : 150
      const mouseInfluenceRadius = isMobile ? 150 : 220

      // Update positions with organic drift
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!prefersReducedMotion) {
          p.pulsePhase += p.pulseSpeed
          p.driftAngle += p.driftSpeed

          // Smooth sinusoidal drift component
          p.x += p.vx + Math.cos(p.driftAngle) * 0.4
          p.y += p.vy + Math.sin(p.driftAngle) * 0.4

          // Velocity damping
          p.vx *= 0.985
          p.vy *= 0.985

          // Bounce off screen margins
          if (p.x < 0) {
            p.x = 0
            p.vx = Math.abs(p.vx) + 0.2
          } else if (p.x > width) {
            p.x = width
            p.vx = -Math.abs(p.vx) - 0.2
          }
          if (p.y < 0) {
            p.y = 0
            p.vy = Math.abs(p.vy) + 0.2
          } else if (p.y > height) {
            p.y = height
            p.vy = -Math.abs(p.vy) - 0.2
          }

          // Interactive Cursor Gravitation & Repulsion Physics
          if (m.isHovered && m.x > 0) {
            const dx = m.x - p.x
            const dy = m.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < mouseInfluenceRadius && dist > 1) {
              const normalX = dx / dist
              const normalY = dy / dist
              const strength = (1 - dist / mouseInfluenceRadius)

              // Draw interactive laser beam to cursor
              if (dist < mouseInfluenceRadius * 0.9) {
                const laserAlpha = strength * (isLight ? 0.38 : 0.55)
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(m.x, m.y)
                ctx.strokeStyle = `rgba(${p.color}, ${laserAlpha})`
                ctx.lineWidth = 1.3
                ctx.stroke()
              }

              // Subtle responsive displacement
              p.vx -= normalX * strength * 0.22
              p.vy -= normalY * strength * 0.22
              p.alpha = Math.min(1.0, p.baseAlpha + strength * 0.5)
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
            const lineAlpha = (1 - dist / maxDistance) * (isLight ? 0.22 : 0.32)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }

        // Draw node body
        const pulse = Math.sin(p.pulsePhase) * 0.35 + 1
        const r = p.baseRadius * pulse

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.fill()

        // Glowing outer halo for prominent nodes
        if (i % 4 === 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.22})`
          ctx.fill()
        }
      }

      // ── 5. Draw Traveling Data Packet Impulses ────────────────────
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed
        if (pkt.progress >= 1) {
          pkt.progress = 0
          pkt.p1Idx = Math.floor(Math.random() * particleCount)
          pkt.p2Idx = Math.floor(Math.random() * particleCount)
        }

        const p1 = particles[pkt.p1Idx]
        const p2 = particles[pkt.p2Idx]
        if (!p1 || !p2) return

        const dx = p2.x - p1.x
        const dy = p2.y - p1.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Only draw if nodes are connected within proximity
        if (dist < maxDistance * 1.2) {
          const curX = p1.x + dx * pkt.progress
          const curY = p1.y + dy * pkt.progress

          ctx.beginPath()
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${colorPrimary}, 0.95)`
          ctx.shadowColor = `rgba(${colorPrimary}, 0.8)`
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

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
