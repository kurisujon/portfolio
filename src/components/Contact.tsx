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
      className="w-full min-h-[100svh] flex flex-col justify-between pt-12 md:pt-16 pb-[30px] md:pb-[10px] relative bg-[#1c1d20] text-[#f5f5f3] overflow-hidden"
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

      <div className="flex flex-col w-full h-full flex-grow relative z-10">

        {/* Main Content Inner Container - True 68vw */}
        <div className="w-[88vw] md:w-[68vw] max-w-[1120px] mx-auto pt-[10vh] md:pt-[12vh]">

          {/* Headline */}
          <div className="flex flex-col w-full relative">
            <h2
              className="font-snellenberg font-normal tracking-[-0.04em] leading-[1.0] select-none"
              style={{ fontSize: 'clamp(4.2rem, 5.5vw, 5.8rem)' }}
            >
              <div className="overflow-hidden w-full pt-4">
                <div className="line-reveal flex items-center will-change-transform">
                  <div className="w-[60px] h-[60px] md:w-[84px] md:h-[84px] rounded-full shrink-0 mr-6 md:mr-[32px] overflow-hidden relative bg-[#1c1d20]">
                    <Image src="/profile.png" alt="Cris John Labiaga" fill className="object-cover" style={{ transform: 'scale(1.8) translateY(15%)', objectPosition: 'center' }} sizes="(max-width: 768px) 60px, 84px" />
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

            {/* Top right arrow icon (pointing down-left ↙) moved down slightly */}
            <div className="absolute top-[65%] right-[0%] hidden md:block">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[180deg]">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#f5f5f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Divider and Blue Circle - Gap increased by ~40px */}
          <div className="relative w-full mt-[50px] md:mt-[100px]">
            <div className="divider-line w-full h-[1px] bg-[rgba(245,245,243,0.18)] will-change-transform" />

            {/* CTA Exact Center at 82% */}
            <div className="cta-wrapper absolute left-[82%] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 will-change-transform">
              <Magnetic strength={0.2} textStrength={0.1}>
                <a
                  href="mailto:johncrislabiaga@gmail.com"
                  className="group relative flex items-center justify-center bg-[#455ce9] text-white rounded-full hover:bg-[#3448c5] transition-colors duration-300"
                  style={{ width: 'clamp(140px, 14vw, 170px)', aspectRatio: '1/1' }}
                >
                  <span className="font-snellenberg font-normal text-[16px] md:text-[18px] tracking-wide transition-transform duration-300 group-hover:scale-105">
                    Get in touch
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Contact Pills - Gap increased by ~35px */}
          <div className="contact-row flex flex-col md:flex-row gap-4 mt-[50px] md:mt-[130px] will-change-transform">
            <a
              href="mailto:johncrislabiaga@gmail.com"
              className="flex items-center justify-center px-6 md:px-8 rounded-full border border-[rgba(245,245,243,0.3)] hover:bg-white hover:text-[#1c1d20] transition-colors duration-300 font-snellenberg text-[16px] md:text-[18px] w-fit min-h-[76px] md:w-[310px]"
            >
              johncrislabiaga@gmail.com
            </a>
            <a
              href="tel:+639123456789"
              className="flex items-center justify-center px-6 md:px-8 rounded-full border border-[rgba(245,245,243,0.3)] hover:bg-white hover:text-[#1c1d20] transition-colors duration-300 font-snellenberg text-[16px] md:text-[18px] w-fit min-h-[76px] md:w-[245px]"
            >
              +63 912 345 6789
            </a>
          </div>

        </div>

        {/* Lower Footer Meta - shifted left and down slightly */}
        <div className="meta-row w-full flex flex-col md:flex-row justify-between items-start md:items-end mt-auto pt-[60px] md:pt-[80px] px-[24px] md:px-[clamp(32px,4vw,50px)] will-change-transform pb-[20px] md:pb-[10px]">

          <div className="flex flex-col md:flex-row gap-10 md:gap-[30px]">
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

          <div className="flex flex-col gap-2 mt-10 md:mt-0 md:w-[300px]">
            <span className="text-[11px] md:text-[12px] text-[rgba(245,245,243,0.55)] uppercase font-mono tracking-widest">Socials</span>
            <div className="flex gap-6 md:gap-8 text-[14px] md:text-[16px] font-snellenberg">
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
