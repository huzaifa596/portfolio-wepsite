import { skillGroups } from '../../data/portfolio'

const passions = [
  {
    icon: '⚡',
    title: 'Full-Stack Engineering',
    desc: 'I love the full loop — from designing a MongoDB schema to shipping a pixel-perfect React UI. Clean architecture and thoughtful APIs excite me.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  {
    icon: '🧠',
    title: 'Machine Learning & AI',
    desc: 'I am deeply drawn to building intelligent systems that learn. Currently researching explainable AI in healthcare — making ML that doctors can actually trust.',
    tags: ['XGBoost', 'LightGBM', 'LSTM', 'SHAP'],
  },
  {
    icon: '⚙️',
    title: 'Systems & Low-Level',
    desc: 'There is something beautiful about writing code that talks directly to hardware. Assembly, memory management, and performance optimisation fascinate me.',
    tags: ['C++', 'x86 Assembly', 'OOP', 'Algorithms'],
  },
  {
    icon: '🔍',
    title: 'Problem Solving',
    desc: 'Every bug is a puzzle, every project a challenge. I thrive on breaking complex problems apart and rebuilding them into clean, elegant solutions.',
    tags: ['DSA', 'Logic', 'Debugging', 'Systems Design'],
  },
]

export function WhoAmI() {
  return (
    <section className="whoami-section" id="about">
      <div className="shell">

        {/* Section Label */}
        <div className="reveal-on-scroll section-label">
          <span className="section-label__num">01</span>
          <div className="section-label__line" />
          <span className="section-label__text">WHO AM I</span>
        </div>

        {/* Bio Block */}
        <div className="whoami__bio reveal-on-scroll delay-1">
          <h2 className="whoami__heading">
            A builder at heart —<br />
            <em className="whoami__heading-em">code, curiosity & craft.</em>
          </h2>
          <div className="whoami__bio-body">
            <p>
              I'm <strong>Huzaifa Naseer</strong>, a Computer Science undergrad at{' '}
              <strong>FAST-NUCES Lahore</strong> with a 3.13 GPA, a strong foundation in full-stack
              development, and a growing obsession with machine learning research.
            </p>
            <p>
              Beyond code, I'm someone who genuinely enjoys understanding <em>why</em> things
              work — not just how to make them work. Whether it's tracing a memory leak in C++, 
              interpreting SHAP values from an ML model, or designing an intuitive UI that feels 
              effortless, I care about the depth behind the surface.
            </p>
            <p>
              I've interned at 3 companies across frontend development, full-stack MERN
              engineering, and healthcare ML research. I'm always chasing the next hard problem.
            </p>
          </div>

          {/* Quick facts */}
          <div className="whoami__quick-facts">
            <div className="whoami__fact">
              <span className="whoami__fact-key">📍 Based in</span>
              <span className="whoami__fact-val">Lahore, Pakistan</span>
            </div>
            <div className="whoami__fact">
              <span className="whoami__fact-key">🎓 Studying at</span>
              <span className="whoami__fact-val">FAST-NUCES (2024–2028)</span>
            </div>
            <div className="whoami__fact">
              <span className="whoami__fact-key">🔬 Researching</span>
              <span className="whoami__fact-val">XEL-Sepsis (Healthcare AI)</span>
            </div>
            <div className="whoami__fact">
              <span className="whoami__fact-key">💼 Open to</span>
              <span className="whoami__fact-val">Internships & Collaborations</span>
            </div>
          </div>
        </div>

        {/* Passions Grid */}
        <div className="whoami__passions-header reveal-on-scroll delay-2">
          <h3 className="whoami__sub-heading">What I'm passionate about</h3>
          <p className="whoami__sub-desc">
            The areas that pull me out of bed in the morning and keep me up at night.
          </p>
        </div>

        <div className="whoami__passions-grid">
          {passions.map((p, i) => (
            <div
              key={p.title}
              className={`whoami__passion-card reveal-on-scroll delay-${i + 1}`}
            >
              <div className="passion-card__icon">{p.icon}</div>
              <h4 className="passion-card__title">{p.title}</h4>
              <p className="passion-card__desc">{p.desc}</p>
              <div className="passion-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="whoami__skills-header reveal-on-scroll">
          <h3 className="whoami__sub-heading">My toolkit</h3>
        </div>

        <div className="whoami__skills-grid">
          {skillGroups.map((group, i) => (
            <div key={group.title} className={`whoami__skill-group reveal-on-scroll delay-${i + 1}`}>
              <h4 className="whoami__skill-group-title">{group.title}</h4>
              <div className="whoami__skill-chips">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip chip--skill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
