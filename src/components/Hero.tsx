'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { GlobeCanvas } from '@/components/ui/GlobeCanvas'

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

      {/* Step 3: Marquee Text Layer strictly at z-0, behind subject, stomach level, no mix-blend-mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.0,
          duration: 1.2,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="absolute top-[65%] -translate-y-1/2 left-0 w-full z-0 pointer-events-none select-none overflow-hidden"
      >
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap w-max will-change-transform"
        >
          {/* Step 2: Title case without uppercase class */}
          <h1 className="text-[10vw] md:text-[12vw] font-bold text-white/20 pr-10 leading-none tracking-tighter select-none font-snellenberg">
            Cris John Labiaga —{' '}
          </h1>
          <h1 className="text-[10vw] md:text-[12vw] font-bold text-white/20 pr-10 leading-none tracking-tighter select-none font-snellenberg">
            Cris John Labiaga —{' '}
          </h1>
        </div>
      </motion.div>

      {/* Step 3: Photo Layer at z-10 relative so it blocks the text sliding behind it */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.1,
          duration: 1.1,
          ease: [0.21, 1, 0.36, 1],
        }}
        className="z-10 relative h-[80vh] sm:h-[88vh] md:h-[92vh] lg:h-[96vh] w-full max-w-[900px] flex items-end justify-center pointer-events-none select-none"
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

      {/* Step 1 & 2: Scaled Up Location Pill with Cobe 3D Globe */}
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

        {/* Right side (Cobe 3D Globe with locked aspect ratio) */}
        <GlobeCanvas />
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
