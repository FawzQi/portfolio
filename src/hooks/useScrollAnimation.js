// src/hooks/useScrollAnimation.js — Intersection Observer for scroll animations
import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible')
          // Unobserve after first trigger for performance
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
