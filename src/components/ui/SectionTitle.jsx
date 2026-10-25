// src/components/ui/SectionTitle.jsx — Clean engineering section header
import React from 'react'

export default function SectionTitle({ index = "01", title, subtitle, align = 'left' }) {
  const isCenter = align === 'center'

  return (
    <div className={`flex flex-col gap-1.5 mb-10 md:mb-14 ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}>
      <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
        <span className="w-1.5 h-1.5 bg-sky-500 rounded-none inline-block" />
        <span>SECTION {index}</span>
      </div>

      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="font-body text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
