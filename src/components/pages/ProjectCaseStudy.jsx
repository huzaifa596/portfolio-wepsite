import { Icon } from '../ui/Icon'
import { projectDetails } from '../../data/projectDetails'

export function ProjectCaseStudy({ slug }) {
  const project = projectDetails[slug]

  if (!project) {
    return (
      <main className="case-study-shell case-study-empty">
        <p className="section-tag">404</p>
        <h1>Project not found.</h1>
        <a className="case-study-back" href="/">Return to the portfolio <Icon name="arrowRight" size={15} /></a>
      </main>
    )
  }

  return (
    <main className="case-study-shell">
      <a className="case-study-back" href="/">
        <Icon name="arrowRight" size={15} /> Back to portfolio
      </a>

      <header className="case-study-hero">
        <p className="section-tag">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="case-study-summary">{project.summary}</p>
        <div className="case-study-actions">
          {project.githubUrl && (
            <a className="case-study-primary" href={project.githubUrl} target="_blank" rel="noreferrer">
              <Icon name="github" size={17} /> View repository
            </a>
          )}
          <a className="case-study-secondary" href="/#contact">Start a conversation <Icon name="arrowRight" size={15} /></a>
        </div>
      </header>

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
