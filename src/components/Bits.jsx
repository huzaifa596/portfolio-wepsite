export const External = ({ href, children, className }) => (
  <a href={href} className={className} target="_blank" rel="noreferrer">
    {children}
  </a>
)

export const Stack = ({ items }) => (
  <ul className="stack label">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
)

export const Ribbon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="9" r="6" />
    <path d="M8.5 14L7 21l5-2.6L17 21l-1.5-7" />
  </svg>
)
