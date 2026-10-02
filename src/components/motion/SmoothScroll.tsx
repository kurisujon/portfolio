'use client'

import { useEffect, ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/motion'

function ScrollTriggerSync() {
  const lenis = useLenis()

  // Lenis docs recommend syncing this way, but we don't strictly need to pass it to useLenis here.
  // Actually, GSAP ScrollTrigger integrates natively with Lenis via `lenis.on('scroll', ScrollTrigger.update)`
  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }
    return () => {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update)
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000)
        })
      }
    }
  }, [lenis])

  // Handle URL hash on initial load or browser navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      const timer = setTimeout(() => {
        lenis?.resize()
        lenis?.scrollTo('bottom', {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
