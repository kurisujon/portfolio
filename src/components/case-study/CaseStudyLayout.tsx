'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/motion'

export function CaseStudyLayout({ project }: { project: any }) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Basic GSAP reveals
    const hero = heroRef.current;
    if (!hero) return;

    const titleInner = hero.querySelector('.hero-title-inner')
    const subtitle = hero.querySelector('.hero-subtitle')
    const imageContainer = hero.querySelector('.hero-image-container')
    const image = hero.querySelector('.hero-image')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

    gsap.set(titleInner, { yPercent: 110 })
    gsap.set(subtitle, { opacity: 0, y: 20 })
    if (imageContainer) gsap.set(imageContainer, { clipPath: 'inset(10% 10% 10% 10%)' })
    if (image) gsap.set(image, { scale: 1.06 })

    tl.to(titleInner, { yPercent: 0, duration: 1.2, ease: 'power4.out' })
      .to(subtitle, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8")

    if (imageContainer && image) {
      tl.to(imageContainer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' }, "-=0.8")
        .to(image, { scale: 1, duration: 1.5, ease: 'power4.inOut' }, "-=1.5")
    }

    // Scroll Animations for sections
    const sections = document.querySelectorAll('.cs-section')
    sections.forEach((sec) => {
      const fadeEls = sec.querySelectorAll('.cs-fade')
      const lines = sec.querySelectorAll('.cs-line')

      if (fadeEls.length) gsap.set(fadeEls, { opacity: 0, y: 20 })
      if (lines.length) gsap.set(lines, { scaleX: 0, transformOrigin: 'left' })

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          once: true
        }
      })

      if (lines.length) st.to(lines, { scaleX: 1, duration: 1.2, ease: 'power3.out' })
      if (fadeEls.length) st.to(fadeEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, lines.length ? "-=0.8" : 0)
    })

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative w-full bg-[#f5f5f3] text-[#1c1d20] min-h-screen">

      {/* 01 HERO */}
      <section ref={heroRef} className="relative w-full pt-[120px] md:pt-[160px] pb-[80px] md:pb-[120px] px-[24px] md:px-[5vw] max-w-[1440px] mx-auto">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-[#1c1d20]/60 hover:text-[#1c1d20] font-mono text-[13px] uppercase tracking-widest transition-colors mb-[60px] md:mb-[100px]">
          <span>← Back to work</span>
        </Link>

        <div className="flex flex-col mb-[60px] md:mb-[80px]">
          <div className="overflow-hidden mb-[20px] md:mb-[30px]">
            <h1
              className="hero-title-inner font-snellenberg text-[#1c1d20] font-normal leading-[0.9] tracking-[-0.055em] will-change-transform"
              style={{ fontSize: 'clamp(3.8rem, 18vw, 12rem)' }}
            >
              {project.title}
            </h1>
          </div>
          <p className="hero-subtitle text-[#1c1d20]/70 font-snellenberg text-[1.4rem] md:text-[2.2rem] max-w-[600px] leading-[1.3] tracking-tight">
            {project.subtitle}
          </p>
        </div>

        {project.heroImage && (
          <div className="hero-image-container relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-[8px] bg-[#e0e0de]">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 84vw"
              className="hero-image object-cover"
            />
          </div>
        )}
      </section>

      {/* 02 META */}
      <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
        <div className="cs-line w-full h-[1px] bg-[rgba(28,29,32,0.15)] mb-[40px] md:mb-[60px]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {project.role && (
            <div className="cs-fade flex flex-col gap-3">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#1c1d20]/50">Role</span>
              <span className="font-snellenberg text-[1.2rem] md:text-[1.4rem] text-[#1c1d20] leading-[1.3]">{project.role}</span>
            </div>
          )}
          {project.type && (
            <div className="cs-fade flex flex-col gap-3">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#1c1d20]/50">Type</span>
              <span className="font-snellenberg text-[1.2rem] md:text-[1.4rem] text-[#1c1d20] leading-[1.3]">{project.type}</span>
            </div>
          )}
          {project.year && (
            <div className="cs-fade flex flex-col gap-3">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#1c1d20]/50">Year</span>
              <span className="font-snellenberg text-[1.2rem] md:text-[1.4rem] text-[#1c1d20] leading-[1.3]">{project.year}</span>
            </div>
          )}
          {project.coreSystem && (
            <div className="cs-fade flex flex-col gap-3">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#1c1d20]/50">Core System</span>
              <span className="font-snellenberg text-[1.2rem] md:text-[1.4rem] text-[#1c1d20] leading-[1.3]">{project.coreSystem}</span>
            </div>
          )}
          {project.status && (
            <div className="cs-fade flex flex-col gap-3">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#1c1d20]/50">Status</span>
              <span className="font-snellenberg text-[1.2rem] md:text-[1.4rem] text-[#1c1d20] leading-[1.3]">{project.status}</span>
            </div>
          )}
        </div>

        <div className="cs-line w-full h-[1px] bg-[rgba(28,29,32,0.15)] mt-[40px] md:mt-[60px]" />
      </section>

      {/* 03 OVERVIEW */}
      {project.overview && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="w-full md:w-[65%]">
              <h2 className="cs-fade font-snellenberg text-[clamp(2.4rem,4vw,3.5rem)] text-[#1c1d20] leading-[1.2] tracking-tight">
                {project.overview}
              </h2>
            </div>
            <div className="w-full md:w-[35%] flex flex-col justify-end">
              <p className="cs-fade text-[16px] md:text-[1.1rem] font-snellenberg leading-[1.6] text-[#1c1d20]/70">
                This project focuses on operational efficiency and deterministic verification, ensuring reliable data extraction and cross-referencing without relying on non-deterministic AI hallucinations for critical visa decisions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 04 PROBLEM */}
      {project.problem && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="w-full max-w-[900px]">
            <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[30px] md:mb-[50px]">
              The Problem
            </h3>
            <p className="cs-fade text-[1.4rem] md:text-[2rem] font-snellenberg leading-[1.4] text-[#1c1d20] tracking-tight">
              {project.problem}
            </p>
          </div>
        </section>
      )}

      {/* 05 WORKFLOW */}
      {project.workflow && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[60px] md:mb-[80px]">
            System Workflow
          </h3>

          <div className="flex flex-col md:flex-row gap-[60px] md:gap-0 justify-between">
            {project.workflow.map((step: any, i: number) => (
              <div key={i} className="cs-fade flex flex-col relative md:flex-1 md:pr-[20px]">
                <span className="font-mono text-[#1c1d20]/40 text-[14px] mb-[24px]">{step.step}</span>
                <div className="cs-line absolute top-[10px] left-[30px] md:left-[35px] right-[-30px] md:right-[-10px] h-[1px] bg-[rgba(28,29,32,0.15)] hidden md:block" />

                <h4 className="font-snellenberg font-medium text-[1.2rem] md:text-[1.1rem] lg:text-[1.3rem] text-[#1c1d20] leading-[1.2] mb-[12px]">
                  {step.title}
                </h4>
                <p className="font-snellenberg text-[#1c1d20]/60 text-[16px] md:text-[15px] lg:text-[1rem] leading-[1.5]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 06 ENGINEERING AREAS */}
      {project.engineering && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[24px]">
            Key Engineering Areas
          </h3>
          <div className="cs-line w-full h-[1px] bg-[rgba(28,29,32,0.15)]" />

          <div className="flex flex-col">
            {project.engineering.map((area: any, i: number) => (
              <div key={i} className="cs-fade group flex flex-col md:flex-row py-[40px] md:py-[60px]">
                <div className="w-[15%] hidden md:block pt-1">
                  <span className="font-mono text-[#1c1d20]/40 text-[13px]">{area.id}</span>
                </div>
                <div className="w-full md:w-[35%] mb-[16px] md:mb-0">
                  <h4 className="font-snellenberg text-[1.6rem] md:text-[2rem] text-[#1c1d20] leading-[1.2] tracking-tight">{area.title}</h4>
                </div>
                <div className="w-full md:w-[50%] md:pl-[5%]">
                  <p className="font-snellenberg text-[16px] md:text-[1.2rem] text-[#1c1d20]/70 leading-[1.5] max-w-[500px]">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
            <div className="cs-line w-full h-[1px] bg-[rgba(28,29,32,0.15)]" />
          </div>
        </section>
      )}


      {/* SYSTEM MODULES */}
      {project.systemModules && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[24px]">
            System Modules
          </h3>
          <div className="cs-line w-full h-[1px] bg-[rgba(28,29,32,0.15)]" />

          <div className="flex flex-col">
            {project.systemModules.map((mod: any, i: number) => (
              <div key={i} className="cs-fade group flex flex-col md:flex-row py-[40px] md:py-[60px]">
                <div className="w-[15%] hidden md:block pt-1">
                  <span className="font-mono text-[#1c1d20]/40 text-[13px]">{mod.id}</span>
                </div>
                <div className="w-full md:w-[35%] mb-[16px] md:mb-0">
                  <h4 className="font-snellenberg text-[1.6rem] md:text-[2rem] text-[#1c1d20] leading-[1.2] tracking-tight">{mod.title}</h4>
                </div>
                <div className="w-full md:w-[50%] md:pl-[5%]">
                  <p className="font-snellenberg text-[16px] md:text-[1.2rem] text-[#1c1d20]/70 leading-[1.5] max-w-[500px]">
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
            <div className="cs-line w-full h-[1px] bg-[rgba(28,29,32,0.15)]" />
          </div>
        </section>
      )}

      {/* SYSTEM RELATIONSHIP */}
      {project.systemRelationship && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 p-[40px] md:p-[80px] bg-[#e8e8e6] rounded-[8px]">
            <div className="w-full md:w-[40%]">
              <h3 className="cs-fade font-snellenberg text-[2rem] md:text-[2.6rem] text-[#1c1d20] leading-[1.1] tracking-tight">
                {project.systemRelationship.title}
              </h3>
            </div>
            <div className="w-full md:w-[60%] flex flex-col justify-center">
              <p className="cs-fade text-[16px] md:text-[1.2rem] font-snellenberg leading-[1.6] text-[#1c1d20]/80">
                {project.systemRelationship.desc}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* GROUNDING FOCUS */}
      {project.groundingFocus && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 p-[40px] md:p-[80px] bg-[#e8e8e6] rounded-[8px]">
            <div className="w-full md:w-[40%]">
              <h3 className="cs-fade font-snellenberg text-[2rem] md:text-[2.6rem] text-[#1c1d20] leading-[1.1] tracking-tight">
                {project.groundingFocus.title}
              </h3>
            </div>
            <div className="w-full md:w-[60%] flex flex-col justify-center">
              <p className="cs-fade text-[16px] md:text-[1.2rem] font-snellenberg leading-[1.6] text-[#1c1d20]/80">
                {project.groundingFocus.desc}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 07 SCREENS */}
      {project.screens && (
        <section className="cs-section w-full max-w-[1920px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="flex flex-col gap-[60px] md:gap-[120px]">
            {project.screens.map((screen: any, i: number) => (
              <div key={i} className={`cs-fade w-full ${screen.type === 'full' ? 'px-[24px] md:px-[5vw]' : 'px-[24px] md:px-[15vw]'}`}>
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-[8px] bg-[#e0e0de]">
                  <Image src={screen.src} alt={screen.caption || "Project Screen"} fill sizes="(max-width: 768px) 100vw, 90vw" className="object-cover" />
                </div>
                {screen.caption && (
                  <p className="mt-[16px] md:mt-[24px] text-center font-mono text-[12px] text-[#1c1d20]/40 uppercase tracking-widest">
                    {screen.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 08 TECH & 09 ROLE */}
      <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] md:gap-[10vw]">

          {/* Tech Stack */}
          {project.technologies && (
            <div className="flex flex-col">
              <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[40px]">
                Technical Stack
              </h3>
              <div className="flex flex-col gap-[16px]">
                {project.technologies.map((tech: string, i: number) => (
                  <div key={i} className="cs-fade flex items-center gap-[24px]">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#1c1d20]/20" />
                    <span className="font-snellenberg text-[1.4rem] md:text-[1.8rem] text-[#1c1d20] tracking-tight">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.techGroups && (
            <div className="flex flex-col">
              <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[40px]">
                Technical Stack
              </h3>
              <div className="flex flex-col gap-[40px]">
                {project.techGroups.map((group: any, i: number) => (
                  <div key={i} className="cs-fade flex flex-col">
                    <span className="font-mono text-[#1c1d20]/40 text-[12px] uppercase tracking-widest mb-[12px]">{group.group}</span>
                    <div className="flex flex-wrap gap-[12px]">
                      {group.items.map((item: string, j: number) => (
                        <span key={j} className="font-snellenberg text-[1.4rem] md:text-[1.6rem] text-[#1c1d20] tracking-tight">
                          {item}{j !== group.items.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role/Responsibilities */}
          {project.responsibilities && (
            <div className="flex flex-col">
              <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[40px]">
                Responsibilities
              </h3>
              <div className="flex flex-col gap-[20px]">
                {project.responsibilities.map((resp: any, i: number) => (
                  <div key={i} className="cs-fade flex gap-[24px]">
                    <span className="font-mono text-[#1c1d20]/30 text-[13px] pt-2">{resp.id}</span>
                    <span className="font-snellenberg text-[1.2rem] md:text-[1.4rem] text-[#1c1d20]/80 leading-[1.4]">{resp.task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 10 OUTCOME */}
      {project.outcome && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="w-full max-w-[1000px] mx-auto text-center flex flex-col items-center">
            <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[40px]">
              Outcome & Value
            </h3>
            <p className="cs-fade font-snellenberg text-[1.6rem] md:text-[2.6rem] leading-[1.3] text-[#1c1d20] tracking-tight">
              "{project.outcome}"
            </p>
          </div>
        </section>
      )}


      {/* 11 RECOGNITION */}
      {project.recognition && (
        <section className="cs-section w-full px-[24px] md:px-[5vw] max-w-[1440px] mx-auto mb-[120px] md:mb-[180px]">
          <div className="w-full text-center flex flex-col items-center">
            <h3 className="cs-fade text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em] text-[#1c1d20]/50 mb-[40px]">
              Recognition
            </h3>
            <div className="cs-fade flex flex-col items-center">
               <span className="font-snellenberg text-[3rem] md:text-[5rem] leading-[1] text-[#1c1d20] tracking-tight mb-[16px]">
                 {project.recognition.award}
               </span>
               <span className="font-snellenberg text-[1.4rem] md:text-[2rem] text-[#1c1d20]/70">
                 {project.recognition.category}
               </span>
            </div>
          </div>
        </section>
      )}

      {/* 11 NEXT PROJECT */}
      {project.nextProject && (
        <section className="w-full border-t border-[rgba(28,29,32,0.15)] mt-[80px]">
          <Link href={`/work/${project.nextProject}`} className="block w-full group py-[100px] md:py-[160px] bg-[#f5f5f3] hover:bg-[#e8e8e6] transition-colors duration-500 text-center">
            <span className="text-[12px] font-mono tracking-[0.2em] uppercase text-[#1c1d20]/50 mb-[24px] block">Next Project</span>
            <h2
              className="font-snellenberg text-[#1c1d20] font-normal tracking-[-0.04em] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}
            >
              {project.nextTitle} <span className="inline-block ml-4 text-[2rem] md:text-[3rem] text-[#1c1d20]/30 group-hover:text-[#1c1d20] transition-colors group-hover:translate-x-4 group-hover:-translate-y-4 duration-500">↗</span>
            </h2>
          </Link>
        </section>
      )}

    </div>
  )
}
