// src/components/Footer.jsx — Clean minimal footer
import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import profile from '../data/profile.json'

const SOCIAL_LINKS = [
  { icon: <Github size={18} />,   href: profile.github,              label: 'GitHub'   },
  { icon: <Linkedin size={18} />, href: profile.linkedin,            label: 'LinkedIn' },
  { icon: <Mail size={18} />,     href: `mailto:${profile.email}`,   label: 'Email'    },
]

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12 md:py-16">
      <div className="section-container">

        {/* Top row — brand + nav + social */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-slate-800">

          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <a href="#hero" className="font-display font-black text-2xl text-white">
              <span className="text-yellow-400">A</span>F
            </a>
            <p className="font-body text-sm text-slate-400 leading-relaxed">
              {profile.tagline}
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:bg-yellow-400 hover:text-slate-900 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-body text-sm text-slate-400 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <div className="flex flex-col gap-3">
            <p className="font-display font-bold text-white text-sm uppercase tracking-widest">
              Quick Links
            </p>
            <a
              href={profile.cv}
              className="font-body text-sm text-slate-400 hover:text-yellow-400 transition-colors duration-200"
            >
              Download CV
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-slate-400 hover:text-yellow-400 transition-colors duration-200"
            >
              GitHub Profile
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-body text-sm text-slate-400 hover:text-yellow-400 transition-colors duration-200"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Bottom row — copyright + back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="font-body text-xs text-slate-500 flex items-center gap-1.5">
            © {year} {profile.name}. Built with
            <Heart size={11} className="text-yellow-400 inline-block mx-0.5" fill="currentColor" />
            using React & Tailwind CSS.
          </p>

          {/* Back to top button */}
          <motion.a
            href="#hero"
            aria-label="Back to top"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-yellow-400 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all duration-200 group"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
