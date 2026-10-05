'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

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

export function TechStackSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return

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
      gsap.set(items, { opacity: 0, y: 15 })
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
        .to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' }, "-=0.6")
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger && container?.contains(t.trigger as Node) && t.kill())
    }
  }, [])

  return (
    <section id="skills" ref={containerRef} className="relative w-full bg-[#f5f5f3] text-[#1c1d20] flex flex-col  pb-[80px] z-10">
      
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw]">
        
        {/* Section Header */}
        <div className="flex flex-col mb-0">
          <span className="section-label text-[#1c1d20]/60 text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] mb-[24px]">
            TECH STACK
          </span>
          <div className="top-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)] will-change-transform" />
        </div>
        
        {/* Stack List */}
        <div className="flex flex-col">
          {techCategories.map((group) => (
            <div key={group.id} className="tech-row group flex flex-col">
              
              {/* Desktop Row */}
              <div className="hidden md:flex flex-row py-[40px] lg:py-[55px] items-start">
                <div className="w-[10%] shrink-0 pt-2">
                  <span className="tech-number text-[#1c1d20]/50 text-[13px] font-mono tracking-widest">{group.id}</span>
                </div>
                <div className="w-[25%] lg:w-[20%] shrink-0 pt-[6px]">
                  <h3 className="tech-category text-[#1c1d20] text-[1.1rem] lg:text-[1.25rem] font-snellenberg font-medium uppercase tracking-[0.05em]">
                    {group.category}
                  </h3>
                </div>
                <div className="flex-1 flex flex-wrap gap-x-8 gap-y-4 md:pl-8 lg:pl-0">
                  {group.items.map((tech, i) => (
                    <span 
                      key={i} 
                      className="tech-item text-[#1c1d20] font-snellenberg font-normal tracking-[-0.02em] hover:opacity-100 opacity-90 transition-opacity duration-300 cursor-default"
                      style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.75rem)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Row */}
              <div className="md:hidden flex flex-col py-[32px]">
                <div className="flex items-center gap-4 mb-[20px]">
                  <span className="tech-number text-[#1c1d20]/50 text-[13px] font-mono tracking-widest">{group.id}</span>
                  <h3 className="tech-category text-[#1c1d20] text-[1.1rem] font-snellenberg font-medium uppercase tracking-[0.05em]">
                    {group.category}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-2">
                  {group.items.map((tech, i) => (
                    <span 
                      key={i} 
                      className="tech-item text-[#1c1d20] font-snellenberg font-normal tracking-[-0.02em]"
                      style={{ fontSize: '2.2rem' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="tech-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)] will-change-transform" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TechStackSection
