'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollProgressCircle() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  // Create scroll-driven rotations for the 3 particles with different speeds/offsets
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 360 * 1.2]) // Outer - Slower
  const rotate2 = useTransform(smoothProgress, [0, 1], [120, 120 + 360 * 2.2]) // Middle
  const rotate3 = useTransform(smoothProgress, [0, 1], [240, 240 + 360 * 3.5]) // Inner - Faster

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const particles = [
    { id: 1, size: 7, radius: 82, rotate: rotate1 },
    { id: 2, size: 5, radius: 66, rotate: rotate2 },
    { id: 3, size: 3.5, radius: 52, rotate: rotate3 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 20,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="fixed bottom-10 right-10 z-50"
    >
      <button
        onClick={scrollToTop}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500"
        aria-label="Scroll to top"
      >
        {/* Glass Background */}
        <div className="absolute inset-0 rounded-full bg-[#171717]/60 backdrop-blur-md border border-white/10 group-hover:bg-[#262626]/80 transition-colors duration-500" />
        
        {/* Orbit SVG */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90 p-1 overflow-visible">
          {/* Subtle Outer Path */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/10"
          />
          
          {/* Partial Progress Arc - Thicker & White */}
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="transparent"
            stroke="#f5f5f5"
            strokeWidth="3"
            strokeDasharray="276 276"
            style={{
              pathLength: smoothProgress,
              strokeDashoffset: 0,
            }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          />

          {/* Orbiting Particles System - Linked to Scroll */}
          {particles.map((particle) => (
            <motion.circle
              key={particle.id}
              cx="50"
              cy={50 - particle.radius}
              r={particle.size}
              fill="#f5f5f5"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [
                  (0.15 + (particle.size / 12)), 
                  (0.4 + (particle.size / 12)), 
                  (0.15 + (particle.size / 12))
                ]
              }}
              transition={{
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * -1.5,
                },
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * -1,
                }
              }}
              style={{
                originX: "50px",
                originY: "50px",
                rotate: particle.rotate,
              }}
              className="drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
            />
          ))}
        </svg>

        {/* Larger Arrow Icon */}
        <ArrowUp className="w-6 h-6 text-zinc-400 group-hover:text-white transition-all duration-300 z-10 drop-shadow-sm" />
      </button>
    </motion.div>
  )
}
