"use client"
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { NameReveal } from '@/components/ui/NameReveal'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle Ambient Enhancement - Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-8 z-10 text-center px-6 mt-16"
      >
        
        {/* Name Reveal - Integrated with Block Animation */}
        <div className="flex flex-col items-center">
          <NameReveal 
            text="CRIS JOHN" 
            className="text-6xl md:text-8xl lg:text-9xl tracking-[0.1em]"
          />
        </div>

        {/* Human-Centered Slogan */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6 items-center">
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed">
            Creating scalable web systems with clean UI and AI integrations.
          </p>

          {/* Subtle Tech Stack Row */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[10px] md:text-xs font-medium text-zinc-500/60 uppercase tracking-[0.15em]">
            <span>Next.js</span>
            <span className="text-zinc-700">•</span>
            <span>TypeScript</span>
            <span className="text-zinc-700">•</span>
            <span>Tailwind</span>
            <span className="text-zinc-700">•</span>
            <span>PostgreSQL</span>
            <span className="text-zinc-700">•</span>
            <span>AI Integrations</span>
          </div>
        </motion.div>

        {/* Refined CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 mt-8"
        >
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-[#3b82f6] text-white px-8 py-3.5 rounded-md font-bold text-sm transition-all"
          >
            [ View Projects ]
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(59,130,246,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 border border-[#3b82f6]/50 text-[#3b82f6] px-8 py-3.5 rounded-md font-bold text-sm transition-all"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>


    </section>
  )
}
