import { useState, useRef, useEffect } from 'react'
import { portfolio, skillGroups, projects, experience } from '../../data/portfolio'
import { Icon } from '../ui/Icon'

export function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Huzaifa Naseer Developer Shell [v3.0.4 — SkyOS x86_64]' },
    { type: 'system', content: 'Type "help" to list available commands or click quick shortcuts below.' },
    { type: 'command', command: 'whoami' },
    { type: 'output', content: `Huzaifa Naseer — Software Engineer & Healthcare ML Researcher at FAST-NUCES Lahore.\nMERN Stack, C++ Systems, and Explainable Clinical AI (XEL-Sepsis on MIMIC-IV).` },
  ])
  const [inputVal, setInputVal] = useState('')
  const [cmdHistory, setCmdHistory] = useState(['whoami'])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isMatrixActive, setIsMatrixActive] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const matrixCanvasRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Sky-Blue Matrix rain animation
  useEffect(() => {
    if (!isMatrixActive) return
    const canvas = matrixCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    const chars = '0123456789ABCDEF<>/*+-~#{}[]()_$%&'
    const fontSize = 13
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    let animationId
    const renderMatrix = () => {
      ctx.fillStyle = 'rgba(6, 11, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#38bdf8' // Sky Blue matrix rain
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animationId = requestAnimationFrame(renderMatrix)
    }
    renderMatrix()

    return () => cancelAnimationFrame(animationId)
  }, [isMatrixActive])

  const playBeep = () => {
    if (!soundEnabled) return
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(580, audioCtx.currentTime)
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start()
      osc.stop(audioCtx.currentTime + 0.04)
    } catch {
      // Ignore
    }
  }

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim()
    if (!trimmed) return

    playBeep()
    const args = trimmed.split(' ')
    const cmd = args[0].toLowerCase()

    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    let output = ''
    let isClear = false

    switch (cmd) {
      case 'help':
        output = [
          'AVAILABLE SYSTEM COMMANDS:',
          '  whoami / about   - Engineer biography & FAST-NUCES academic credentials',
          '  skills           - Categorized languages, full-stack frameworks & ML tools',
          '  projects         - Deployed platforms, ML engines & low-level repositories',
          '  exp / history    - Professional work & clinical research internships',
          '  contact          - Direct endpoints for Email, WhatsApp, LinkedIn, GitHub',
          '  resume           - Download official PDF resume',
          '  matrix           - Toggle cybernetic Sky-Blue digital rain canvas',
          '  clear            - Clear terminal buffer',
          '  date             - Show system timestamp and timezone',
          '  echo <text>      - Echo message to stdout',
        ].join('\n')
        break

      case 'whoami':
      case 'about':
        output =
          `Huzaifa Naseer — Software Engineer & Healthcare ML Researcher\n` +
          `Institution: FAST-NUCES Lahore (BSCS 2024–2028 | CGPA: 3.13 / 4.0)\n` +
          `Specialization: Full-Stack Systems (MERN), Low-Level (C++ / 8088), Explainable Clinical AI.\n` +
          `Research: XEL-Sepsis (XGBoost, LightGBM, LSTM on MIMIC-IV ICU Data).`
        break

      case 'skills':
        output = skillGroups
          .map((group) => {
            return `[${group.title.toUpperCase()}]\n` + group.skills.map((s) => `  ✓ ${s}`).join('\n')
          })
          .join('\n\n')
        break

      case 'projects':
        output = projects
          .map((p, i) => {
            return (
              `[0${i + 1}] ${p.title} (${p.category})\n` +
              `     ${p.description}\n` +
              `     Stack: ${p.tags.join(', ')}\n` +
              (p.githubUrl ? `     Repo: ${p.githubUrl}\n` : '') +
              (p.liveUrl ? `     Demo: ${p.liveUrl}\n` : '')
            )
          })
          .join('\n')
        break

      case 'exp':
      case 'history':
      case 'experience':
        output = experience
          .map((e) => {
            return `• ${e.role} @ ${e.company} [${e.period}]\n  ${e.summary}\n  Tech: ${e.tags.join(', ')}`
          })
          .join('\n\n')
        break

      case 'contact':
        output =
          `COMMUNICATION CHANNELS:\n` +
          `  Email:    ${portfolio.email}\n` +
          `  Phone:    ${portfolio.phone}\n` +
          `  WhatsApp: ${portfolio.whatsapp}\n` +
          `  LinkedIn: ${portfolio.linkedin}\n` +
          `  GitHub:   ${portfolio.github}\n` +
          `  Location: ${portfolio.location}`
        break

      case 'resume':
        window.open('/assets/Huzaifa_Naseer_Resume.pdf', '_blank')
        output = 'Opening Huzaifa_Naseer_Resume.pdf in browser...'
        break

      case 'matrix':
        setIsMatrixActive((v) => !v)
        output = `Sky-Blue matrix canvas ${!isMatrixActive ? 'ACTIVATED' : 'DEACTIVATED'}.`
        break

      case 'clear':
        isClear = true
        setHistory([])
        break

      case 'date':
        output = new Date().toUTCString()
        break

      case 'echo':
        output = args.slice(1).join(' ') || ''
        break

      default:
        output = `command not recognized: "${cmd}". Type "help" for a list of available commands.`
        break
    }

    if (!isClear) {
      setHistory((prev) => [
        ...prev,
        { type: 'command', command: trimmed },
        { type: 'output', content: output },
      ])
    }

    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdHistory.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1
        if (nextIdx >= cmdHistory.length) {
          setHistoryIndex(-1)
          setInputVal('')
        } else {
          setHistoryIndex(nextIdx)
          setInputVal(cmdHistory[nextIdx])
        }
      }
    }
  }

  const quickCommands = ['help', 'skills', 'projects', 'exp', 'contact', 'resume', 'matrix', 'clear']

  return (
    <section className="terminal-section" id="terminal">
      <div className="shell">
        <div className="reveal-on-scroll">
          <div className="section-pill">
            <span className="section-pill__tag">Developer Shell</span>
          </div>
          <h2 className="section-title">Interactive Terminal Workspace</h2>
          <p className="section-desc">
            Direct CLI access to query project architecture, verify technical skills, or trigger live scripts.
          </p>
        </div>

        <div className="terminal-window reveal-on-scroll delay-1" onClick={() => inputRef.current?.focus()}>
          {isMatrixActive && <canvas ref={matrixCanvasRef} className="terminal-matrix-canvas" />}

          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot--close" />
              <span className="terminal-dot terminal-dot--min" />
              <span className="terminal-dot terminal-dot--max" />
            </div>
            <div className="terminal-title">
              <Icon name="terminal" size={14} />
              <span>huzaifa@fast-nuces: ~ (zsh)</span>
            </div>
            <div className="terminal-controls">
              <button
                type="button"
                className={`terminal-sound-btn ${soundEnabled ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSoundEnabled((v) => !v)
                }}
                title={soundEnabled ? 'Mute audio' : 'Enable audio'}
              >
                <span>{soundEnabled ? 'FX: ON' : 'FX: OFF'}</span>
              </button>
            </div>
          </div>

          <div className="terminal-body">
            {history.map((item, idx) => (
              <div key={idx} className={`terminal-line terminal-line--${item.type}`}>
                {item.type === 'system' && (
                  <div className="terminal-system-msg">
                    <span className="terminal-system-badge">SYS</span>
                    <span>{item.content}</span>
                  </div>
                )}

                {item.type === 'command' && (
                  <div className="terminal-cmd-row">
                    <span className="terminal-prompt">huzaifa@fast-nuces:~$</span>
                    <span className="terminal-cmd-text">{item.command}</span>
                  </div>
                )}

                {item.type === 'output' && (
                  <pre className="terminal-output-text">{item.content}</pre>
                )}
              </div>
            ))}

            <div className="terminal-cmd-row terminal-cmd-row--active">
              <span className="terminal-prompt">huzaifa@fast-nuces:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value)
                  playBeep()
                }}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoComplete="off"
                spellCheck="false"
                placeholder="type command (e.g. 'help', 'skills', 'projects')..."
                aria-label="Terminal command input"
              />
            </div>
            <div ref={bottomRef} />
          </div>

          <div className="terminal-toolbar" onClick={(e) => e.stopPropagation()}>
            <span className="terminal-toolbar-label">Quick Commands:</span>
            <div className="terminal-chips">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  className="terminal-chip"
                  onClick={() => executeCommand(cmd)}
                >
                  <code>${cmd}</code>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
