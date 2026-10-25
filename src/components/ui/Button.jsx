// src/components/ui/Button.jsx — Polished button component adhering to Design System
import React from 'react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-display font-semibold rounded-lg ' +
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
    'cursor-pointer select-none text-center'

  const sizes = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
  }

  const variants = {
    primary:
      'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 ' +
      'focus:ring-sky-500 shadow-sm',
    secondary:
      'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 ' +
      'focus:ring-slate-400 border border-slate-200 dark:border-slate-700',
    outline:
      'border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 ' +
      'hover:border-slate-400 dark:hover:border-slate-600 focus:ring-sky-500 bg-transparent',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
