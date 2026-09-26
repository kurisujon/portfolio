'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ["你好", "Привет", "Hello", "Hallo", "Grüezi", "Bonjour", "こんにちは", "Hola"]

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden'

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          // Sequence reached the end ("Hola")
          setTimeout(() => {
            setIsFinished(true)
            document.body.style.overflow = ''
            onComplete?.()
          }, 180)
          return prev
        }
      })
    }, 180)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isFinished ? '-100vh' : 0 }}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (isFinished) {
          setShouldRender(false)
        }
      }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-white ${
        isFinished ? 'pointer-events-none' : ''
      }`}
    >
      <div className="flex items-center gap-3 px-6 overflow-hidden">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.p
            key={words[index]}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans text-center"
          >
            {words[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Preloader
