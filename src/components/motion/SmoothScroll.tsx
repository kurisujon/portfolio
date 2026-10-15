'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/motion'
import 'lenis/dist/lenis.css'

function ScrollTriggerSync() {
  const lenis = useLenis()
  const pathname = usePathname()

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

  // Handle route and URL hash on initial load or browser navigation
  useEffect(() => {
    if (!lenis) return

    const hash = typeof window !== 'undefined' ? window.location.hash : ''

    if (hash && (hash === '#projects' || hash === '#about' || hash === '#contact' || document.querySelector(hash))) {
      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const target = hash === '#contact' ? 'bottom' : hash
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      })
      return () => cancelAnimationFrame(rafId)
    } else {
      lenis.scrollTo(0, { immediate: true })
      ScrollTrigger.refresh()
    }
  }, [pathname, lenis])

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
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll

