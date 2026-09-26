"use client"
import { motion } from 'framer-motion'
import { NameReveal } from '@/components/ui/NameReveal'
import { TextMaskReveal } from '@/components/animations/TextMaskReveal'
import { Magnetic } from '@/components/ui/MagneticButton'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <section 
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[calc(100vh-5rem)] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 py-20 md:py-28"
    >
      {/* Subtle Ambient Enhancement - Soft Blue Depth */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-5xl mx-auto z-10 w-full"
      >
        {/* Name Reveal - Integrated with Block Animation */}
        <div className="flex flex-col items-center max-w-full">
          <NameReveal 
            text="CRIS JOHN" 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.08em] whitespace-nowrap"
          />
        </div>

        {/* Role */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-200 tracking-tight mt-4 md:mt-5"
        >
          Full Stack AI Software Developer
        </motion.p>

        {/* Description - Mask Reveal */}
        <motion.div variants={itemVariants} className="max-w-2xl mt-5 md:mt-6">
          <TextMaskReveal 
            text="I design and build full-stack applications, backend systems, and AI-powered tools that turn complex workflows into reliable software."
            as="p"
            className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed text-pretty"
            delay={1.8}
            stagger={0.03}
          />
        </motion.div>

        {/* Call-to-Action Buttons with Magnetic Pull */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto"
        >
          <Magnetic className="w-full sm:w-auto">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#3b82f6] hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-md font-medium text-sm transition-all duration-300 shadow-md shadow-blue-500/15 cursor-pointer"
            >
              View Projects
            </motion.a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-[#3b82f6]/40 hover:border-white hover:bg-white hover:text-black text-[#3b82f6] px-8 py-3.5 rounded-md font-medium text-sm transition-all duration-300 cursor-pointer"
            >
              Get in Touch
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
