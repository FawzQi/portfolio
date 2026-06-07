// src/components/ui/SectionTitle.jsx — Consistent section heading component
import React from 'react'
import { motion } from 'framer-motion'

/**
 * SectionTitle — Renders a labeled section heading with animated yellow accent
 * @param {string} label    - Small uppercase label above the title (e.g. "ABOUT ME")
 * @param {string} title    - Main heading text
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} align    - 'left' | 'center' (default: 'center')
 */
export default function SectionTitle({ label, title, subtitle, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center items-center'

  return (
    <motion.div
      className={`flex flex-col gap-3 mb-12 md:mb-16 ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Small uppercase label with yellow pill */}
      <div className={`flex ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 text-xs font-display font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
          {label}
        </span>
      </div>

      {/* Main heading */}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-slate-800 dark:text-white leading-tight">
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
