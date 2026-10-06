'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  staggerChildren?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  y = 20,
  staggerChildren,
  className = ''
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    
    // Check for reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y })

      ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
        })
      }
    })

    })

    return () => ctx.revert()
  }, [delay, duration, y])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
