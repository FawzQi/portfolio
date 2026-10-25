// src/components/Footer.jsx — Telemetry System Footer
import React from 'react'
import { ArrowUp } from 'lucide-react'
import profile from '../data/profile.json'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-[#070A0F] text-slate-400 py-10 border-t border-slate-800 font-mono text-xs">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block" />
            <span className="font-semibold text-slate-200">
              {profile.name} — Portfolio
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              CV (Google Docs)
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-slate-500">
          <p>© {year} {profile.name} · Surabaya, Indonesia</p>
          <a
            href="#hero"
            className="flex items-center gap-1 hover:text-slate-300 transition-colors"
          >
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}
