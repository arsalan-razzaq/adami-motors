import { Link } from 'react-router-dom'

export function Button({ to, children, variant = 'red', className = '' }) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide transition ${variant === 'outline' ? 'border border-white/40 text-white hover:bg-white hover:text-black' : 'bg-[#D71920] text-white shadow-lg shadow-red-950/15 hover:bg-[#B51017]'} ${className}`

  return to
    ? <Link className={classes} to={to}>{children}</Link>
    : <button className={classes}>{children}</button>
}
