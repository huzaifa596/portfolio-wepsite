const paths = {
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
  arrowUp: <path d="m18 15-6-6-6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </>
  ),
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  github: (
    <>
      <path d="M15 22v-3.9c.04-1.02-.33-2.01-1.03-2.75 3.38-.38 6.93-1.66 6.93-7.53a5.89 5.89 0 0 0-1.56-4.08A5.48 5.48 0 0 0 19.19.96S17.92.58 15 2.56a14.22 14.22 0 0 0-7.99 0C4.09.58 2.82.96 2.82.96a5.48 5.48 0 0 0-.15 2.72 5.89 5.89 0 0 0-1.56 4.08c0 5.85 3.54 7.16 6.91 7.55A3.55 3.55 0 0 0 7 18.06V22" />
      <path d="M7 18c-3.5 1.1-4.4-1.5-4.4-1.5-.6-1.5-1.45-1.9-1.45-1.9" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </>
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </>
  ),
  code: <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-2-10-4 14" />,
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  spark: (
    <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 13 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
  ),
  quote: (
    <>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    </>
  ),
  cplusplus: (
    <>
      <path d="M10 6.5A6.5 6.5 0 1 0 16.5 13H14a4 4 0 1 1-4-4v-2.5Z" />
      <path d="M17 9v4m-2-2h4" />
      <path d="M22 9v4m-2-2h4" />
    </>
  ),
  python: (
    <>
      <path d="M12 2c-3.5 0-5.5.8-5.5 2.5V7h5.5v1H5C3.2 8 2 9.5 2 11.5S3.2 15 5 15h1.5v-2c0-1.5 1.2-2.5 2.5-2.5h5V8c0-3-2-6-2-6Z" />
      <circle cx="8" cy="4.5" r=".75" fill="currentColor" />
      <path d="M12 22c3.5 0 5.5-.8 5.5-2.5V17h-5.5v-1H19c1.8 0 3-1.5 3-3.5S20.8 9 19 9h-1.5v2c0 1.5-1.2 2.5-2.5 2.5h-5v2.5c0 3 2 6 2 6Z" />
      <circle cx="16" cy="19.5" r=".75" fill="currentColor" />
    </>
  ),
  react: (
    <>
      <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </>
  ),
  nodejs: (
    <>
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <path d="M12 22V12" />
      <path d="M22 8.5l-10 3.5-10-3.5" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  // Institute & Certificate Brand Logos
  academic: (
    <>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </>
  ),
  coursera: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5a4 4 0 1 0 0 5" />
    </>
  ),
  meta: (
    <path d="M6.5 16c-2.5 0-4.5-2-4.5-4s2-4 4.5-4c2 0 3.5 1.5 5.5 4 2-2.5 3.5-4 5.5-4 2.5 0 4.5 2 4.5 4s-2 4-4.5 4c-2 0-3.5-1.5-5.5-4-2 2.5-3.5 4-5.5 4z" />
  ),
  ibm: (
    <>
      <rect x="3" y="5" width="18" height="2" />
      <rect x="3" y="9" width="18" height="2" />
      <rect x="3" y="13" width="18" height="2" />
      <rect x="3" y="17" width="18" height="2" />
    </>
  ),
  citi: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="14" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="22" x2="9" y2="18" />
      <line x1="15" y1="22" x2="15" y2="18" />
      <line x1="8" y1="6" x2="8.01" y2="6" />
      <line x1="12" y1="6" x2="12.01" y2="6" />
      <line x1="16" y1="6" x2="16.01" y2="6" />
      <line x1="8" y1="10" x2="8.01" y2="10" />
      <line x1="12" y1="10" x2="12.01" y2="10" />
      <line x1="16" y1="10" x2="16.01" y2="10" />
      <line x1="8" y1="14" x2="8.01" y2="14" />
      <line x1="12" y1="14" x2="12.01" y2="14" />
      <line x1="16" y1="14" x2="16.01" y2="14" />
    </>
  ),
  send: (
    <>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  chat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  menu: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
}

export function Icon({ name, size = 18, strokeWidth = 1.8, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.spark}
    </svg>
  )
}
