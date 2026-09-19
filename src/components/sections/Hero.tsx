"use client"
import { motion } from 'framer-motion'

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
        className="flex flex-col items-center text-center max-w-3xl mx-auto z-10"
      >
        {/* Introduction */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          Hi, I’m Cris John Labiaga.
        </motion.h1>

        {/* Role */}
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-200 tracking-tight mt-3 md:mt-4"
        >
          Full Stack AI Software Developer
        </motion.p>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mt-5 md:mt-6 text-pretty"
        >
          I design and build full-stack applications, backend systems, and AI-powered tools that turn complex workflows into reliable software.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto"
        >
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3.5 rounded-md font-medium text-sm transition-all shadow-md shadow-blue-500/15"
          >
            View Projects
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(59,130,246,0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center border border-[#3b82f6]/40 hover:border-[#3b82f6] text-[#3b82f6] hover:text-white px-8 py-3.5 rounded-md font-medium text-sm transition-all"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
