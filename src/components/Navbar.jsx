// src/components/Navbar.jsx — Clean Navigation
import React, { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar({ isDark, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-slate-200 dark:border-slate-800'
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between h-14">
        {/* Call sign */}
        <a
          href="#hero"
          className="font-mono font-semibold text-xs tracking-wider text-slate-900 dark:text-white flex items-center gap-2 py-2"
        >
          <span className="w-2 h-2 bg-emerald-500 rounded-none inline-block" />
          <span>Ahmad Faiq Fawwaz</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 font-mono text-xs">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls with accessible 44px touch targets */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleDark}
            aria-label="Toggle theme"
            className="w-10 h-10 flex items-center justify-center rounded text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800 p-4 font-mono text-xs">
          <ul className="space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-slate-700 dark:text-slate-300 hover:text-sky-500"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
