export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const classes = `button button--${variant} ${className}`.trim()

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        className={classes}
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}
