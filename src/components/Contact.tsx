'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'
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
    gsap.set('.whats-next', { opacity: 0, y: 20 })
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
      .to('.whats-next', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
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
      className="w-full min-h-[90svh] flex flex-col justify-between py-12 md:py-16 relative bg-[#1c1d20] text-[#f5f5f3] overflow-hidden"
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

      <div className="flex flex-col gap-12 w-full h-full flex-grow pt-[10vh] md:pt-[14vh] px-[24px] md:px-[5vw] max-w-[1440px] mx-auto z-10 relative">
        
        {/* Upper Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0 w-full pb-[40px] md:pb-[80px]">
          
          {/* Main Heading */}
          <div className="flex flex-col w-full md:w-[70%]">
            <span className="whats-next text-[rgba(245,245,243,0.55)] text-[14px] md:text-[16px] font-mono uppercase tracking-[0.1em] mb-[24px] md:mb-[40px] block will-change-transform">
              What's next?
            </span>
            <h2 
              className="font-snellenberg font-normal tracking-[-0.055em] leading-[0.92] uppercase select-none" 
              style={{ fontSize: 'clamp(3.1rem, 11vw, 9rem)' }}
            >
              <span className="overflow-hidden inline-block"><span className="line-reveal inline-block will-change-transform">Let's build</span></span><br />
              <span className="overflow-hidden inline-block"><span className="line-reveal inline-block will-change-transform pb-2">something useful.</span></span>
            </h2>
          </div>

          {/* Magnetic CTA */}
          <div className="cta-wrapper self-end md:self-auto shrink-0 z-20 mt-[10px] md:mt-0 mr-[4vw] md:mr-0 will-change-transform">
            <Magnetic strength={0.2} textStrength={0.1}>
              <a
                href="mailto:johncrislabiaga@gmail.com"
                className="group relative flex items-center justify-center bg-[#f5f5f3] text-[#1c1d20] rounded-full hover:bg-[#e0e0de] transition-colors duration-300 shadow-2xl"
                style={{ width: 'clamp(140px, 14vw, 215px)', aspectRatio: '1/1' }}
              >
                <span className="font-snellenberg font-medium text-[16px] md:text-[18px] tracking-wide transition-transform duration-300 group-hover:scale-105">
                  Get in touch
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="divider-line w-full h-[1px] bg-[rgba(245,245,243,0.18)] will-change-transform" />

        {/* Contact Information */}
        <div className="contact-row flex flex-col md:flex-row gap-12 md:gap-[15vw] pt-[40px] md:pt-[60px] will-change-transform">
          
          <div className="flex flex-col gap-4">
            <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Email</span>
            <a 
              href="mailto:johncrislabiaga@gmail.com" 
              className="text-[18px] md:text-[22px] font-snellenberg hover:-translate-y-[2px] transition-transform duration-300 relative group w-fit block"
            >
              johncrislabiaga@gmail.com
              <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Socials</span>
            <div className="flex flex-col gap-3 text-[18px] md:text-[22px] font-snellenberg">
              <a 
                href="https://linkedin.com/in/webcris" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:-translate-y-[2px] transition-transform duration-300 relative group w-fit block"
              >
                LinkedIn
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
              <a 
                href="https://github.com/webcris-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:-translate-y-[2px] transition-transform duration-300 relative group w-fit block"
              >
                GitHub
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            </div>
          </div>
          
        </div>

        {/* Lower Footer Meta */}
        <div className="meta-row w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-auto pt-[60px] md:pt-[100px] pb-[20px] will-change-transform">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Version</span>
            <span className="text-[14px] md:text-[16px] font-snellenberg">2026 © Edition</span>
          </div>

          <div className="flex flex-col gap-2 md:text-right">
            <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Local Time</span>
            <span className="text-[14px] md:text-[16px] font-snellenberg">
              {time ? `${time} GMT+8` : '00:00 GMT+8'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default ContactSection
