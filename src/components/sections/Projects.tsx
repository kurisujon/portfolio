'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: 'Veldra',
    category: 'Full Stack AI Software Developer',
    image: '/veldra_preview.png',
    href: 'https://veldra-sand.vercel.app/'
  },
  {
    title: 'StudFlow',
    category: 'Full Stack AI Software Developer',
    image: '/studflow_preview.png',
    href: 'https://studflow.webcris.dev/'
  },
  {
    title: 'CHoDaMS Web',
    category: 'Full Stack Developer',
    image: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png',
    href: 'https://github.com/kurisujon/chodams_web'
  },
  {
    title: 'CHoDaMS Mobile',
    category: 'Full Stack Developer',
    image: '/images/projects/chodams-mobile/cover-dashboard-gps.png',
    href: 'https://github.com/kurisujon/chodams_mobile'
  }
]

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseY = useMotionValue(0)
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Center the 420px preview vertically on the cursor
    mouseY.set(e.clientY - rect.top - 210)
  }

  return (
    <section id="projects" className="relative w-full bg-[#0a0a0a] text-white py-32 px-[5%] md:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-normal font-snellenberg">Selected Works</h2>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative max-w-[1200px] mx-auto flex flex-col"
      >
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            className="group flex flex-col sm:flex-row justify-between items-start sm:items-center w-full py-10 sm:py-16 border-t border-white/10 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-sm"
          >
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-4">
              {project.title}
            </h3>
            <span className="text-sm sm:text-base font-mono text-zinc-400 mt-4 sm:mt-0">
              {project.category}
            </span>
          </a>
        ))}
        <div className="w-full border-t border-white/10" />

        {/* Floating Preview Box */}
        <motion.div
          style={{ y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: hoveredIndex !== null ? 1 : 0, 
            scale: hoveredIndex !== null ? 1 : 0.8 
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute right-0 md:right-[5%] lg:right-[10%] top-0 pointer-events-none w-[420px] h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#171717] z-50 origin-center hidden sm:block"
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={projects[hoveredIndex].image}
                  alt={projects[hoveredIndex].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered Circular View Badge */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-[80px] h-[80px] bg-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-lg">
              View
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
