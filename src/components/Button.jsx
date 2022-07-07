import Link from 'next/link'
import clsx from 'clsx'

const styles = {
  primary:
    'rounded-full bg-amber-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-amber-200 active:bg-amber-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300/50',
  secondary:
    'rounded-full bg-neutral-800 py-2 px-4 text-sm font-medium text-white hover:bg-neutral-700 active:text-slate-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
}

export function Button({ variant = 'primary', className, ...props }) {
  return <button className={clsx(styles[variant], className)} {...props} />
}

export function ButtonLink({ variant = 'primary', className, href, ...props }) {
  return (
    <Link href={href}>
      <a className={clsx(styles[variant], className)} {...props} />
    </Link>
  )
}
