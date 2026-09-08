export function SectionHeading({ label, title, copy, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label && (
        <div className="section-pill">
          <span className="section-pill__dot" aria-hidden="true" />
          <span className="section-pill__text">{label}</span>
        </div>
      )}
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  )
}
