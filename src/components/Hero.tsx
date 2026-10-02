'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { GlobeCanvas } from '@/components/ui/GlobeCanvas'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const scrollLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current;
    const tl = gsap.timeline({ delay: 1.5 }) 
    
    gsap.set(nameRef.current?.children || [], { y: '101%' })
    gsap.set(photoRef.current, { opacity: 0, scale: 0.95, y: 50 })
    gsap.set([roleRef.current, descRef.current], { opacity: 0, y: 20 })
    gsap.set(locationRef.current, { opacity: 0, x: -20 })
    gsap.set(scrollIndicatorRef.current, { opacity: 0 })

    tl.to(nameRef.current?.children || [], {
      y: '0%',
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
    })
    .to(photoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, "-=0.8")
    .to([roleRef.current, descRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    }, "-=0.8")
    .to(locationRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, "-=0.6")
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, "-=0.2")

    // Scroll line continuous animation
    gsap.to(scrollLineRef.current, {
      scaleX: 0,
      transformOrigin: 'right',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    if (photoRef.current && heroRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(photoRef.current, {
          y: 150,
          ease: 'none',
        })
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
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center bg-primary px-6 md:px-12 pt-32 pb-12"
    >
      <div 
        aria-hidden="true" 
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" 
      />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10 relative">
        <div className="md:col-span-7 flex flex-col justify-center z-20">
          <h1 ref={nameRef} className="text-[12vw] md:text-[7vw] leading-[0.85] font-snellenberg text-white font-medium tracking-tighter uppercase mb-8">
            <span className="overflow-hidden block"><span className="block will-change-transform">CRIS JOHN</span></span>
            <span className="overflow-hidden block"><span className="block will-change-transform">LABIAGA</span></span>
          </h1>

          <div className="flex flex-col gap-6 max-w-xl">
            <div ref={roleRef} className="text-xl md:text-2xl text-white font-medium font-snellenberg">
              Full Stack AI Software Developer
            </div>
            <p ref={descRef} className="text-base md:text-lg text-secondary leading-relaxed font-snellenberg">
              I build resilient full-stack systems across frontend, backend, databases, and APIs—and integrate AI workflows where they deliver real product value.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 relative flex flex-col items-center justify-center mt-12 md:mt-0 z-10">
          <div ref={photoRef} className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] will-change-transform">
            <div className="absolute inset-0 bg-surface rounded-xl border border-default -z-10 shadow-2xl"></div>
            <Image
              src="/profile-cutout.png"
              alt="Cris John Labiaga"
              fill
              priority
              sizes="(max-width: 768px) 280px, 360px"
              className="object-contain object-bottom drop-shadow-xl"
            />
            
            <div 
              ref={locationRef}
              className="absolute -bottom-6 -left-8 md:-left-12 flex items-center gap-4 bg-surface/90 backdrop-blur-md border border-default rounded-full py-2 pl-6 pr-2 shadow-xl"
            >
              <div className="flex flex-col text-xs font-medium leading-tight text-primary font-snellenberg uppercase tracking-widest">
                <span>Located in</span>
                <span className="text-secondary">Philippines</span>
              </div>
              <div className="w-12 h-12">
                <GlobeCanvas />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-6 md:left-12 flex items-center gap-4 opacity-0">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">Scroll</span>
        <div className="w-12 h-[1px] bg-white/20 overflow-hidden">
          <div ref={scrollLineRef} className="w-full h-full bg-primary-foreground bg-white origin-left" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
