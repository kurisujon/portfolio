'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Step 1: Tight, highly responsive spring motion to eliminate delay while keeping buttery smooth physics
  const springConfig = { stiffness: 1000, damping: 40, mass: 0.1 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable custom cursor if device has fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    // Step 2: Global cursor enlargement helper for text and interactive elements
    const checkHoverState = (element: Element | null): boolean => {
      if (!element) return false

      // Check for interactive elements
      const isInteractive = !!element.closest('a, button, input, textarea, select, [role="button"]')
      if (isInteractive) return true

      // Check for common text elements
      const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI']
      const isText = textTags.includes(element.tagName.toUpperCase()) || !!element.closest('h1, h2, h3, h4, h5, h6, p, span, li')
      return isText
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)

      const target = e.target as Element | null
      setIsHovered(checkHoverState(target))
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (checkHoverState(target)) {
        setIsHovered(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null
      if (!checkHoverState(related)) {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

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
