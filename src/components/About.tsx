'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'
import Link from 'next/link'
import { Magnetic } from '@/components/ui/MagneticButton'

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
  
  // Section 2 refs
  const primaryTextRef = useRef<HTMLDivElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {

    // --- INTRO / ABOUT TEASER ENTRANCE ---
    if (primaryTextRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: primaryTextRef.current,
          start: 'top 75%',
          once: true
        }
      })
      
      const lines = primaryTextRef.current.querySelectorAll('.line-reveal-inner')
      gsap.set(lines, { yPercent: 110 })
      
      gsap.set(paragraphRef.current, { y: 30, opacity: 0 })
      gsap.set(ctaRef.current, { scale: 0.75, opacity: 0, y: 30 })
      gsap.set(labelRef.current, { opacity: 0 })
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left' })

      tl.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' })
        .to(paragraphRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, "-=0.8")
        .to(ctaRef.current, { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, "-=0.6")
        .to(labelRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.8")
        .to(dividerRef.current, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, "-=0.8")
    }

    // --- MILESTONES REVEAL ---
    if (container) {
      const milestonesLabel = container.querySelector('.milestones-label')
      const milestonesTopDivider = container.querySelector('.milestones-top-divider')
      
      if (milestonesLabel && milestonesTopDivider) {
        gsap.set(milestonesLabel, { opacity: 0, y: 15 })
        gsap.set(milestonesTopDivider, { scaleX: 0, transformOrigin: 'left' })
        
        gsap.timeline({
          scrollTrigger: { trigger: milestonesLabel, start: 'top 85%', once: true }
        })
        .to(milestonesLabel, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(milestonesTopDivider, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, "-=0.6")
      }

      const rows = container.querySelectorAll('.milestone-row')
      rows.forEach((row) => {
        const year = row.querySelector('.milestone-year')
        const title = row.querySelector('.milestone-title')
        const desc = row.querySelector('.milestone-desc')
        const divider = row.querySelector('.milestone-divider')
        
        gsap.set(year, { opacity: 0, y: 15 })
        gsap.set([title, desc], { opacity: 0, y: 20 })
        gsap.set(divider, { scaleX: 0, transformOrigin: 'left' })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 90%', once: true }
        })
        
        tl.to(divider, { scaleX: 1, duration: 1.2, ease: 'power3.out' })
          .to(year, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, "-=0.8")
          .to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, "-=0.6")
          .to(desc, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
      })
    }

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-[#f5f5f3] text-[#1c1d20] flex flex-col z-10 pt-[140px] md:pt-[180px] ">
      
      {/* SECTION 2: INTRO / ABOUT TEASER */}
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw] relative min-h-[70vh] flex flex-col">
        
        <div className="flex flex-col md:flex-row relative w-full mb-[80px] md:mb-[140px]">
          <div ref={primaryTextRef} className="w-full md:w-[60%] lg:w-[58%] max-w-[900px] mb-[40px] md:mb-0">
            <h2 
              className="font-snellenberg font-normal text-[#1c1d20] tracking-[-0.035em] leading-[1.03] md:leading-[1.08] flex flex-col"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 4.75rem)' }}
            >
              <span className="overflow-hidden inline-block"><span className="line-reveal-inner inline-block">I build full-stack systems</span></span>
              <span className="overflow-hidden inline-block"><span className="line-reveal-inner inline-block">from interface to infrastructure,</span></span>
              <span className="overflow-hidden inline-block"><span className="line-reveal-inner inline-block">with AI integrated where it</span></span>
              <span className="overflow-hidden inline-block"><span className="line-reveal-inner inline-block">actually improves the product.</span></span>
            </h2>
          </div>

          <div ref={paragraphRef} className="w-full md:w-[35%] lg:w-[30%] md:absolute md:right-[5%] lg:right-[8%] md:top-[1em]">
            <p className="font-snellenberg text-[#1c1d20] font-normal leading-[1.45] md:leading-[1.6] text-[16px] md:text-[1.05rem] lg:text-[1.1rem] max-w-[320px]">
              I work across frontend, backend, databases, APIs, document systems, and AI workflows—building products from the interface down to the data layer.
            </p>
          </div>
        </div>

        <div ref={ctaRef} className="self-start md:self-auto md:absolute md:right-[6vw] md:bottom-[60px] lg:right-[8vw] lg:bottom-[80px] z-20 mt-[20px] md:mt-0 mb-[60px] md:mb-0">
          <Magnetic strength={0.2} textStrength={0.1}>
            <Link 
              href="/#about"
              className="group relative overflow-hidden flex items-center justify-center bg-[#1c1d20] text-[#f5f5f3] rounded-full shadow-xl"
              style={{ width: 'clamp(110px, 12vw, 180px)', aspectRatio: '1/1' }}
            >
              <span aria-hidden className="absolute left-[-25%] top-0 w-[150%] h-[150%] bg-[#455ce9] rounded-[50%] translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[-15%] z-0" />
              <span className="font-snellenberg font-medium text-[14px] md:text-[16px] tracking-wide relative z-10 transition-transform duration-300 group-hover:scale-110">
                About me
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="w-full mt-auto pt-[40px] md:pt-[120px] flex flex-col relative z-10">
          <span ref={labelRef} className="text-[12px] md:text-[14px] font-snellenberg tracking-[0.04em] text-[#1c1d20]/60 mb-[16px] md:mb-[24px]">
            ABOUT
          </span>
          <div className="w-full h-[1px] bg-[rgba(28,29,32,0.20)] overflow-hidden">
            <div ref={dividerRef} className="w-full h-full bg-[#1c1d20] origin-left" />
          </div>
        </div>

      </div>

      {/* MILESTONES / EDUCATION */}
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw] mt-[100px] md:mt-[180px] flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col mb-0">
          <span className="milestones-label text-[#1c1d20]/60 text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] mb-[24px]">
            MILESTONES
          </span>
          <div className="milestones-top-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)]" />
        </div>

        {/* Milestone List */}
        <div className="flex flex-col">
          {milestoneItems.map((item, index) => (
            <div key={index} className="milestone-row group flex flex-col">
              
              {/* Desktop / Tablet Row */}
              <div className="hidden md:flex flex-row py-[40px] lg:py-[55px]">
                <div className="w-[25%] lg:w-[20%] shrink-0">
                  <span className="milestone-year text-[#1c1d20]/60 text-[15px] font-mono tracking-widest">{item.year}</span>
                </div>
                <div className="flex flex-col gap-2 md:w-[75%] lg:w-[80%]">
                  <h3 
                    className="milestone-title text-[#1c1d20] font-snellenberg font-normal tracking-[-0.03em] leading-[1.05]"
                    style={{ fontSize: 'clamp(2rem, 3vw, 3.5rem)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="milestone-desc text-[#1c1d20]/70 font-snellenberg text-[16px] md:text-[1.1rem]">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Mobile Row */}
              <div className="md:hidden flex flex-col py-[32px]">
                <span className="milestone-year text-[#1c1d20]/60 text-[14px] font-mono tracking-widest mb-[16px]">{item.year}</span>
                <h3 className="milestone-title text-[#1c1d20] font-snellenberg font-normal tracking-[-0.02em] leading-[1.1] text-[2.2rem] mb-[8px]">
                  {item.title}
                </h3>
                <p className="milestone-desc text-[#1c1d20]/70 font-snellenberg text-[16px]">
                  {item.subtitle}
                </p>
              </div>

              <div className="milestone-divider w-full h-[1px] bg-[rgba(28,29,32,0.18)]" />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default AboutSection
