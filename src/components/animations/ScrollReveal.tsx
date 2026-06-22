'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  staggerChildren?: number
}

export const revealItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
    }
  }
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  y = 20,
  staggerChildren,
  ...props 
}: ScrollRevealProps) {
  const containerVariants = {
    hidden: { opacity: 0, y },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
        staggerChildren: staggerChildren || 0,
        delayChildren: delay
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
