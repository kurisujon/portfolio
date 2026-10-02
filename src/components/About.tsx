'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

const milestoneItems = [
  {
    title: 'Bachelor of Science in Information Technology',
    subtitle: 'University of Mindanao - Digos College',
    year: '2026',
  },
  {
    title: 'Ideation Bootcamp Champion',
    subtitle: 'SalinKaalaman (Language Barrier Solution)',
    year: '2025',
  },
  {
    title: 'SIA Top 5 Best Project',
    subtitle: 'CHoDaMS - City Housing Data System',
    year: '2025',
  },
  {
    title: 'CODECRAFT Top 5 Mobile',
    subtitle: 'Eathink About It Mobile',
    year: '2023',
  },
]

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const container = containerRef.current;
    // 1. Large Typography Word Reveal (Phase 5)
    if (statementRef.current) {
      const words = statementRef.current.querySelectorAll('.word-reveal')
      
      gsap.fromTo(words, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 85%',
            once: true
          }
        }
      )
    }

    // 2. Milestones Reveal (Phase 6)
    if (containerRef.current) {
      const rows = containerRef.current.querySelectorAll('.milestone-row')
      
      rows.forEach((row) => {
        const year = row.querySelector('.milestone-year')
        const line = row.querySelector('.milestone-line')
        const content = row.querySelector('.milestone-content')
        
        gsap.set(year, { opacity: 0, x: -20 })
        gsap.set(line, { scaleX: 0 })
        gsap.set(content, { opacity: 0, y: 20 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            once: true
          }
        })
        
        tl.to(year, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
          .to(line, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, "-=0.4")
          .to(content, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.4")
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger && container?.contains(t.trigger as Node) && t.kill())
    }
  }, [])

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-primary flex flex-col py-32 z-10">
      
      {/* PHASE 5: OVERVIEW */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-24">
        
        <div ref={statementRef} className="text-4xl md:text-5xl lg:text-[4vw] font-snellenberg font-medium leading-[1.2] text-white tracking-tight">
          {/* We manually split words so we can animate them easily without a heavy library */}
          {"I build full-stack software from interface to infrastructure, then integrate AI where it actually improves the product.".split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
              <span className="word-reveal inline-block will-change-transform">{word}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-default pt-16">
          <div className="md:col-span-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary">Expertise</span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 text-lg md:text-xl text-secondary leading-relaxed font-snellenberg">
            <p>
              My focus is on creating robust architectures—handling relational databases, secure authentication, external APIs, and resilient backends alongside premium, interactive frontend experiences.
            </p>
            <p>
              I leverage agentic workflows and AI capabilities (RAG pipelines, embeddings, document processing) to solve complex automation problems, rather than just building wrappers.
            </p>
          </div>
        </div>
      </div>

      {/* PHASE 6: MILESTONES */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 mt-48 flex flex-col">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary mb-16">Milestones & Education</span>

        <div className="flex flex-col">
          {milestoneItems.map((item, index) => (
            <div key={index} className="milestone-row flex flex-col gap-4 mb-16 last:mb-0 group cursor-default">
              <div className="flex items-center gap-6">
                <span className="milestone-year text-lg font-mono text-white/50">{item.year}</span>
                <div className="milestone-line flex-grow h-[1px] bg-default origin-left" />
              </div>
              <div className="milestone-content flex flex-col gap-1 md:pl-24 transition-transform duration-500 group-hover:translate-x-2">
                <h3 className="text-2xl md:text-4xl text-white font-medium tracking-tight font-snellenberg">{item.title}</h3>
                <span className="text-base md:text-lg text-secondary font-snellenberg">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default AboutSection
