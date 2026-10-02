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
    if (!containerRef.current) return

    const rows = containerRef.current.querySelectorAll('.tech-row')

    rows.forEach((row) => {
      const header = row.querySelector('.tech-header')
      const line = row.querySelector('.tech-line')
      const items = row.querySelectorAll('.tech-item')

      gsap.set(header, { opacity: 0, y: 10 })
      gsap.set(line, { scaleX: 0 })
      gsap.set(items, { opacity: 0, y: 10 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          once: true
        }
      })

      tl.to(header, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(line, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, "-=0.2")
        .to(items, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, "-=0.3")
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger && container?.contains(t.trigger as Node) && t.kill())
    }
  }, [])

  return (
    <section id="skills" ref={containerRef} className="relative w-full bg-primary flex flex-col pt-24 pb-32 z-10">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary mb-24 block">Engineering Stack</span>
        
        <div className="flex flex-col gap-12 md:gap-16">
          {techCategories.map((group) => (
            <div key={group.id} className="tech-row flex flex-col gap-6">
              
              <div className="tech-header flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                <span className="text-sm font-mono text-secondary">{group.id}</span>
                <span className="text-xl md:text-2xl font-mono tracking-wide text-primary uppercase">{group.category}</span>
              </div>
              
              <div className="tech-line w-full h-[1px] bg-default origin-left" />
              
              <div className="flex flex-col gap-2 md:pl-[4.5rem]">
                {group.items.map((tech, i) => (
                  <span key={i} className="tech-item text-lg md:text-xl text-secondary font-snellenberg hover:text-white transition-colors cursor-default w-fit">
                    {tech}
                  </span>
                ))}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
