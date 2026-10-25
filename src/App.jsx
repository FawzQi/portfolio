// src/App.jsx — Root component without artificial loader delay
import React from 'react'
import { useDarkMode } from './hooks/useDarkMode'

// Layout components
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'

// Page sections
import Hero       from './components/Hero'
import About      from './components/About'
import Skills     from './components/Skills'
import Projects   from './components/Projects'
import Experience from './components/Experience'
import Contact    from './components/Contact'

export default function App() {
  const { isDark, toggle } = useDarkMode()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white selection:bg-sky-500 selection:text-white">
      {/* Sticky telemetry navigation */}
      <Navbar isDark={isDark} onToggleDark={toggle} />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
