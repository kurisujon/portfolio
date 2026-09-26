'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Globe } from 'lucide-react'

export function HeroSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Infinite "News Ticker" continuous marquee tween
  useEffect(() => {
    if (!marqueeRef.current) return

    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: 'linear',
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-end justify-center bg-[#0a0a0a]"
    >
      {/* Subtle Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" 
      />

      {/* Layer 1: Text Layer (Marquee Ticker at z-0, behind image) */}
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
        <div
          ref={marqueeRef}
          className="absolute left-0 top-[20%] flex whitespace-nowrap w-max will-change-transform"
        >
          <h1 className="text-[15vw] font-bold text-white/20 pr-10 leading-none tracking-tighter uppercase select-none">
            CRIS JOHN LABIAGA —{' '}
          </h1>
          <h1 className="text-[15vw] font-bold text-white/20 pr-10 leading-none tracking-tighter uppercase select-none">
            CRIS JOHN LABIAGA —{' '}
          </h1>
        </div>
      </motion.div>

      {/* Layer 2: Cutout Profile Image Anchored to bottom-0 (at z-10 so text slides behind head and body) */}
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

      {/* Layer 3: Foreground Info (Location & Role centered vertically across the screen) */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none flex justify-between items-center px-[5%] md:px-16">
        {/* Left Side (Location Pill) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 2.4,
            duration: 0.8,
            ease: [0.21, 1, 0.36, 1],
          }}
          className="pointer-events-auto bg-[#1a1a1a] text-white rounded-full flex items-center gap-4 p-2 pr-6 shadow-xl border border-white/5"
        >
          <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-white/80" />
          </div>
          <div className="flex flex-col text-left leading-snug">
            <span className="text-xs text-white/50 font-normal">Located in</span>
            <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
              Kiblawan, Philippines
            </span>
          </div>
        </motion.div>

        {/* Right Side (Role Text) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 2.4,
            duration: 0.8,
            ease: [0.21, 1, 0.36, 1],
          }}
          className="pointer-events-auto"
        >
          <p className="text-2xl md:text-4xl text-white font-medium leading-tight text-left">
            Full Stack <br />
            AI Software Developer
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
