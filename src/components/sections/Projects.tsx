'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: '01',
    title: 'VELDRA',
    role: 'Full Stack AI Software Developer',
    image: '/veldra_preview.png',
    href: '/work/veldra',
  },
  {
    id: '02',
    title: 'STUDFLOW',
    role: 'Full Stack AI Developer',
    image: '/studflow_preview.png',
    href: '/work/studflow',
  },
  {
    id: '03',
    title: 'CHoDaMS WEB',
    role: 'Full Stack Developer',
    image: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png',
    href: '/work/chodams-web',
  },
  {
    id: '04',
    title: 'CHoDaMS MOBILE',
    role: 'Mobile Developer',
    image: '/images/projects/chodams-mobile/cover-dashboard-gps.png',
    href: '/work/chodams-mobile',
  },
]

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorImageRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current;
    // Scroll reveal for rows
    if (containerRef.current) {
      const rows = containerRef.current.querySelectorAll('.project-row')
      rows.forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              once: true
            }
          }
        )
      })
    }

    // Cursor Follower Logic (Desktop Only)
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop || !cursorRef.current || !cursorImageRef.current) return

    // GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" })
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" })
    
    // Animate image inside container for parallax
    const imgXTo = gsap.quickTo(cursorImageRef.current, "x", { duration: 0.6, ease: "power3" })
    const imgYTo = gsap.quickTo(cursorImageRef.current, "y", { duration: 0.6, ease: "power3" })

    const isHovering = false

    const handleMouseMove = (e: MouseEvent) => {
      // Center the cursor container on the mouse pointer
      xTo(e.clientX)
      yTo(e.clientY)
      
      if (isHovering) {
        // Calculate movement relative to center of screen for opposite parallax
        const xPos = (e.clientX / window.innerWidth - 0.5) * 40
        const yPos = (e.clientY / window.innerHeight - 0.5) * 40
        imgXTo(-xPos)
        imgYTo(-yPos)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(t => t.trigger && container?.contains(t.trigger as Node) && t.kill())
    }
  }, [])

  // Handle active state animation
  useEffect(() => {
    if (!cursorRef.current) return
    if (activeProject !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(cursorRef.current, { scale: 0.5, opacity: 0, duration: 0.4, ease: 'power3.in' })
    }
  }, [activeProject])

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-primary flex flex-col py-32 z-20">
      
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary mb-24 block">Selected Works</span>

        <div className="flex flex-col border-t border-default">
          {projects.map((project, index) => (
            <Link 
              key={project.id}
              href={project.href}
              className="project-row group relative block w-full py-12 md:py-16 border-b border-default hover:border-white transition-colors duration-300"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                <div className="flex items-start md:items-center gap-6 md:gap-12">
                  <span className="text-sm md:text-base font-mono text-secondary group-hover:text-white transition-colors">{project.id}</span>
                  <h3 className="text-4xl md:text-6xl lg:text-[5vw] font-snellenberg font-medium text-white tracking-tighter uppercase leading-none group-hover:pl-4 transition-all duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-8 justify-between w-full md:w-auto mt-4 md:mt-0">
                  <span className="text-sm md:text-base font-mono text-secondary group-hover:text-white transition-colors">
                    {project.role}
                  </span>
                  
                  {/* Arrow hidden on mobile, scales in on hover for desktop */}
                  <div className="hidden md:flex w-12 h-12 rounded-full border border-white/20 items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white text-black">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Mobile Image Fallback (Hidden on Desktop) */}
              <div className="md:hidden mt-8 relative w-full h-[60vw] overflow-hidden rounded-md border border-default">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom Cursor Image Preview Container (Desktop Only) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-[100] overflow-hidden rounded-xl bg-surface border border-white/10 hidden md:block opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 shadow-2xl"
      >
        <div ref={cursorImageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`absolute inset-0 transition-opacity duration-300 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="400px"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
        {/* Floating View Text inside cursor */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
          <div className="text-white font-snellenberg text-xl font-medium tracking-wide">VIEW</div>
        </div>
      </div>

    </section>
  )
}

export default ProjectsSection
