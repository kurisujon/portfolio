'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/motion'

const words = ["Design.", "Develop.", "Integrate.", "Automate.", "CRIS JOHN."]

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0)
  const [shouldRender, setShouldRender] = useState(true)
  const svgPathRef = useRef<SVGPathElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('webcris_loaded')
    if (hasLoaded) {
      setTimeout(() => setShouldRender(false), 0)
      onComplete?.()
      return
    }

    document.body.style.overflow = 'hidden'

    // Text sequence
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 180)

    // Wait for the sequence to finish (180ms * 4 = 720ms) then trigger exit animation
    const exitTimeout = setTimeout(() => {
      if (!svgPathRef.current || !textRef.current || !wrapperRef.current) return

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          sessionStorage.setItem('webcris_loaded', 'true')
          setTimeout(() => setShouldRender(false), 0)
          onComplete?.()
        }
      })

      // The viewBox is "0 0 100 100" but we use overflow="visible" so the curve can extend beyond 100
      const startPath = `M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0`
      const curvePath = `M 0 0 L 100 0 L 100 100 Q 50 130 0 100 L 0 0`
      const endPath   = `M 0 0 L 100 0 L 100 0 Q 50 0 0 0 L 0 0`

      // Step 1: Text slides up and fades
      tl.to(textRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: 'power3.inOut'
      })
      // Step 2: Path bows downwards (the curve)
      .to(svgPathRef.current, {
        attr: { d: curvePath },
        duration: 0.3,
        ease: 'power3.in'
      }, "-=0.2")
      // Step 3: Path snaps up to 0 height
      .to(svgPathRef.current, {
        attr: { d: endPath },
        duration: 0.5,
        ease: 'power3.out'
      })

    }, 1400) // 180ms * 5 words + short delay

    return () => {
      clearInterval(interval)
      clearTimeout(exitTimeout)
    }
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[99] flex flex-col items-center justify-center pointer-events-none">
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <path 
          ref={svgPathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0"
          fill="#0a0a0a"
          stroke="none"
        />
      </svg>

      <h1 
        ref={textRef}
        className="relative z-10 text-4xl md:text-6xl text-white font-snellenberg uppercase tracking-tight select-none"
      >
        {words[index]}
      </h1>
    </div>
  )
}

export default Preloader
