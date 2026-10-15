'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { Magnetic } from '@/components/ui/MagneticButton'

const projects = [
  {
    id: '01',
    title: 'Veldra',
    meta: 'Full Stack AI Software Developer',
    image: '/veldra_preview.png',
    href: '/work/veldra',
    backdrop: ['#472928', '#371b1a'],
    width: 1920,
    height: 1080,
  },
  {
    id: '02',
    title: 'StudFlow',
    meta: 'Full Stack AI Developer',
    image: '/studflow_preview.webp',
    href: '/work/studflow',
    backdrop: ['#2c314a', '#1e223a'],
    width: 1920,
    height: 1080,
  },
  {
    id: '03',
    title: 'CHoDaMS Web',
    meta: 'Full Stack Developer',
    image: '/images/projects/chodams-web/chodams-portfolio-cover-v2.webp',
    href: '/work/chodams-web',
    backdrop: ['#1b3a2c', '#0b2b1e'],
    width: 1672,
    height: 941,
  },
  {
    id: '04',
    title: 'CHoDaMS Mobile',
    meta: 'Mobile Developer',
    image: '/images/projects/chodams-mobile/cover-dashboard-gps.webp',
    href: '/work/chodams-mobile',
    backdrop: ['#1e3a29', '#0f2a1b'],
    width: 1672,
    height: 941,
  },
]

const scaleAnimation = (isReduced: boolean) => ({
  initial: { scale: 0 },
  enter: {
    scale: 1,
    transition: {
      duration: isReduced ? 0 : 0.45,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  closed: {
    scale: 0,
    transition: {
      duration: isReduced ? 0 : 0.45,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
})

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canHover, setCanHover] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const xToBoxRef = useRef<((value: number) => void) | null>(null)
  const yToBoxRef = useRef<((value: number) => void) | null>(null)
  const xToCircleRef = useRef<((value: number) => void) | null>(null)
  const yToCircleRef = useRef<((value: number) => void) | null>(null)
  const isVisibleRef = useRef<boolean>(false)

  // Media query detection and GSAP follower setup
  useEffect(() => {
    const hoverMql = window.matchMedia('(any-hover: hover)')
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')

    setCanHover(hoverMql.matches)
    setIsReducedMotion(motionMql.matches)

    const handleHoverChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)

    hoverMql.addEventListener('change', handleHoverChange)
    motionMql.addEventListener('change', handleMotionChange)

    if (!hoverMql.matches || !boxRef.current || !circleRef.current) {
      return () => {
        hoverMql.removeEventListener('change', handleHoverChange)
        motionMql.removeEventListener('change', handleMotionChange)
      }
    }

    const isReduced = motionMql.matches

    // Center both preview box and view circle on the cursor
    gsap.set(boxRef.current, { xPercent: -50, yPercent: -50 })
    gsap.set(circleRef.current, { xPercent: -50, yPercent: -50 })

    xToBoxRef.current = gsap.quickTo(boxRef.current, 'x', {
      duration: isReduced ? 0 : 0.8,
      ease: 'power3',
    })
    yToBoxRef.current = gsap.quickTo(boxRef.current, 'y', {
      duration: isReduced ? 0 : 0.8,
      ease: 'power3',
    })
    xToCircleRef.current = gsap.quickTo(circleRef.current, 'x', {
      duration: isReduced ? 0 : 0.5,
      ease: 'power3',
    })
    yToCircleRef.current = gsap.quickTo(circleRef.current, 'y', {
      duration: isReduced ? 0 : 0.5,
      ease: 'power3',
    })

    return () => {
      hoverMql.removeEventListener('change', handleHoverChange)
      motionMql.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Initial scroll reveal for project rows
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.project-row')

      rows.forEach((row) => {
        const titleInner = row.querySelectorAll('.title-inner')
        const divider = row.querySelector('.row-divider')
        const fadeElements = row.querySelectorAll('.fade-el')
        const imgMobile = row.querySelector('.img-mobile')

        gsap.set(titleInner, { yPercent: 105 })
        gsap.set(divider, { scaleX: 0, transformOrigin: 'left' })
        gsap.set(fadeElements, { opacity: 0, y: 15 })
        if (imgMobile) gsap.set(imgMobile, { opacity: 0, y: 20 })

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true,
          },
        })

        rowTl
          .to(divider, { scaleX: 1, duration: 1.2, ease: 'power3.out' })
          .to(titleInner, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05 }, '-=0.9')
          .to(fadeElements, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')

        if (imgMobile) {
          rowTl.to(imgMobile, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.9')
        }
      })

      // Deactivate preview follower when list is out of view (FIX 3)
      if (listRef.current) {
        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onLeave: () => {
            isVisibleRef.current = false
            setActive(false)
          },
          onLeaveBack: () => {
            isVisibleRef.current = false
            setActive(false)
          },
        })
      }
    }, container)

    return () => ctx.revert()
  }, [])

  // Smooth position updater with instant snap when switching from hidden to visible
  const updatePosition = (clientX: number, clientY: number) => {
    if (!xToBoxRef.current || !yToBoxRef.current || !xToCircleRef.current || !yToCircleRef.current) return

    if (!isVisibleRef.current) {
      isVisibleRef.current = true
      if (boxRef.current && circleRef.current) {
        gsap.set(boxRef.current, { x: clientX, y: clientY })
        gsap.set(circleRef.current, { x: clientX, y: clientY })
      }
    }

    xToBoxRef.current(clientX)
    yToBoxRef.current(clientY)
    xToCircleRef.current(clientX)
    yToCircleRef.current(clientY)
  }

  const handleListPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover) return
    updatePosition(e.clientX, e.clientY)
  }

  const handleRowPointerEnter = (e: React.PointerEvent<HTMLAnchorElement>, index: number) => {
    if (!canHover) return
    updatePosition(e.clientX, e.clientY)
    setActiveIndex(index)
    setActive(true)
  }

  const handleListPointerLeave = () => {
    if (!canHover) return
    isVisibleRef.current = false
    setActive(false)
  }

  const handleRowFocus = (e: React.FocusEvent<HTMLAnchorElement>, index: number) => {
    if (!canHover) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    updatePosition(x, y)
    setActiveIndex(index)
    setActive(true)
  }

  const handleRowBlur = () => {
    if (!canHover) return
    isVisibleRef.current = false
    setActive(false)
  }

  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-[#f5f5f3] text-[#1c1d20] flex flex-col pb-32 z-20">
      <div className="w-full max-w-[1440px] mx-auto px-[24px] md:px-[5vw]">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <span className="section-label text-[#5c5d61] text-[12px] md:text-[14px] font-snellenberg uppercase tracking-[0.04em]">
            SELECTED WORK
          </span>
          <span className="count-label text-[#5c5d61] text-[12px] md:text-[14px] font-snellenberg">
            (04)
          </span>
        </div>

        <div className="top-divider w-full h-[1px] bg-[#ebebec]" />

        {/* Project List (Contiguous, hover state on the list) */}
        <div
          ref={listRef}
          className="flex flex-col"
          onPointerMove={handleListPointerMove}
          onPointerLeave={handleListPointerLeave}
        >
          {projects.map((project, index) => {
            const isHovered = active && activeIndex === index

            return (
              <Link
                key={project.id}
                href={project.href}
                className="project-row group block w-full relative cursor-pointer outline-none"
                onPointerEnter={(e) => handleRowPointerEnter(e, index)}
                onFocus={(e) => handleRowFocus(e, index)}
                onBlur={handleRowBlur}
              >
                {/* --- DESKTOP VIEW --- */}
                <div className="hidden md:flex items-center justify-between py-[45px] lg:py-[55px]">
                  <span className="fade-el text-[#1c1d20] text-[0.85rem] font-mono w-[60px] lg:w-[80px]">
                    {project.id}
                  </span>

                  <div className="flex-1 overflow-visible pl-4 -ml-4">
                    <h3
                      className={`font-snellenberg uppercase text-[clamp(3rem,5vw,5.5rem)] text-[#1c1d20] leading-none tracking-[-0.04em] font-normal inline-block transition-all ${
                        isHovered
                          ? 'opacity-[0.33] -translate-x-[12px] lg:-translate-x-[16px]'
                          : 'opacity-100 translate-x-0 group-hover:opacity-[0.33] group-hover:-translate-x-[12px] group-hover:lg:-translate-x-[16px]'
                      }`}
                      style={{
                        transitionDuration: isReducedMotion ? '0s' : '400ms',
                        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                      }}
                    >
                      <span className="overflow-hidden inline-block pb-1">
                        <span className="title-inner inline-block">{project.title}</span>
                      </span>
                    </h3>
                  </div>

                  <span
                    className={`fade-el text-[#1c1d20] text-[0.95rem] font-snellenberg w-[280px] text-right transition-all inline-block ${
                      isHovered
                        ? 'opacity-[0.33] translate-x-[12px] lg:translate-x-[16px]'
                        : 'opacity-100 translate-x-0 group-hover:opacity-[0.33] group-hover:translate-x-[12px] group-hover:lg:translate-x-[16px]'
                    }`}
                    style={{
                      transitionDuration: isReducedMotion ? '0s' : '400ms',
                      transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                    }}
                  >
                    {project.meta}
                  </span>
                </div>

                {/* --- MOBILE VIEW --- */}
                <div className="md:hidden flex flex-col py-[40px]">
                  <span className="fade-el text-[#5c5d61] text-[0.8rem] font-mono mb-[16px]">{project.id}</span>

                  <div className="img-mobile w-full relative rounded-[4px] overflow-hidden bg-[#e0e0de] mb-[24px]" style={{ aspectRatio: '4/3' }}>
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>

                  <div className="overflow-hidden mb-[8px]">
                    <h3 className="title-inner font-snellenberg uppercase text-[clamp(2.4rem,11vw,3.6rem)] text-[#1c1d20] leading-[1] tracking-[-0.02em] font-normal">
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
                <div className="row-divider w-full h-[1px] bg-[#ebebec]" />
              </Link>
            )
          })}
        </div>

        {/* More Work CTA */}
        <div className="w-full flex justify-end mt-[60px] md:mt-[80px]">
          <Magnetic strength={0.2} textStrength={0.1}>
            <Link
              href="/#projects"
              className="group relative overflow-hidden flex items-center justify-center bg-[#1c1d20] text-[#f5f5f3] rounded-full shadow-xl"
              style={{ width: 'clamp(120px, 12vw, 160px)', aspectRatio: '1/1' }}
            >
              <span aria-hidden className="absolute left-[-25%] top-0 w-[150%] h-[150%] bg-[#455ce9] rounded-[50%] translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[-15%] z-0" />
              <span className="font-snellenberg font-medium text-[14px] md:text-[16px] tracking-wide relative z-10 transition-transform duration-300 group-hover:scale-110">
                View projects
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Project Preview Container (Desktop Only, z-[70] stays below fixed header/menu button at z-[100]) */}
      <div
        ref={boxRef}
        className="fixed top-0 left-0 pointer-events-none z-[70] hidden md:block"
        style={{
          width: 'clamp(240px, 27.5vw, 540px)',
          aspectRatio: '1/1',
        }}
      >
        {/* Inner wrapper scaling 0 -> 1 on enter with ease [0.76, 0, 0.24, 1] */}
        <motion.div
          variants={scaleAnimation(isReducedMotion)}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
          className="w-full h-full overflow-hidden relative"
        >
          {/* Scrolling column strip containing all project images */}
          <motion.div
            className="w-full h-full relative flex flex-col"
            animate={{ y: `${-activeIndex * 100}%` }}
            transition={{
              duration: isReducedMotion ? 0 : 0.6,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-full h-full relative flex-shrink-0 flex items-center justify-center p-[9%]"
                style={{
                  background: `linear-gradient(160deg, ${project.backdrop[0]}, ${project.backdrop[1]})`,
                }}
              >
                {/* Frame hugging the screenshot */}
                <div
                  className="relative rounded-md overflow-hidden max-w-full max-h-full"
                  style={{
                    aspectRatio: `${project.width} / ${project.height}`,
                    width: project.width >= project.height ? '100%' : 'auto',
                    height: project.width < project.height ? '100%' : 'auto',
                    boxShadow: '0 22px 44px -14px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.07)',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 1024px) 0px, 540px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* "View" Circle (Desktop Only, z-[75] stays below fixed header/menu button at z-[100]) */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[75] hidden md:block"
      >
        <motion.div
          variants={scaleAnimation(isReducedMotion)}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
          className="w-[105px] h-[105px] rounded-full bg-[#455ce9] text-white font-snellenberg font-medium text-[15px] flex items-center justify-center select-none"
        >
          View
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
