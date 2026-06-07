// src/components/ui/Loader.jsx — Lightweight loading animation
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        >
          {/* Animated logo mark */}
          <div className="relative w-16 h-16 mb-6">
            {/* Outer ring — blue */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner ring — yellow */}
            <motion.div
              className="absolute inset-3 rounded-full border-4 border-yellow-400 border-b-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Name */}
          <motion.p
            className="font-display font-bold text-xl text-slate-800 dark:text-white tracking-widest"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AF
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
