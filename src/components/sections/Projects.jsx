import { projects } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'

function ProjectRow({ project, index }) {
  return (
    <a
      href={project.githubUrl || project.liveUrl || '#'}
      target={project.githubUrl || project.liveUrl ? '_blank' : undefined}
      rel="noreferrer"
      className="proj__row magnetic-target"
    >
      <span className="proj__row-num">{String(index + 1).padStart(2, '0')}</span>
      <div className="proj__row-main">
        <h3 className="proj__row-title">{project.title}</h3>
        <span className="proj__row-cat">{project.category}</span>
      </div>
      <div className="proj__row-tags">
        {project.tags.slice(0, 3).map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="proj__row-arrow">
        <Icon name="arrowUpRight" size={20} />
      </div>
    </a>
  )
}

export function Projects() {
  return (
    <section className="proj-section" id="projects">
      <div className="shell">
        <Reveal>
          <div className="section-label">
            <span className="section-label__num">03</span>
            <div className="section-label__line" />
            <span className="section-label__text">PROJECTS</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="proj__heading">Selected Work</h2>
          <p className="proj__subheading">
            From ML forecasting systems to full-stack platforms and low-level game engines.
          </p>
        </Reveal>

        <div className="proj__list">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <ProjectRow project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
