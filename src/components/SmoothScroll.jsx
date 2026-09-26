'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function ScrollTriggerSync() {
  const lenis = useLenis()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useLenis(() => {
    ScrollTrigger.update()
  })

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

export function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothTouch: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
