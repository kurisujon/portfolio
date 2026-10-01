"use client"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  // GSAP ScrollTrigger stagger entrance for milestone rows
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.milestone-row',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.milestone-row',
            start: 'top 85%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      className="relative w-full bg-[#0a0a0a] text-white flex flex-col"
    >
      {/* Step 1: Spacious Headline Statement */}
      <div className="w-full max-w-[1200px] mx-auto px-[5%] md:px-16 pt-32 pb-20">
        <h2 className="text-4xl sm:text-5xl md:text-[6vw] font-normal text-white leading-[1.05] tracking-tighter font-snellenberg">
          Full Stack AI Software Developer building end-to-end applications across frontend, backend, APIs, databases, and AI integrations.
        </h2>
      </div>

      {/* Step 2: Refactoring Body Paragraphs into Spacious Rows */}
      <div className="w-full max-w-[1200px] mx-auto px-[5%] md:px-16 flex flex-col">
        {/* Row 1: The Build */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="col-span-1 md:col-span-4">
            <p className="text-xl font-medium text-white">The Build</p>
          </div>
          <div className="col-span-1 md:col-span-8">
            <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
              I build complete web systems from frontend interfaces to backend services, REST APIs, relational databases, authentication, and third-party integrations.
            </p>
          </div>
        </div>

        {/* Row 2: AI Automation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="col-span-1 md:col-span-4">
            <p className="text-xl font-medium text-white">AI Automation</p>
          </div>
          <div className="col-span-1 md:col-span-8">
            <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
              I integrate practical AI capabilities such as RAG, embeddings, semantic retrieval, LLM-powered workflows, and automation when they solve real application requirements.
            </p>
          </div>
        </div>

        {/* Row 3: Workflow & Agentics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="col-span-1 md:col-span-4">
            <p className="text-xl font-medium text-white">Workflow &amp; Agentics</p>
          </div>
          <div className="col-span-1 md:col-span-8">
            <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
              I use AI coding agents for research, implementation, debugging, testing, refactoring, and documentation. I review generated changes, validate architecture and integrations, and remain responsible for final code quality.
            </p>
          </div>
        </div>
        <div className="w-full border-t border-white/10" />
      </div>

      {/* Row-Based Milestones & Education */}
      <div className="w-full max-w-[1200px] mx-auto px-[5%] md:px-16 pb-32 flex flex-col gap-6 pt-16">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
          Milestones &amp; Education
        </span>

        <div className="w-full flex flex-col">
          {milestoneItems.map((item) => (
            <div
              key={item.title}
              onMouseEnter={() => setHoveredMilestone(item.image)}
              onMouseLeave={() => setHoveredMilestone(null)}
              className="milestone-row flex justify-between items-center w-full py-8 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer group px-4 -mx-4 rounded-sm"
            >
              <div className="flex flex-col gap-1 sm:gap-2 group-hover:pl-4 transition-all duration-300">
                <span className="text-4xl md:text-5xl font-medium tracking-tight text-white">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-sm sm:text-base text-white/50 font-normal">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <span className="text-sm sm:text-base text-white/50 font-mono shrink-0 ml-4">
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
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg shadow-lg">
                View
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </section>
  )
}

export default AboutSection
