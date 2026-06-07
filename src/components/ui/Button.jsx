// src/components/ui/Button.jsx — Reusable button with variants
import React from 'react'

/**
 * Button component
 * @param {string} variant - 'primary' | 'secondary' | 'outline'
 * @param {string} size    - 'sm' | 'md' | 'lg'
 * @param {string} href    - If provided, renders as an <a> tag
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  // Base styles shared by all variants
  const base =
    'inline-flex items-center gap-2 font-display font-semibold rounded-xl ' +
    'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
    'cursor-pointer select-none'

  // Size styles
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant styles
  const variants = {
    // Solid blue button — primary CTA
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 ' +
      'focus:ring-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
    // Yellow accent button — secondary CTA
    secondary:
      'bg-yellow-400 text-slate-900 hover:bg-yellow-300 active:scale-95 ' +
      'focus:ring-yellow-400 shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40',
    // Outlined/ghost button
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white ' +
      'dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white ' +
      'active:scale-95 focus:ring-blue-500',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  // Render as anchor if href is provided
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
