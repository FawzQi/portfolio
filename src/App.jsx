// src/App.jsx — Root component: wires up dark mode, loader, and all sections
import React, { useState, useEffect } from 'react'
import { useDarkMode } from './hooks/useDarkMode'

// Layout components
import Loader     from './components/ui/Loader'
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

  // Show loading screen briefly on first mount
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a short loading window (300ms for fonts/assets to settle)
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Loading screen — AnimatePresence handles exit animation */}
      <Loader isLoading={isLoading} />

      {/* Sticky navigation */}
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
    </>
  )
}
