'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/motion'

function ScrollTriggerSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger refresh after fonts settle
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timer)
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(update)
    }
  }, [lenis])

  // Handle URL hash on initial load or browser navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      const timer = setTimeout(() => {
        lenis?.resize()
        lenis?.scrollTo('bottom', {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
