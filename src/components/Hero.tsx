'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@studio-freight/react-lenis'
import { Magnetic } from '@/components/ui/MagneticButton'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const lenis = useLenis()

  // GSAP ScrollTrigger for horizontal text scrub animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const bigText = textRef.current
    if (!container || !bigText) return

    const ctx = gsap.context(() => {
      gsap.to(bigText, {
        x: '-20vw',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-end justify-center bg-[#0a0a0a]"
    >
      {/* Subtle Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" 
      />

      {/* Layer 1 (Background): Massive Overflowing Typography at top-[20%] left-0 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2.0,
          duration: 1.2,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      >
        <h1
          ref={textRef}
          className="absolute left-0 top-[20%] whitespace-nowrap text-[15vw] font-bold leading-none tracking-tighter uppercase text-white/[0.12] will-change-transform select-none"
        >
          CRIS JOHN LABIAGA
        </h1>
      </motion.div>

      {/* Layer 2 (Middle): Cutout Profile Image Anchored to bottom-0 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.2,
          duration: 1.1,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="z-10 absolute bottom-0 left-1/2 -translate-x-1/2 h-[80vh] sm:h-[88vh] md:h-[92vh] lg:h-[96vh] w-full max-w-[900px] flex items-end justify-center pointer-events-none select-none"
      >
        <Image
          src="/profile-cutout.png"
          alt="Cris John Labiaga"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-contain object-bottom drop-shadow-2xl pointer-events-none"
        />
      </motion.div>

      {/* Layer 3 (Foreground - Left): Role Pill & Interactive CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.5,
          duration: 0.8,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute left-6 md:left-12 lg:left-16 bottom-10 sm:bottom-14 md:bottom-20 z-20 flex flex-col gap-3 max-w-xs pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#171717]/80 border border-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium shadow-xl w-fit">
          <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
          <span>Full Stack Developer</span>
        </div>

        <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed hidden sm:block">
          Designing &amp; building modern web systems, scalable APIs, and practical AI workflows.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                lenis?.scrollTo('#projects', {
                  duration: 1.2,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                })
              }}
              className="inline-flex items-center justify-center bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer"
            >
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                lenis?.resize()
                if (lenis) {
                  lenis.scrollTo('bottom', {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  })
                } else {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  })
                }
                if (typeof window !== 'undefined' && window.history?.pushState) {
                  window.history.pushState(null, '', '#contact')
                }
              }}
              className="inline-flex items-center justify-center border border-white/15 bg-white/5 hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              Get in Touch
            </a>
          </Magnetic>
        </div>
      </motion.div>

      {/* Layer 3 (Foreground - Right): Location Pill & Availability Status */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.6,
          duration: 0.8,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute top-24 sm:top-auto sm:bottom-14 md:bottom-20 right-6 md:right-12 lg:right-16 z-20 flex flex-col items-end gap-2 text-right pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717]/80 border border-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium shadow-xl">
          <span className="text-xs sm:text-sm">📍</span>
          <span>Davao City, Philippines</span>
        </div>
        <span className="text-zinc-500 text-xs font-mono tracking-wider uppercase hidden sm:block">
          Available for opportunities
        </span>
      </motion.div>
    </section>
  )
}

export default HeroSection
