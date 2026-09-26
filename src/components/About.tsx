"use client"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const milestoneItems = [
  {
    title: 'Bachelor of Science in Information Technology',
    subtitle: 'University of Mindanao - Digos College',
    year: '2026',
    image: '/images/milestones/certificate-3.jpg',
  },
  {
    title: 'Ideation Bootcamp Champion',
    subtitle: 'SalinKaalaman (Language Barrier Solution)',
    year: '2025',
    image: '/images/milestones/certificate-1.jpg',
  },
  {
    title: 'SIA Top 5 Best Project',
    subtitle: 'CHoDaMS - City Housing Data System',
    year: '2025',
    image: '/chodams_web_preview.png',
  },
  {
    title: 'CODECRAFT Top 5 Mobile',
    subtitle: 'Eathink About It Mobile',
    year: '2023',
    image: '/delta_preview.jpg',
  },
]

export function AboutSection() {
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring motion tracking mouse cursor coordinates
  const springConfig = { stiffness: 350, damping: 25, mass: 0.1 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      id="about"
      className="py-16 md:py-28 flex flex-col gap-16 md:gap-24 relative bg-[#0a0a0a] text-white"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#3b82f6] uppercase">
          Overview
        </span>
      </div>

      {/* Step 2: Typography Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Large Headline spanning 8 columns */}
        <h2 className="col-span-1 md:col-span-8 text-3xl sm:text-4xl md:text-[3.5vw] lg:text-[4vw] leading-tight font-medium text-white tracking-tight">
          Full Stack AI Software Developer building end-to-end applications across frontend, backend, APIs, databases, and AI integrations.
        </h2>

        {/* Descriptive Paragraphs in the remaining columns */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6 text-white/70 text-base md:text-lg leading-relaxed">
          <p>
            I build complete web systems from frontend interfaces to backend services, REST APIs, relational databases, authentication, and third-party integrations.
          </p>
          <p>
            I integrate practical AI capabilities such as RAG, embeddings, semantic retrieval, LLM-powered workflows, and automation when they solve real application requirements.
          </p>
          <p>
            I use AI coding agents for research, implementation, debugging, testing, refactoring, and documentation. I review generated changes, validate architecture and integrations, and remain responsible for final code quality.
          </p>
        </div>
      </div>

      {/* Step 3: Row-Based Milestones & Education */}
      <div className="flex flex-col gap-6 pt-8 md:pt-12">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
          Milestones &amp; Education
        </span>

        <div className="w-full flex flex-col">
          {milestoneItems.map((item) => (
            <div
              key={item.title}
              onMouseEnter={() => setHoveredMilestone(item.image)}
              onMouseLeave={() => setHoveredMilestone(null)}
              className="flex justify-between items-center w-full py-8 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer group px-4 -mx-4 rounded-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 group-hover:pl-4 transition-all duration-300">
                <span className="text-xl sm:text-2xl font-normal text-white">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-xs sm:text-sm text-white/40 font-normal">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <span className="text-sm text-white/50 font-mono shrink-0 ml-4">
                {item.year}
              </span>
            </div>
          ))}
          <div className="w-full border-t border-white/10" />
        </div>
      </div>

      {/* Step 4: Floating Hover Reveal for Milestones Tethered to Mouse Cursor */}
      {mounted &&
        createPortal(
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: hoveredMilestone ? 1 : 0,
              scale: hoveredMilestone ? 1 : 0.8,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            className="fixed top-0 left-0 pointer-events-none z-50 w-[300px] h-[200px] overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-[#171717]"
          >
            {hoveredMilestone && (
              <Image
                src={hoveredMilestone}
                alt="Milestone preview"
                fill
                sizes="300px"
                className="object-cover"
              />
            )}
          </motion.div>,
          document.body
        )}
    </section>
  )
}

export default AboutSection
