'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { ArrowUpRight } from 'lucide-react'
import { Magnetic } from '@/components/ui/MagneticButton'

const projects = [
  {
    id: '01',
    title: 'Veldra',
    meta: 'Full Stack AI Software Developer',
    image: '/veldra_preview.png',
    href: '/work/veldra',
  },
  {
    id: '02',
    title: 'StudFlow',
    meta: 'Full Stack AI Developer',
    image: '/studflow_preview.png',
    href: '/work/studflow',
  },
  {
    id: '03',
    title: 'CHoDaMS Web',
    meta: 'Full Stack Developer',
    image: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png',
    href: '/work/chodams-web',
  },
  {
    id: '04',
    title: 'CHoDaMS Mobile',
    meta: 'Mobile Developer',
    image: '/images/projects/chodams-mobile/cover-dashboard-gps.png',
    href: '/work/chodams-mobile',
  },
]

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {

    // SCROLL REVEAL ANIMATIONS
    const rows = container.querySelectorAll('.project-row')
    
    // Top divider and label
    const topDivider = container.querySelector('.top-divider')
    const sectionLabel = container.querySelector('.section-label')
    const countLabel = container.querySelector('.count-label')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true
      }
    })

    gsap.set(topDivider, { scaleX: 0, transformOrigin: 'left' })
    gsap.set([sectionLabel, countLabel], { opacity: 0, y: 15 })
    
    tl.to([sectionLabel, countLabel], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(topDivider, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, "-=0.6")

    rows.forEach((row, index) => {
      const titleInner = row.querySelectorAll('.title-inner')
      const divider = row.querySelector('.row-divider')
      const fadeElements = row.querySelectorAll('.fade-el')
      const imgMobile = row.querySelector('.img-mobile')

      gsap.set(titleInner, { yPercent: 105 })
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left' })
      gsap.set(fadeElements, { opacity: 0, y: 15 })
      if(imgMobile) gsap.set(imgMobile, { opacity: 0, y: 20 })

      const rowTl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          once: true
        }
      })

      rowTl.to(divider, { scaleX: 1, duration: 1.2, ease: 'power3.out' })
           .to(titleInner, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05 }, "-=0.9")
           .to(fadeElements, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.7")
      
      if(imgMobile) {
        rowTl.to(imgMobile, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.9")
      }
    })

    // CURSOR FOLLOWER LOGIC (Desktop Only)
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop || !cursorRef.current) return

    }, container)

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3.out" })
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of preview width/height (360x270 -> 180, 135)
      xTo(e.clientX - 180)
      yTo(e.clientY - 135)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ctx.revert()
    }
  }, [])

  // Handle active state animation for cursor preview
  useEffect(() => {
    if (!cursorRef.current) return
    if (activeProject !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(cursorRef.current, { scale: 0.95, opacity: 0, duration: 0.3, ease: 'power3.in' })
    }
  }, [activeProject])

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-[#f5f5f3] text-[#1c1d20] flex flex-col  pb-32 z-20">
      
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw]">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <span className="section-label text-[#1c1d20]/60 text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em]">
            SELECTED WORK
          </span>
          <span className="count-label text-[#1c1d20]/60 text-[12px] md:text-[14px] font-snellenberg">
            (04)
          </span>
        </div>

        <div className="top-divider w-full h-[1px] bg-[rgba(28,29,32,0.20)] will-change-transform" />

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <Link 
              key={project.id}
              href={project.href}
              className="project-row group block w-full relative cursor-pointer"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              
              {/* --- DESKTOP VIEW --- */}
              <div className="hidden md:flex items-center justify-between py-[45px] lg:py-[55px]">
                <span className="fade-el text-[#1c1d20] text-[0.85rem] font-mono w-[60px] lg:w-[80px] group-hover:opacity-50 transition-opacity duration-500">
                  {project.id}
                </span>
                
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-snellenberg text-[clamp(3rem,5vw,5.5rem)] text-[#1c1d20] leading-none tracking-[-0.04em] font-normal group-hover:translate-x-[20px] transition-transform duration-500 ease-out will-change-transform inline-block">
                    <span className="title-inner inline-block overflow-hidden pb-1">{project.title}</span>
                  </h3>
                </div>
                
                <span className="fade-el text-[#1c1d20] text-[0.95rem] font-snellenberg w-[280px] text-right group-hover:-translate-x-[5px] transition-transform duration-500 ease-out">
                  {project.meta}
                </span>
              </div>

              {/* --- MOBILE VIEW --- */}
              <div className="md:hidden flex flex-col py-[40px]">
                <span className="fade-el text-[#1c1d20]/70 text-[0.8rem] font-mono mb-[16px]">{project.id}</span>
                
                <div className="img-mobile w-full relative rounded-[4px] overflow-hidden bg-[#e0e0de] mb-[24px]" style={{ aspectRatio: '4/3' }}>
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                
                <div className="overflow-hidden mb-[8px]">
                  <h3 className="title-inner font-snellenberg text-[clamp(2.4rem,11vw,3.6rem)] text-[#1c1d20] leading-[1] tracking-[-0.02em] font-normal will-change-transform">
                    {project.title}
                  </h3>
                </div>
                
                <span className="fade-el text-[#1c1d20]/80 text-[0.95rem] font-snellenberg mb-[16px]">
                  {project.meta}
                </span>
                
                <div className="fade-el flex items-center gap-[6px] text-[#1c1d20] text-[0.85rem] font-mono uppercase tracking-wider">
                  <span>View project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Row Bottom Divider */}
              <div className="row-divider w-full h-[1px] bg-[rgba(28,29,32,0.20)] will-change-transform" />
            </Link>
          ))}
        </div>

        {/* More Work CTA */}
        <div className="w-full flex justify-end mt-[60px] md:mt-[80px]">
          <Magnetic strength={0.2} textStrength={0.1}>
            <Link 
              href="#projects"
              className="group relative flex items-center justify-center bg-[#1c1d20] text-[#f5f5f3] rounded-full hover:bg-[#2c2d30] transition-colors duration-300 shadow-xl"
              style={{ width: 'clamp(120px, 12vw, 160px)', aspectRatio: '1/1' }}
            >
              <span className="font-snellenberg font-medium text-[14px] md:text-[16px] tracking-wide relative z-10 transition-transform duration-300 group-hover:scale-110">
                View projects
              </span>
            </Link>
          </Magnetic>
        </div>

      </div>

      {/* Custom Cursor Image Preview Container (Desktop Only) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[360px] h-[270px] pointer-events-none z-[100] hidden md:block opacity-0 scale-95 origin-center"
      >
        <div className="w-full h-full relative overflow-hidden bg-[#e0e0de]">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`absolute inset-0 transition-all duration-400 ease-out will-change-transform ${activeProject === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="360px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Floating View Text inside cursor */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference z-20">
            <div className="text-white font-snellenberg text-[1.1rem] font-medium tracking-[0.05em]">VIEW</div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default ProjectsSection
