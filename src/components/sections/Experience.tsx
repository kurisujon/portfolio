'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

const experiences = [
  {
    date: "2026 — PRESENT",
    role: "OJT Backend Developer",
    company: "Infosoft Tech Solutions",
    description: "Contributing to the development and maintenance of government local taxation systems deployed across multiple cities. Engineering backend workflows, RESTful APIs, relational database transactions, and ensuring production reliability.",
  },
  {
    date: "2023 — PRESENT",
    role: "Full Stack Developer",
    company: "Independent Projects",
    description: "Architecting and building full-stack applications. Designing frontend interfaces, backend APIs, data pipelines, and integrating AI automation capabilities for scalable digital products.",
  }
]

export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current;
    if (!containerRef.current) return

    const rows = containerRef.current.querySelectorAll('.exp-row')

    rows.forEach((row) => {
      const date = row.querySelector('.exp-date')
      const role = row.querySelector('.exp-role')
      const company = row.querySelector('.exp-company')
      const line = row.querySelector('.exp-line')
      const desc = row.querySelector('.exp-desc')

      gsap.set([date, role, company], { opacity: 0, y: 15 })
      gsap.set(line, { scaleX: 0 })
      gsap.set(desc, { opacity: 0, y: 15 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          once: true
        }
      })

      tl.to(date, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(role, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, "-=0.3")
        .to(company, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, "-=0.3")
        .to(line, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, "-=0.2")
        .to(desc, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.2")
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger && container?.contains(t.trigger as Node) && t.kill())
    }
  }, [])

  return (
    <section id="experience" ref={containerRef} className="relative w-full bg-primary flex flex-col py-32 z-10">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary mb-24 block">Professional Experience</span>

        <div className="flex flex-col gap-24">
          {experiences.map((exp, index) => (
            <div key={index} className="exp-row flex flex-col gap-6">
              <div className="exp-date text-sm font-mono tracking-widest text-secondary">
                {exp.date}
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="exp-role text-3xl md:text-5xl font-snellenberg font-medium text-white tracking-tight">
                  {exp.role}
                </h3>
                <span className="exp-company text-xl md:text-2xl font-snellenberg text-secondary">
                  {exp.company}
                </span>
              </div>

              <div className="exp-line w-full h-[1px] bg-default origin-left my-4" />

              <div className="exp-desc text-lg md:text-xl text-secondary leading-relaxed max-w-3xl font-snellenberg">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
