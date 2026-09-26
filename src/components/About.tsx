"use client"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'
import { Card } from '@/components/ui/Card'
import { BookOpen, Award } from 'lucide-react'
import { TextMaskReveal } from '@/components/animations/TextMaskReveal'

const milestones = [
  {
    title: 'Ideation Bootcamp Champion',
    year: '2025',
    subtitle: 'SalinKaalaman (Language Barrier Solution)',
    image: '/images/milestones/certificate-1.jpg',
  },
  {
    title: 'SIA Top 5 Best Project',
    year: '2025',
    subtitle: 'CHoDaMS - City Housing Data System',
    image: '/chodams_web_preview.png',
  },
  {
    title: 'CODECRAFT Top 5 Mobile',
    year: '2023',
    subtitle: 'Eathink About It Mobile',
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
      className="py-24 flex flex-col gap-16 relative"
    >
      <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
        Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Main Bio */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-8">
          <Typography variant="h2" className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 dark:text-primary transition-colors tracking-tight">
            Full Stack AI Software Developer building end-to-end applications across frontend, backend, APIs, databases, and AI integrations.
          </Typography>
          
          <div className="flex flex-col gap-6 border-l-2 border-[#3b82f6] pl-6 mt-4">
            <TextMaskReveal 
              text="I build complete web systems from frontend interfaces to backend services, REST APIs, relational databases, authentication, and third-party integrations."
              as="p"
              className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-secondary"
              start="top 80%"
              stagger={0.03}
            />
            <TextMaskReveal 
              text="I integrate practical AI capabilities such as RAG, embeddings, semantic retrieval, LLM-powered workflows, and automation when they solve real application requirements."
              as="p"
              className="text-base md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
              start="top 80%"
              stagger={0.03}
            />
            <TextMaskReveal 
              text="I use AI coding agents for research, implementation, debugging, testing, refactoring, and documentation. I review generated changes, validate architecture and integrations, and remain responsible for final code quality."
              as="p"
              className="text-base md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
              start="top 80%"
              stagger={0.03}
            />
          </div>
        </div>

        {/* Right Column Grid for Education & Achievements */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Education Card */}
          <Card className="flex flex-col gap-6 p-8 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-500 ease-out rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Education</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-primary leading-snug">Bachelor of Science in Information Technology</h4>
              <p className="text-zinc-600 dark:text-secondary text-sm leading-relaxed">
                University of Mindanao - Digos College
              </p>
              <p className="text-[#3b82f6] font-mono text-xs font-bold uppercase tracking-wider">
                Graduated: June 2026
              </p>
            </div>
          </Card>

          {/* Achievements Card */}
          <Card className="flex flex-col gap-6 p-8 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-500 ease-out rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Milestones</span>
            </div>

            <div className="flex flex-col gap-2">
              {milestones.map((item, index) => (
                <div key={item.title}>
                  <div
                    onMouseEnter={() => setHoveredMilestone(item.image)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    className="group flex flex-col gap-1 cursor-pointer py-3 px-3 -mx-3 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-800 dark:text-primary font-bold group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[#3b82f6] font-bold font-mono text-xs">
                        {item.year}
                      </span>
                    </div>
                    <span className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">
                      {item.subtitle}
                    </span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-full h-px bg-zinc-200 dark:bg-white/5 my-1" />
                  )}
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* Floating Hover Reveal for Milestones Tethered to Mouse Cursor */}
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
              duration: 0.2,
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
