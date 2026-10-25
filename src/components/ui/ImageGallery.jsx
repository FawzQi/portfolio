// src/components/ui/ImageGallery.jsx — Polished Image Gallery with full a11y & touch controls
import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [dir, setDir] = useState(0)

  const go = useCallback((step) => {
    setDir(step)
    setIndex((prev) => (prev + step + images.length) % images.length)
  }, [images.length])

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery full screen viewer"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close viewer"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono">
          {index + 1} / {images.length}
        </div>
      )}

      <div className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Slide ${index + 1}`}
            className="w-full max-h-[85vh] object-contain rounded-xl"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 bg-black/40 rounded-full">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className={`rounded-full transition-all duration-200 ${
                  i === index ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

export default function ImageGallery({
  images = [],
  alt = 'Image',
  aspectClass = 'aspect-video',
  className = '',
}) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  if (!images || images.length === 0) return null

  const go = (step) => {
    setDir(step)
    setCurrent((prev) => (prev + step + images.length) % images.length)
  }

  const openLightbox = (i) => {
    setLightboxIdx(i)
    setLightboxOpen(true)
  }

  if (images.length === 1) {
    return (
      <>
        <div
          className={`relative ${aspectClass} overflow-hidden rounded-t-xl group cursor-zoom-in ${className}`}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
            <Expand
              size={24}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
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

  return (
    <>
      <div className={`relative ${aspectClass} overflow-hidden rounded-t-xl group ${className}`}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => openLightbox(current)}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

        <button
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => openLightbox(current)}
          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 hover:bg-black/75 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          aria-label="Open full screen"
        >
          <Expand size={13} />
        </button>

        <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-1">
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setDir(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-white/80 text-[10px] font-mono">
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
