'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/motion'
import { Magnetic } from '@/components/ui/MagneticButton'
import { BrainCircuit, Database, FileText, Binary, Link, Cpu } from 'lucide-react'

const techCategories = [
  {
    id: '01',
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "Dart"]
  },
  {
    id: '02',
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    id: '03',
    category: "Backend",
    items: ["Node.js", "Laravel", "FastAPI"]
  },
  {
    id: '04',
    category: "Data",
    items: ["PostgreSQL", "Supabase"]
  },
  {
    id: '05',
    category: "AI & Systems",
    items: ["RAG", "Embeddings", "LangChain", "Qdrant", "Document Processing"]
  },
  {
    id: '06',
    category: "Infrastructure",
    items: ["Docker", "Git", "Vercel"]
  }
]

type TechIcon = { type: 'img', src: string } | { type: 'lucide', Icon: any }

const getTechIcon = (name: string): TechIcon => {
  const map: Record<string, string> = {
    "JavaScript": "javascript/javascript-original.svg",
    "TypeScript": "typescript/typescript-original.svg",
    "Python": "python/python-original.svg",
    "PHP": "php/php-original.svg",
    "SQL": "azuresqldatabase/azuresqldatabase-original.svg",
    "Dart": "dart/dart-original.svg",
    "React": "react/react-original.svg",
    "Next.js": "nextjs/nextjs-original.svg",
    "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
    "Node.js": "nodejs/nodejs-original.svg",
    "Laravel": "laravel/laravel-original.svg",
    "FastAPI": "fastapi/fastapi-original.svg",
    "PostgreSQL": "postgresql/postgresql-original.svg",
    "Supabase": "supabase/supabase-original.svg",
    "Docker": "docker/docker-original.svg",
    "Git": "git/git-original.svg",
    "Vercel": "vercel/vercel-original.svg",
  }

  if (map[name]) {
    return { type: 'img', src: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${map[name]}` }
  }

  // Fallbacks using Lucide
  switch (name) {
     case 'RAG': return { type: 'lucide', Icon: BrainCircuit }
     case 'Embeddings': return { type: 'lucide', Icon: Binary }
     case 'LangChain': return { type: 'lucide', Icon: Link }
     case 'Qdrant': return { type: 'lucide', Icon: Database }
     case 'Document Processing': return { type: 'lucide', Icon: FileText }
     default: return { type: 'lucide', Icon: Cpu }
  }
}

const innerNodes = ["TypeScript", "React", "Next.js", "Tailwind CSS"]
const outerNodes = ["Node.js", "PostgreSQL", "Supabase", "Docker", "Git", "Vercel"]

export function TechStackSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return

    const ctx = gsap.context(() => {

      const label = container.querySelector('.section-label')
      const topDivider = container.querySelector('.top-divider')

      if (label && topDivider) {
        gsap.set(label, { opacity: 0, y: 15 })
        gsap.set(topDivider, { scaleX: 0, transformOrigin: 'left' })

        gsap.timeline({
          scrollTrigger: { trigger: label, start: 'top 85%', once: true }
        })
        .to(label, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(topDivider, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, "-=0.6")
      }

      const rows = container.querySelectorAll('.tech-row')

      rows.forEach((row) => {
        const number = row.querySelector('.tech-number')
        const category = row.querySelector('.tech-category')
        const items = row.querySelectorAll('.tech-item')
        const divider = row.querySelector('.tech-divider')

        gsap.set([number, category], { opacity: 0, y: 10 })
        gsap.set(items, { opacity: 0, y: 15, scale: 0.95 })
        gsap.set(divider, { scaleX: 0, transformOrigin: 'left' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true
          }
        })

        tl.to(divider, { scaleX: 1, duration: 1.2, ease: 'power3.out' })
          .to([number, category], { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.8")
          .to(items, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.2)' }, "-=0.6")
      })

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={containerRef} className="relative w-full bg-[#f5f5f3] text-[#1c1d20] flex flex-col pb-[80px] z-10 overflow-hidden">

      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw]">

        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <span className="section-label text-[#1c1d20]/60 text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] mb-[24px]">
            TECH STACK
          </span>
          <div className="top-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)] will-change-transform" />
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start relative">

          {/* Left Column: Grid of Magnetic Logo Cards */}
          <div className="w-full lg:w-[60%] flex flex-col ">
            {techCategories.map((group) => (
              <div key={group.id} className="tech-row group flex flex-col">

                <div className="flex flex-col md:flex-row py-4 items-start md:items-center">
                  <div className="w-full md:w-[30%] flex items-center gap-6 mb-4 md:mb-0">
                    <span className="tech-number text-[#1c1d20]/50 text-[13px] font-mono tracking-widest">{group.id}</span>
                    <h3 className="tech-category text-[#1c1d20] text-[1.1rem] font-snellenberg font-medium uppercase tracking-[0.05em]">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex-1 flex flex-wrap gap-3 md:gap-4 w-full justify-start">
                    {group.items.map((tech, i) => {
                      const icon = getTechIcon(tech)
                      return (
                        <Magnetic key={i} strength={0.2} textStrength={0.1}>
                          <div className="tech-item group/card flex flex-col items-center justify-center w-[70px] h-[70px] md:w-[80px] md:h-[80px] bg-[#ffffff] border border-[rgba(28,29,32,0.1)] rounded-md hover:border-[rgba(28,29,32,0.3)] hover:-translate-y-1 transition-all duration-300 hover:shadow-md cursor-default">
                            {icon.type === 'img' ? (
                              <img src={icon.src} alt={tech} className="w-6 h-6 md:w-7 md:h-7 mb-1.5 opacity-80 group-hover/card:opacity-100 transition-opacity" />
                            ) : (
                              <icon.Icon className="w-6 h-6 md:w-7 md:h-7 mb-1.5 opacity-80 group-hover/card:opacity-100 transition-opacity text-[#1c1d20]" />
                            )}
                            <span className="text-[#1c1d20]/60 text-[9px] md:text-[10px] font-mono text-center group-hover/card:text-[#1c1d20] transition-colors leading-tight px-1">{tech}</span>
                          </div>
                        </Magnetic>
                      )
                    })}
                  </div>
                </div>

                <div className="tech-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)] will-change-transform" />
              </div>
            ))}
          </div>

          {/* Right Column: Solar System Orbit Animation (Desktop only) */}
          <div className="w-full lg:w-[40%] hidden lg:flex justify-center sticky top-24">
            <div className="group relative w-[400px] h-[400px]">
               {/* AI Core */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#1c1d20] border border-[rgba(28,29,32,0.15)] rounded-full flex items-center justify-center shadow-lg z-20">
                  <span className="text-[#f5f5f3] font-mono text-xs tracking-widest font-medium">AI</span>
               </div>

               {/* Inner Ring (Radius 100px) */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-[rgba(28,29,32,0.12)] rounded-full animate-orbit group-hover:[animation-play-state:paused] z-10">
                  {innerNodes.map((tech, i) => {
                     const angle = (360 / innerNodes.length) * i;
                     const icon = getTechIcon(tech);
                     return (
                       <div key={tech} className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4" style={{ transform: `rotate(${angle}deg) translateY(-100px)` }}>
                          <div className="w-full h-full" style={{ transform: `rotate(-${angle}deg)` }}>
                             <div className="w-full h-full animate-counter-orbit group-hover:[animation-play-state:paused] flex items-center justify-center bg-[#ffffff] border border-[rgba(28,29,32,0.15)] rounded-full hover:scale-110 hover:border-[rgba(28,29,32,0.3)] hover:shadow-md transition-all cursor-pointer group/node">
                                {icon.type === 'img' ? (
                                  <img src={icon.src} alt={tech} className="w-4 h-4 opacity-80 group-hover/node:opacity-100 transition-opacity" />
                                ) : (
                                  <icon.Icon className="w-4 h-4 opacity-80 group-hover/node:opacity-100 transition-opacity text-[#1c1d20]" />
                                )}
                             </div>
                          </div>
                       </div>
                     )
                  })}
               </div>

               {/* Outer Ring (Radius 160px) */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border border-[rgba(28,29,32,0.12)] rounded-full animate-orbit-slow group-hover:[animation-play-state:paused] z-0">
                  {outerNodes.map((tech, i) => {
                     const angle = (360 / outerNodes.length) * i;
                     const icon = getTechIcon(tech);
                     return (
                       <div key={tech} className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5" style={{ transform: `rotate(${angle}deg) translateY(-160px)` }}>
                          <div className="w-full h-full" style={{ transform: `rotate(-${angle}deg)` }}>
                             <div className="w-full h-full animate-counter-orbit-slow group-hover:[animation-play-state:paused] flex items-center justify-center bg-[#ffffff] border border-[rgba(28,29,32,0.15)] rounded-full hover:scale-110 hover:border-[rgba(28,29,32,0.3)] hover:shadow-md transition-all cursor-pointer group/node">
                                {icon.type === 'img' ? (
                                  <img src={icon.src} alt={tech} className="w-5 h-5 opacity-80 group-hover/node:opacity-100 transition-opacity" />
                                ) : (
                                  <icon.Icon className="w-5 h-5 opacity-80 group-hover/node:opacity-100 transition-opacity text-[#1c1d20]" />
                                )}
                             </div>
                          </div>
                       </div>
                     )
                  })}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TechStackSection
