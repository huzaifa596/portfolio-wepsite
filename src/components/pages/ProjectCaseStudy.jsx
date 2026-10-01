import { useState } from 'react'
import { Icon } from '../ui/Icon'
import { projectDetails } from '../../data/projectDetails'

function ProjectStage({ project, slug }) {
  const [isRunning, setIsRunning] = useState(true)

  return (
    <section className={`project-stage project-stage--${slug} ${isRunning ? 'is-running' : 'is-paused'}`} aria-label={`${project.title} system visual`}>
      <div className="project-stage-topline">
        <span><span className="project-stage-dot" /> LIVE SYSTEM VIEW</span>
        <button type="button" onClick={() => setIsRunning((current) => !current)}>
          <Icon name={isRunning ? 'pause' : 'play'} size={13} /> {isRunning ? 'Pause motion' : 'Play motion'}
        </button>
      </div>
      <div className="project-stage-canvas">
        <div className="project-stage-orbit project-stage-orbit--one" />
        <div className="project-stage-orbit project-stage-orbit--two" />
        <div className="project-stage-core"><span>{project.title.split(' ')[0]}</span><small>PROJECT CORE</small></div>
        {project.architecture.map((item, index) => (
          <div key={item} className={`project-stage-node project-stage-node--${index + 1}`}>
            <span>0{index + 1}</span><strong>{item}</strong>
          </div>
        ))}
        <div className="project-stage-scan" />
      </div>
      <p>Interactive system map — use the control above to pause or replay the flow.</p>
    </section>
  )
}

export function ProjectCaseStudy({ slug }) {
  const project = projectDetails[slug]

  if (!project) {
    return (
      <main className="case-study-shell case-study-empty">
        <p className="section-tag">404</p>
        <h1>Project not found.</h1>
        <a className="case-study-back" href="/#/">Return to the portfolio <Icon name="arrowRight" size={15} /></a>
      </main>
    )
  }

  return (
    <main className="case-study-shell">
      <a className="case-study-back" href="/#/">
        <Icon name="arrowRight" size={15} /> Back to portfolio
      </a>

      <header className="case-study-hero">
        <p className="section-tag">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="case-study-summary">{project.summary}</p>
        <div className="case-study-actions">
          <a className="case-study-primary" href="/#/">
            <Icon name="arrowRight" size={17} /> Explore more work
          </a>
          {project.githubUrl && (
            <a className="case-study-repo" href={project.githubUrl} target="_blank" rel="noreferrer">
              <Icon name="github" size={17} /> Repository
            </a>
          )}
          <a className="case-study-secondary" href="/#contact">Start a conversation <Icon name="arrowRight" size={15} /></a>
        </div>
      </header>

      <ProjectStage project={project} slug={slug} />

      <section className="case-study-metrics" aria-label="Project highlights">
        {project.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
      </section>

      <section className="case-study-story">
        <article>
          <span className="section-tag">The problem</span>
          <p>{project.problem}</p>
        </article>
        <article>
          <span className="section-tag">My contribution</span>
          <p>{project.contribution}</p>
        </article>
      </section>

      <section className="case-study-build">
        <div>
          <span className="section-tag">System map</span>
          <h2>How it comes together.</h2>
        </div>
        <ol className="case-study-architecture">
          {project.architecture.map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><Icon name="arrowRight" size={15} /></li>
          ))}
        </ol>
      </section>

      <section className="case-study-stack">
        <span className="section-tag">Tools used</span>
        <div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </section>
    </main>
  )
}
