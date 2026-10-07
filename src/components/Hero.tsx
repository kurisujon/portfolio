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
  const nameContainerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
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
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }) 
      
      gsap.set(photoRef.current, { opacity: 0, scale: 1.04, y: 80 })
      gsap.set(nameContainerRef.current, { yPercent: 110 })
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
      .to(nameContainerRef.current, {
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

      // Marquee animation
      const marquee = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
      
      // Initialize marquee to LTR default
      marquee.totalTime(10)
      marquee.timeScale(-1)

      // Update marquee timeScale based on scroll direction
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          // self.direction: 1 = scrolling down (RTL), -1 = scrolling up (LTR)
          const targetTimeScale = self.direction === 1 ? 1 : -1
          gsap.to(marquee, { 
            timeScale: targetTimeScale, 
            duration: 0.5, 
            overwrite: true 
          })
        }
      })

      // Hero parallax
      if (heroRef.current && photoRef.current && nameContainerRef.current && roleRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          animation: gsap.timeline()
            .to(photoRef.current, { yPercent: 6, ease: 'none' }, 0)
            .to(nameContainerRef.current, { xPercent: -3, ease: 'none' }, 0)
            .to(roleRef.current, { yPercent: 15, ease: 'none' }, 0)
        })
      }

    }, hero)

    return () => ctx.revert()
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

      {/* Portrait — center anchor, significantly larger */}
      <div 
        ref={photoRef} 
        className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[80vh] md:h-[110vh] w-[130vw] md:w-[95vw] lg:w-[85vw] z-30 will-change-transform pointer-events-none"
      >
        <Image
          src="/profile-cutout.png"
          alt="Cris John Labiaga"
          fill
          priority
          sizes="(max-width: 768px) 130vw, (max-width: 1024px) 95vw, 85vw"
          className="object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      {/* Location pill — left side */}
      <div 
        ref={locationRef}
        className="absolute left-0 top-[58%] md:top-[55%] -translate-y-1/2 z-35 flex items-center bg-[#1c1d20] rounded-r-[999px] w-[180px] md:w-[260px] h-[75px] md:h-[120px] pl-[16px] md:pl-[30px] pr-[8px] md:pr-[12px] justify-between shadow-2xl"
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

      {/* Massive name marquee — positioned higher, overlaps portrait */}
      <div className="absolute bottom-[12%] md:bottom-[10%] left-0 w-full z-40 overflow-hidden pointer-events-none flex items-end">
        <div ref={nameContainerRef} className="w-full will-change-transform">
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap will-change-transform">
            {[...Array(4)].map((_, i) => (
              <h1 
                key={i}
                className="font-snellenberg text-[#f5f5f3] font-normal tracking-[-0.055em] leading-[0.88] pr-8"
                style={{ fontSize: 'clamp(3rem, 8vw, 10rem)' }}
              >
                Cris John Labiaga —
              </h1>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
