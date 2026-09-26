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

      {/* Shared relative container for Photo (z-1) and Blend-mode Name Text (z-2) */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Photo Layer: position: absolute; inset: 0; z-index: 1; */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.1,
            duration: 1.1,
            ease: [0.21, 1, 0.36, 1],
          }}
          style={{ zIndex: 1 }}
          className="absolute inset-0 z-[1] flex items-end justify-center pointer-events-none select-none"
        >
          <div className="relative w-full h-full max-w-[900px] flex items-end justify-center">
            <Image
              src="/profile-cutout.png"
              alt="Cris John Labiaga"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-contain object-bottom drop-shadow-2xl pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Step 3: Marquee Name Layer at stomach level with reduced font size [10vw]/md:[12vw] */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.0,
            duration: 1.2,
            ease: [0.21, 1, 0.36, 1],
          }}
          style={{ zIndex: 2, mixBlendMode: 'difference' }}
          className="absolute top-[65%] left-0 w-full z-[2] pointer-events-none select-none overflow-hidden mix-blend-difference"
        >
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap w-max will-change-transform"
          >
            <h1 className="text-[10vw] md:text-[12vw] font-bold text-white pr-10 leading-none tracking-tighter uppercase select-none font-snellenberg">
              CRIS JOHN LABIAGA —{' '}
            </h1>
            <h1 className="text-[10vw] md:text-[12vw] font-bold text-white pr-10 leading-none tracking-tighter uppercase select-none font-snellenberg">
              CRIS JOHN LABIAGA —{' '}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Step 2: Scaled Up Location Pill (Edge-anchored on left) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1.3,
          duration: 0.8,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute left-0 top-[60%] -translate-y-1/2 bg-[#1c1c1c] rounded-r-full py-6 pl-12 pr-6 flex items-center gap-8 z-20 pointer-events-auto shadow-2xl"
      >
        {/* Left side (Text) */}
        <div className="flex flex-col text-xl md:text-2xl font-medium leading-snug text-white font-snellenberg">
          <span>Located</span>
          <span>in the</span>
          <span>Philippines</span>
        </div>

        {/* Right side (Globe Icon scaled up) */}
        <div className="bg-white/20 p-5 rounded-full flex items-center justify-center">
          <Globe className="w-10 h-10 text-white animate-spin-3d" />
        </div>
      </motion.div>

      {/* Foreground Right Side: Role Text */}
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
        <h2 className="text-2xl md:text-4xl text-white font-medium leading-tight text-left font-snellenberg">
          Full Stack <br />
          AI Software Developer
        </h2>
      </motion.div>
    </section>
  )
}

export default HeroSection
