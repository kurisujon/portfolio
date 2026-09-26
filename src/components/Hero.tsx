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

      {/* Layer 1: Text Layer (Infinite Marquee Ticker at z-0, stomach level) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.0,
          duration: 1.2,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute top-[65%] left-0 w-full z-0 pointer-events-none select-none overflow-hidden"
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap w-max will-change-transform"
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
          delay: 1.1,
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

      {/* Step 3: Match Reference Location Pill (Edge-anchored on left) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1.3,
          duration: 0.8,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute left-0 top-[60%] -translate-y-1/2 bg-[#1c1c1c] rounded-r-full py-3 pl-8 pr-3 flex items-center gap-6 z-20 pointer-events-auto shadow-2xl"
      >
        {/* Left side (Text) */}
        <div className="flex flex-col text-[15px] font-medium leading-tight text-white">
          <span>Located</span>
          <span>in the</span>
          <span>Philippines</span>
        </div>

        {/* Right side (Globe) */}
        <div className="bg-white/20 p-3 rounded-full flex items-center justify-center">
          <Globe className="w-6 h-6 text-white animate-spin-3d" />
        </div>
      </motion.div>

      {/* Right Side: Role Text (Vertically aligned with location pill) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1.3,
          duration: 0.8,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute right-6 md:right-16 top-[60%] -translate-y-1/2 z-20 pointer-events-auto"
      >
        <p className="text-2xl md:text-4xl text-white font-medium leading-tight text-left">
          Full Stack <br />
          AI Software Developer
        </p>
      </motion.div>
    </section>
  )
}

export default HeroSection
