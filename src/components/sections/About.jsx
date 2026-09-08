import { useRef } from 'react'
import { portfolio } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { ScrambleText } from '../ui/ScrambleText'
import { Icon } from '../ui/Icon'

export function About() {
  return (
    <section className="about-section" id="about">
      <div className="shell">
        {/* Big editorial section label */}
        <Reveal>
          <div className="section-label">
            <span className="section-label__num">01</span>
            <div className="section-label__line" />
            <span className="section-label__text">ABOUT</span>
          </div>
        </Reveal>

        <div className="about__layout">
          <Reveal delay={100}>
            <div className="about__text">
              <h2 className="about__heading">
                I build systems that <em>actually work</em> — from database queries to neural network layers.
              </h2>
              <div className="about__paragraphs">
                <p>
                  Computer Science undergrad at <strong>FAST-NUCES Lahore</strong>, working across the entire stack. I write React UIs, Node.js APIs, MongoDB schemas, and C++ game engines with equal comfort.
                </p>
                <p>
                  Currently researching <strong>XEL-Sepsis</strong> — an explainable ensemble model combining XGBoost, LightGBM, and LSTM on MIMIC-IV ICU data to predict critical sepsis onset hours before clinical symptoms appear.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="about__card">
              <div className="about__card-header">
                <code>~/huzaifa/status</code>
                <span className="about__card-live">
                  <i /> ACTIVE
                </span>
              </div>
              <div className="about__card-body">
                <div className="about__card-row">
                  <span className="about__card-key">role</span>
                  <span className="about__card-val">{portfolio.role}</span>
                </div>
                <div className="about__card-row">
                  <span className="about__card-key">stack</span>
                  <span className="about__card-val">React · Node · Express · MongoDB · C++ · Python</span>
                </div>
                <div className="about__card-row">
                  <span className="about__card-key">research</span>
                  <span className="about__card-val">XEL-Sepsis · Explainable AI · MIMIC-IV</span>
                </div>
                <div className="about__card-row">
                  <span className="about__card-key">location</span>
                  <span className="about__card-val">{portfolio.location}</span>
                </div>
                <div className="about__card-row">
                  <span className="about__card-key">email</span>
                  <a href={`mailto:${portfolio.email}`} className="about__card-val about__card-link">{portfolio.email}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
