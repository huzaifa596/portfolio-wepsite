import { skillGroups } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'

export function Skills() {
  return (
    <section className="skills-section section--alt" id="skills">
      <div className="shell">
        <Reveal>
          <div className="section-label">
            <span className="section-label__num">04</span>
            <div className="section-label__line" />
            <span className="section-label__text">SKILLS</span>
          </div>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <div className="skills__group">
                <h3 className="skills__group-title">{group.title}</h3>
                <div className="skills__chips">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip chip--skill magnetic-target">{skill}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
