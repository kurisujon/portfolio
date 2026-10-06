'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'
import Image from 'next/image'
import { Magnetic } from '@/components/ui/MagneticButton'

export function ContactSection() {
  const [time, setTime] = useState<string>('')
  const svgPathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !svgPathRef.current) return
    const container = containerRef.current

    const ctx = gsap.context(() => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(svgPathRef.current, { attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0' } })
      gsap.set('.whats-next, .cta-wrapper, .contact-row, .meta-row', { opacity: 1, y: 0, scale: 1 })
      gsap.set('.line-reveal', { yPercent: 0 })
      gsap.set('.divider-line', { scaleX: 1 })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true
      }
    })

    // Initial states
    gsap.set(svgPathRef.current, { attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0' } })
    
    gsap.set('.line-reveal', { yPercent: 110 })
    gsap.set('.cta-wrapper', { scale: 0.75, opacity: 0, y: 30 })
    gsap.set('.divider-line', { scaleX: 0, transformOrigin: 'left' })
    gsap.set('.contact-row, .meta-row', { opacity: 0, y: 15 })

    // Orchestrated sequence
    tl.to(svgPathRef.current, {
        attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0' },
        duration: 1.2,
        ease: 'power4.inOut'
      })
      
      .to('.line-reveal', { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, "-=0.6")
      .to('.cta-wrapper', { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, "-=0.8")
      .to('.divider-line', { scaleX: 1, duration: 1.2, ease: 'power3.out' }, "-=0.8")
      .to('.contact-row', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.8")
      .to('.meta-row', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")

    }, container)

    return () => ctx.revert()
  }, [])

  return (
        <footer 
      id="contact"
      ref={containerRef}
      className="w-full min-h-[90svh] flex flex-col justify-between pt-12 md:pt-24 pb-[100px] md:pb-12 relative bg-[#1c1d20] text-[#f5f5f3] overflow-hidden"
    >
      {/* Light-to-Dark Transition Curve */}
      <svg 
        className="absolute top-0 left-0 w-full h-[12vh] md:h-[15vh] -translate-y-[99%] rotate-180 pointer-events-none"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <path 
          ref={svgPathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0"
          fill="#1c1d20"
          stroke="none"
        />
      </svg>

      <div className="flex flex-col w-full h-full flex-grow pt-[5vh] md:pt-[10vh] px-[24px] md:px-[10vw] max-w-[1600px] mx-auto z-10 relative">
        
        {/* Upper Section */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full relative">
          
          {/* Main Heading */}
          <div className="flex flex-col w-full">
            <h2 
              className="font-snellenberg font-normal tracking-[-0.04em] leading-[1.1] select-none" 
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              <div className="overflow-hidden w-full pt-4">
                <div className="line-reveal flex items-center will-change-transform">
                  <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full shrink-0 mr-4 md:mr-6 overflow-hidden relative shadow-lg">
                    <Image src="/profile.png" alt="Cris John Labiaga" fill className="object-cover" sizes="(max-width: 768px) 60px, 100px" />
                  </div>
                  Let's work
                </div>
              </div>
              <div className="overflow-hidden w-full">
                <div className="line-reveal inline-block will-change-transform pb-2">
                  together
                </div>
              </div>
            </h2>
          </div>

          {/* Top right arrow icon */}
          <div className="absolute top-[10%] right-0 hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#f5f5f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Divider and Blue Circle */}
        <div className="relative w-full mt-[40px] md:mt-[80px]">
          <div className="divider-line w-full h-[1px] bg-[rgba(245,245,243,0.18)] will-change-transform" />
          
          <div className="cta-wrapper absolute right-[5%] md:right-[15%] top-1/2 -translate-y-1/2 z-20 will-change-transform">
            <Magnetic strength={0.2} textStrength={0.1}>
              <a
                href="mailto:johncrislabiaga@gmail.com"
                className="group relative flex items-center justify-center bg-[#455ce9] text-white rounded-full hover:bg-[#3448c5] transition-colors duration-300"
                style={{ width: 'clamp(140px, 14vw, 180px)', aspectRatio: '1/1' }}
              >
                <span className="font-snellenberg font-normal text-[16px] md:text-[18px] tracking-wide transition-transform duration-300 group-hover:scale-105">
                  Get in touch
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Contact Pills */}
        <div className="contact-row flex flex-col md:flex-row gap-4 mt-[40px] md:mt-[60px] will-change-transform">
          <a 
            href="mailto:johncrislabiaga@gmail.com" 
            className="px-6 py-4 rounded-full border border-[rgba(245,245,243,0.3)] hover:bg-white hover:text-[#1c1d20] transition-colors duration-300 font-snellenberg text-[16px] md:text-[18px] w-fit"
          >
            johncrislabiaga@gmail.com
          </a>
          <a 
            href="tel:+639123456789" 
            className="px-6 py-4 rounded-full border border-[rgba(245,245,243,0.3)] hover:bg-white hover:text-[#1c1d20] transition-colors duration-300 font-snellenberg text-[16px] md:text-[18px] w-fit"
          >
            +63 912 345 6789
          </a>
        </div>

        {/* Lower Footer Meta */}
        <div className="meta-row w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-6 mt-auto pt-[40px] md:pt-[60px] will-change-transform">
          
          <div className="flex gap-[10vw] md:gap-[15vw]">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Version</span>
              <span className="text-[14px] md:text-[16px] font-snellenberg">2026 © Edition</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Local Time</span>
              <span className="text-[14px] md:text-[16px] font-snellenberg">
                {time ? `${time} GMT+8` : '00:00 GMT+8'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest hidden md:block">Socials</span>
            <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 text-[14px] md:text-[16px] font-snellenberg">
              <a href="https://linkedin.com/in/webcris" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-[2px] transition-transform duration-300 relative group block">
                LinkedIn
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
              <a href="https://github.com/webcris-dev" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-[2px] transition-transform duration-300 relative group block">
                GitHub
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default ContactSection
