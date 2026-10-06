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

    const rows = container.querySelectorAll('.exp-row')

    rows.forEach((row) => {
      const date = row.querySelector('.exp-date')
      const role = row.querySelector('.exp-role')
      const company = row.querySelector('.exp-company')
      const desc = row.querySelector('.exp-desc')
      const divider = row.querySelector('.exp-divider')

      gsap.set([date, company], { opacity: 0, y: 15 })
      gsap.set(role, { opacity: 0, y: 20 })
      gsap.set(desc, { opacity: 0, y: 15 })
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          once: true
        }
      })

      tl.to(divider, { scaleX: 1, duration: 1.2, ease: 'power3.out' })
        .to(date, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.8")
        .to(role, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, "-=0.6")
        .to(company, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.6")
        .to(desc, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5")
    })

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={containerRef} className="relative w-full bg-[#f5f5f3] text-[#1c1d20] flex flex-col  pb-[100px] md:pb-[140px] z-10">
      
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw]">
        
        {/* Section Header */}
        <div className="flex flex-col mb-0">
          <span className="section-label text-[#1c1d20]/60 text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] mb-[24px]">
            EXPERIENCE
          </span>
          <div className="top-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)] will-change-transform" />
        </div>

        {/* Experience List */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <div key={index} className="exp-row group flex flex-col">
              
              {/* Desktop / Tablet Row */}
              <div className="hidden md:flex flex-row py-[50px] lg:py-[70px]">
                <div className="w-[25%] lg:w-[25%] shrink-0 pt-2">
                  <span className="exp-date text-[#1c1d20]/60 text-[14px] lg:text-[15px] font-mono tracking-widest uppercase">
                    {exp.date}
                  </span>
                </div>
                <div className="flex flex-col gap-4 lg:w-[65%] max-w-[900px]">
                  <h3 
                    className="exp-role text-[#1c1d20] font-snellenberg font-normal tracking-[-0.04em] leading-[1]"
                    style={{ fontSize: 'clamp(2.4rem, 4vw, 4.5rem)' }}
                  >
                    {exp.role}
                  </h3>
                  <span className="exp-company text-[#1c1d20]/80 text-[1.2rem] lg:text-[1.4rem] font-snellenberg font-medium">
                    {exp.company}
                  </span>
                  <p className="exp-desc text-[#1c1d20]/70 text-[16px] lg:text-[1.1rem] font-snellenberg leading-[1.6] max-w-[700px] mt-2">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Mobile Row */}
              <div className="md:hidden flex flex-col py-[40px]">
                <span className="exp-date text-[#1c1d20]/60 text-[13px] font-mono tracking-widest uppercase mb-[20px]">
                  {exp.date}
                </span>
                <h3 className="exp-role text-[#1c1d20] font-snellenberg font-normal tracking-[-0.02em] leading-[1.05] text-[2.4rem] mb-[12px]">
                  {exp.role}
                </h3>
                <span className="exp-company text-[#1c1d20]/80 text-[1.1rem] font-snellenberg font-medium mb-[16px]">
                  {exp.company}
                </span>
                <p className="exp-desc text-[#1c1d20]/70 text-[16px] font-snellenberg leading-[1.5]">
                  {exp.description}
                </p>
              </div>

              <div className="exp-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)] will-change-transform" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ExperienceSection
