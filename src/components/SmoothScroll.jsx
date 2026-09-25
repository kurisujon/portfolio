'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function ScrollTriggerSync() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useLenis(() => {
    ScrollTrigger.update()
  })

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
