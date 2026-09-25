'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Buttery-smooth spring motion for Dennis Snellenberg cursor physics
  const springConfig = { damping: 28, stiffness: 350, mass: 0.1 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable custom cursor if device has fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, input, textarea, select, [role="button"]')
      setIsHovered(!!interactive)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
      }}
      animate={{
        scale: isHovered ? 2.2 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { duration: 0.2, ease: 'easeOut' },
        opacity: { duration: 0.15 },
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-colors duration-200 select-none ${
        isHovered
          ? 'w-6 h-6 bg-white/20 border border-white/60 backdrop-invert'
          : 'w-3 h-3 bg-white'
      }`}
    />
  )
}

export default CustomCursor
