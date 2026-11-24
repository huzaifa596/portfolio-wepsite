import { useRef, useState } from 'react'
import { MotionContext, useMotionSetting } from './hooks/motion'
import { TwistedPair } from './components/TwistedPair'
import { StoryCable } from './components/StoryCable'
import { RunningHead } from './components/RunningHead'
import { Plug } from './components/Plug'
import { Avatar } from './components/Avatar'
import { ContactForm } from './components/ContactForm'
import { SCENES, WIDE } from './components/Scenes'
import { External, Ribbon } from './components/Bits'
import { award, certificates, contact, experience } from './content'
import { chapters, cover, ending } from './story'

function Cover() {
  const portrait = useRef(null)
  return (
    <div className="hero" id="top">
      <TwistedPair portraitRef={portrait} />
      <section className="hero-grid shell">
        <div className="hero-head">
          <p className="label facts">{cover.facts}</p>
          <h1>
            {cover.title.split(' ').map((w, i) => (
              <span key={i}>
                <span className="word" style={{ '--i': i }}>{w}</span>{' '}
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-art">
          <span className="label tx">TX&ensp;what I ship</span>
          <div ref={portrait} className="portrait">
            <Avatar />
          </div>
          <span className="label rx">RX&ensp;what I study</span>
        </div>
        <div className="hero-intro">
          <p>{cover.intro}</p>
          <div className="actions">
            <a className="btn btn-orange" href={`#${chapters[0].id}`}>Start reading</a>
            <a className="btn btn-mint" href="#short-version">Short version</a>
          </div>
          <a className="label award-line" href="#finalist"><Ribbon />{award.title}</a>
        </div>
      </section>
    </div>
  )
}

function Chapter({ c, n }) {
  const Scene = SCENES[c.scene]
  return (
    <section className={`page page-${c.tone} lane-${c.lane}`} id={c.id} data-page>
      <div className="page-grid shell">
        <div className="lane" data-lane={c.id} aria-hidden="true" />
        <div className={WIDE.has(c.scene) ? 'page-body wide' : 'page-body'}>
          <header className="page-head">
            <p className="label"><span>Chapter {n}</span><span>{c.when}</span><span>{c.where}</span></p>
            <h2>{c.title}</h2>
          </header>
          <div className="prose">
            {c.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {c.links && (
              <div className="page-links">
                {c.links.map((l) => (
                  <External key={l.href} className="btn btn-page" href={l.href}>{l.label}</External>
                ))}
              </div>
            )}
          </div>
          <div className="scene">
            <Scene />
          </div>
        </div>
      </div>
    </section>
  )
}

const ShortVersion = () => (
  <section className="page page-paper lane-left" id="short-version" data-page>
    <div className="page-grid shell">
      <div className="lane" data-lane="short-version" aria-hidden="true" />
      <div className="page-body wide">
        <header className="page-head">
          <p className="label"><span>Short version</span></p>
          <h2>For readers in a hurry</h2>
        </header>
        <ul className="rows">
          {experience.map((e) => (
            <li key={e.role} className="row row-exp">
              <span className="label when">
                <i className={`dash dash-${e.tone}`} aria-hidden="true" />
                <span className="sr">{e.strand}, </span>
                {e.period}
              </span>
              <div>
                <h3>{e.role}</h3>
                <p>{e.org}</p>
              </div>
              <p>{e.body}</p>
            </li>
          ))}
        </ul>
        <div className="creds" id="awards">
          <h3>Awards and certificates</h3>
          <div className="creds-grid">
            <div className="cred cred-award">
              <Ribbon />
              <div>
                <strong>{award.title}</strong>
                {award.detail && <div>{award.detail}</div>}
              </div>
              {award.certificate && <External href={award.certificate}>Certificate</External>}
            </div>
            {certificates.map((c) => (
              <div key={c.title} className="cred">
                <div>
                  <strong>{c.title}</strong>
                  <span>{c.issuer}, {c.date}</span>
                </div>
                <External href={c.href}>Verify<span className="sr">: {c.title}</span></External>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

function Ending() {
  const [got, setGot] = useState(false)
  return (
    <section className="page page-deep lane-left page-end" id="contact" data-page>
      <div className="page-grid shell">
        <div className="lane" data-lane="contact" aria-hidden="true">
          <Plug got={got} />
        </div>
        <div className="page-body end-body">
          <div className="end-text">
            <header className="page-head">
              <h2>{ending.title}</h2>
            </header>
            <p className="end-lead">{ending.text}</p>
            {contact.email && <a className="email" href={`mailto:${contact.email}`}>{contact.email}</a>}
            <ul className="contact-links">
              {contact.links.map((l) => (
                <li key={l.label}>
                  <External href={l.href}>{l.label}</External>
                </li>
              ))}
            </ul>
            <p className="end-note">Lahore, Pakistan. Open to internships and research work.</p>
          </div>
          <div className="contact-side">
            <ContactForm onSent={() => setGot(true)} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function App() {
  const motion = useMotionSetting()
  const story = useRef(null)
  return (
    <MotionContext.Provider value={motion.on}>
      <div className={motion.on ? 'site' : 'site no-motion'}>
        <a className="skip" href="#short-version">Skip to the short version</a>
        <RunningHead motion={motion} />
        <main>
          <Cover />
          <div className="story" ref={story}>
            <StoryCable storyRef={story} />
            {chapters.map((c, i) => (
              <Chapter key={c.id} c={c} n={i + 1} />
            ))}
            <ShortVersion />
            <Ending />
          </div>
        </main>
      </div>
    </MotionContext.Provider>
  )
}
