import { useEffect, useRef, useState } from 'react'
import { chapters } from '../story'
import { resumeUrl } from '../content'

const PLACES = [
  ...chapters.map((c, i) => ({ id: c.id, kicker: `Chapter ${i + 1}`, title: c.title, when: c.when })),
  { id: 'short-version', kicker: 'Short version', title: 'For readers in a hurry', when: '' },
  { id: 'contact', kicker: 'Contact', title: 'The next page', when: '' },
]

// The top line of a book page: who, which chapter, when. Opens the contents.
export function RunningHead({ motion }) {
  const [here, setHere] = useState(-1)
  const [open, setOpen] = useState(false)
  const button = useRef(null)

  useEffect(() => {
    let queued = false
    const read = () => {
      queued = false
      let now = -1
      PLACES.forEach((p, i) => {
        if (document.getElementById(p.id)?.getBoundingClientRect().top < innerHeight * 0.45) now = i
      })
      setHere(now)
    }
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(read)
    }
    read()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current.focus()
    }
    const onDown = (e) => !e.target.closest('.head') && setOpen(false)
    addEventListener('keydown', onKey)
    addEventListener('pointerdown', onDown)
    return () => {
      removeEventListener('keydown', onKey)
      removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const place = PLACES[here]
  return (
    <header className={place || open ? 'head solid' : 'head'}>
      <div className="head-row">
        <a href="#top" className="wordmark" onClick={() => setOpen(false)}>Huzaifa Naseer</a>
        <p className="head-place" key={here}>
          {place && (
            <>
              <span className="label">{place.kicker}</span>
              <strong>{place.title}</strong>
            </>
          )}
        </p>
        <span className="label head-when" key={`w${here}`}>{place?.when}</span>
        {!motion.reduced && (
          <button type="button" className="icon-btn" aria-pressed={motion.paused} aria-label="Pause animations" title={motion.paused ? 'Play animations' : 'Pause animations'} onClick={() => motion.setPaused((p) => !p)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {motion.paused ? <path d="M8 5.5v13l11-6.5z" fill="currentColor" /> : <path d="M9 6v12M15 6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />}
            </svg>
          </button>
        )}
        <button ref={button} type="button" className="contents-btn" aria-expanded={open} aria-controls="contents" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Contents'}
        </button>
      </div>
      <nav id="contents" className={open ? 'contents open' : 'contents'} aria-label="Contents">
        <ol>
          {PLACES.map((p, i) => (
            <li key={p.id}>
              <a href={`#${p.id}`} aria-current={i === here ? 'true' : undefined} onClick={() => setOpen(false)}>
                <span className="label">{i < chapters.length ? i + 1 : ''}</span>
                <strong>{p.title}</strong>
                <span className="label">{p.when}</span>
              </a>
            </li>
          ))}
        </ol>
        {resumeUrl && <a className="btn btn-orange" href={resumeUrl} download>Download resume</a>}
      </nav>
      <div className="progress" aria-hidden="true"><i /><i /></div>
    </header>
  )
}
