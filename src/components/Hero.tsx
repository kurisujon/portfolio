'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { GlobeCanvas } from '@/components/ui/GlobeCanvas'
import { useLenis } from 'lenis/react'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  
  const lenis = useLenis()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = href === '#contact' ? 'bottom' : href
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      if (href === '#contact') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    if (window.history?.pushState) window.history.pushState(null, '', href)
  }

  useEffect(() => {
    const hero = heroRef.current;
    const tl = gsap.timeline({ delay: 1.5 }) 
    
    gsap.set(photoRef.current, { opacity: 0, scale: 1.04, y: 80 })
    gsap.set(nameRef.current, { yPercent: 110 })
    gsap.set(locationRef.current, { xPercent: -110 })
    gsap.set(roleRef.current, { opacity: 0, y: 35 })
    gsap.set(headerRef.current, { opacity: 0, y: -10 })

    tl.to(photoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.3,
      ease: 'expo.out',
    })
    .to(nameRef.current, {
      yPercent: 0,
      duration: 1.3,
      ease: 'power4.out',
    }, "-=0.9")
    .to(locationRef.current, {
      xPercent: 0,
      duration: 1.2,
      ease: 'power4.out',
    }, "-=1.1")
    .to(roleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, "-=1.0")
    .to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, "-=1.0")

    if (heroRef.current && photoRef.current && nameRef.current && roleRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.timeline()
          .to(photoRef.current, { yPercent: 6, ease: 'none' }, 0)
          .to(nameRef.current, { xPercent: -3, ease: 'none' }, 0)
          .to(roleRef.current, { yPercent: 15, ease: 'none' }, 0)
      })
    }

    return () => { 
      tl.kill() 
      ScrollTrigger.getAll().forEach(t => t.trigger === hero && t.kill())
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] h-[100svh] w-full overflow-hidden bg-[#9fa3a2]"
    >
      {/* Header — highest z-index, always readable */}
      <div 
        ref={headerRef} 
        className="absolute top-[40px] md:top-[48px] left-[24px] md:left-[56px] right-[24px] md:right-[56px] flex justify-between z-50 text-[#f5f5f3] text-[16px] md:text-[18px] font-snellenberg font-medium mix-blend-difference"
      >
        <div>© Code by Cris</div>
        <div className="hidden md:flex gap-[48px]">
          <Link href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:opacity-70 transition-opacity cursor-pointer">Work</Link>
          <Link href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:opacity-70 transition-opacity cursor-pointer">About</Link>
          <Link href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:opacity-70 transition-opacity cursor-pointer">Contact</Link>
        </div>
      </div>

      {/* Portrait — center anchor */}
      <div 
        ref={photoRef} 
        className="absolute left-1/2 -translate-x-1/2 top-[22vh] md:top-[8vh] h-[40vh] md:h-[85vh] w-[65vw] md:w-[40vw] lg:w-[32vw] z-30 will-change-transform pointer-events-none"
      >
        <Image
          src="/profile-cutout.png"
          alt="Cris John Labiaga"
          fill
          priority
          sizes="(max-width: 768px) 65vw, (max-width: 1024px) 40vw, 32vw"
          className="object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      {/* Location pill — left side */}
      <div 
        ref={locationRef}
        className="absolute left-0 top-[58%] md:top-[42%] -translate-y-1/2 z-35 flex items-center bg-[#1c1d20] rounded-r-[999px] w-[200px] md:w-[310px] h-[75px] md:h-[120px] pl-[16px] md:pl-[36px] pr-[8px] md:pr-[20px] justify-between shadow-2xl"
      >
        <div className="flex flex-col text-[11px] md:text-[16px] font-snellenberg text-[#f5f5f3] leading-[1.3] tracking-wide whitespace-nowrap">
          <span>Located</span>
          <span>in the</span>
          <span>Philippines</span>
        </div>
        <div className="w-[48px] h-[48px] md:w-[80px] md:h-[80px] rounded-full bg-[#aeb1b0] flex items-center justify-center overflow-hidden relative flex-shrink-0">
           <GlobeCanvas />
        </div>
      </div>

      {/* Role block — right side */}
      <div 
        ref={roleRef}
        className="absolute right-[20px] md:right-[56px] lg:right-[74px] top-[32%] md:top-[38%] z-35 flex flex-col items-end md:items-start text-right md:text-left"
      >
        <svg className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] text-[#f5f5f3] mb-[6px] md:mb-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 7L17 17M17 17V7M17 17H7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="text-[16px] md:text-[28px] lg:text-[32px] font-snellenberg text-[#f5f5f3] font-normal leading-[1.15] tracking-tight">
          <span>Full Stack AI</span><br/>
          <span>Software Developer</span>
        </div>
      </div>

      {/* Massive name — bottom, overlaps portrait */}
      <div className="absolute bottom-[3%] md:bottom-[-0.03em] left-0 md:left-[-4vw] w-full md:w-[110vw] z-40 overflow-hidden pointer-events-none px-[16px] md:px-0 flex items-end">
        <h1 
          ref={nameRef}
          className="font-snellenberg text-[#f5f5f3] font-normal tracking-[-0.055em] will-change-transform leading-[0.88] md:whitespace-nowrap flex flex-col md:block"
          style={{ fontSize: 'clamp(3.8rem, 17vw, 20rem)' }}
        >
          <span className="block md:inline">Cris John</span>
          <span className="block md:inline"> Labiaga —</span>
        </h1>
      </div>
    </section>
  )
}

export default HeroSection
