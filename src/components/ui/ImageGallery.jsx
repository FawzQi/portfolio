// src/components/ui/ImageGallery.jsx
// Shared gallery used by both Projects and Experience.
// - 0 images → nothing rendered (parent shows its own placeholder)
// - 1 image   → single full-width image
// - 2+ images → carousel with prev/next arrows + dot indicators
//
// Props:
//   images      : string[]  — array of image src paths
//   alt         : string    — base alt text (index appended automatically)
//   aspectClass : string    — Tailwind aspect-ratio class, e.g. "aspect-video" | "aspect-[4/3]"
//   className   : string    — extra wrapper classes

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

// ─── Slide animation variants ─────────────────────────────────
const slideVariants = {
  enter: dir => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center:      { x: 0, opacity: 1 },
  exit:  dir => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

// ─── Lightbox (full-screen overlay) ──────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [dir,   setDir  ] = useState(0)

  const go = useCallback((step) => {
    setDir(step)
    setIndex(prev => (prev + step + images.length) % images.length)
  }, [images.length])

  // Close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose() }

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-black/90 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdrop}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-display font-semibold">
          {index + 1} / {images.length}
        </div>
      )}

      {/* Image */}
      <div className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Slide ${index + 1}`}
            className="w-full max-h-[85vh] object-contain rounded-2xl"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
                className={`rounded-full transition-all duration-200 ${
                  i === index ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

// ─── Main exported component ──────────────────────────────────
export default function ImageGallery({
  images = [],
  alt = 'Image',
  aspectClass = 'aspect-video',
  className = '',
}) {
  const [current,      setCurrent     ] = useState(0)
  const [dir,          setDir         ] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx,  setLightboxIdx ] = useState(0)

  // Nothing to render if no images
  if (!images || images.length === 0) return null

  const go = (step) => {
    setDir(step)
    setCurrent(prev => (prev + step + images.length) % images.length)
  }

  const openLightbox = (i) => {
    setLightboxIdx(i)
    setLightboxOpen(true)
  }

  // ── Single image ──────────────────────────────────────────
  if (images.length === 1) {
    return (
      <>
        <div
          className={`relative ${aspectClass} overflow-hidden rounded-xl group cursor-zoom-in ${className}`}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Expand hint on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <Expand
              size={28}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
            />
          </div>
        </div>

        <AnimatePresence>
          {lightboxOpen && (
            <Lightbox images={images} startIndex={0} onClose={() => setLightboxOpen(false)} />
          )}
        </AnimatePresence>
      </>
    )
  }

  // ── Multiple images — carousel ────────────────────────────
  return (
    <>
      <div className={`relative ${aspectClass} overflow-hidden rounded-xl group ${className}`}>

        {/* Slides */}
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={() => openLightbox(current)}
          />
        </AnimatePresence>

        {/* Dark overlay gradient for controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

        {/* Prev / Next arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); go(-1) }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/65 flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); go(1) }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/65 flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        {/* Expand icon */}
        <button
          onClick={() => openLightbox(current)}
          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/40 hover:bg-black/65 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
          aria-label="Open full screen"
        >
          <Expand size={14} />
        </button>

        {/* Dot indicators + counter */}
        <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-1.5">
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setDir(i > current ? 1 : -1); setCurrent(i) }}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-white/70 text-[10px] font-display font-semibold">
            {current + 1} / {images.length}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            startIndex={lightboxIdx}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
