'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

export function ScrollProgressCircle() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressCircleRef = useRef<SVGCircleElement>(null)
  
  // Ref for the 3 particles
  const p1Ref = useRef<SVGCircleElement>(null)
  const p2Ref = useRef<SVGCircleElement>(null)
  const p3Ref = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Show/hide animation
    gsap.to(containerRef.current, {
      opacity: isVisible ? 1 : 0,
      x: isVisible ? 0 : 20,
      duration: 0.4,
      ease: 'power3.out',
      pointerEvents: isVisible ? 'auto' : 'none'
    })
  }, [isVisible])

  useEffect(() => {
    // Check for reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    // ScrollTrigger to drive progress
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress
        // Progress path length
        if (progressCircleRef.current) {
          gsap.set(progressCircleRef.current, { strokeDashoffset: 276 * (1 - p) })
        }
        
        // Particles rotation
        if (p1Ref.current) gsap.set(p1Ref.current, { rotation: p * 360 * 1.2, transformOrigin: "50px 50px" })
        if (p2Ref.current) gsap.set(p2Ref.current, { rotation: 120 + p * 360 * 2.2, transformOrigin: "50px 50px" })
        if (p3Ref.current) gsap.set(p3Ref.current, { rotation: 240 + p * 360 * 3.5, transformOrigin: "50px 50px" })
      }
    })

    // Particle pulse animation (opacity/scale loop)
    const ctx = gsap.context(() => {
      [p1Ref, p2Ref, p3Ref].forEach((ref, index) => {
        if (!ref.current) return
        
        // Initial setup for rotation origin
        gsap.set(ref.current, { transformOrigin: "50px 50px" })

        gsap.to(ref.current, {
          scale: 1.1,
          opacity: 0.6,
          duration: 3 + index,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: index * -1
        })
      })
    })

    return () => {
      st.kill()
      ctx.revert()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const particles = [
    { ref: p1Ref, size: 7, radius: 82 },
    { ref: p2Ref, size: 5, radius: 66 },
    { ref: p3Ref, size: 3.5, radius: 52 },
  ]

  return (
    <div ref={containerRef} className="fixed bottom-10 right-10 z-50 opacity-0 translate-x-5 pointer-events-none">
      <button
        onClick={scrollToTop}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 rounded-full bg-[#171717]/60 backdrop-blur-md border border-white/10 group-hover:bg-[#262626]/80 transition-colors duration-500" />
        
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90 p-1 overflow-visible">
          <circle cx="50" cy="50" r="44" fill="transparent" stroke="currentColor" strokeWidth="1.5" className="text-white/10" />
          
          <circle
            ref={progressCircleRef}
            cx="50"
            cy="50"
            r="44"
            fill="transparent"
            stroke="#f5f5f5"
            strokeWidth="3"
            strokeDasharray="276"
            strokeDashoffset="276"
            strokeLinecap="round"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          />

          {particles.map((p, i) => (
            <circle
              key={i}
              ref={p.ref}
              cx="50"
              cy={50 - p.radius}
              r={p.size}
              fill="#f5f5f5"
              className="drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
            />
          ))}
        </svg>

        <ArrowUp className="w-6 h-6 text-zinc-400 group-hover:text-white transition-all duration-300 z-10 drop-shadow-sm" />
      </button>
    </div>
  )
}
