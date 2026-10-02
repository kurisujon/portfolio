'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { Magnetic } from '@/components/ui/MagneticButton'

export function ContactSection() {
  const [time, setTime] = useState<string>('')
  const svgPathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
    if (!containerRef.current || !svgPathRef.current || !contentRef.current) return
    const container = containerRef.current

    // The footer is pinned at the bottom in page.tsx, creating a "curtain reveal" natively via CSS (sticky bottom).
    // We just animate the SVG curve on top of it.
    
    // Instead of a complex scroll path, we just animate the SVG as the footer enters the viewport.
    gsap.fromTo(svgPathRef.current,
      { attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0' } },
      {
        attr: { d: 'M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0' },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      }
    )
    
    // Text parallax
    gsap.fromTo(contentRef.current,
      { y: -100 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger === container && t.kill())
    }
  }, [])

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="w-full min-h-screen flex flex-col justify-between py-12 md:py-16 relative bg-primary text-white overflow-hidden"
    >
      <svg 
        className="absolute top-0 left-0 w-full h-[15vh] -translate-y-full rotate-180"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <path 
          ref={svgPathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0"
          fill="#0a0a0a"
          stroke="none"
        />
      </svg>

      <div ref={contentRef} className="flex flex-col gap-12 w-full h-full flex-grow pt-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 w-full pb-16 border-b border-default">
          <div className="flex flex-col max-w-4xl">
            <span className="text-sm font-mono uppercase tracking-[0.2em] text-secondary mb-8 block">What&apos;s next?</span>
            <h2 className="text-[12vw] sm:text-[10vw] md:text-[7vw] leading-[0.9] tracking-tighter font-snellenberg font-medium text-white uppercase select-none">
              Let&apos;s build<br />something useful.
            </h2>
          </div>

          <div className="self-start md:self-end shrink-0 cursor-open">
            <Magnetic strength={0.4} textStrength={0.2}>
              <a
                href="mailto:johncrislabiaga@gmail.com"
                className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center text-primary text-lg md:text-2xl font-snellenberg font-medium cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 mt-auto">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-secondary uppercase font-mono tracking-widest">Version</span>
            <span className="text-base text-white font-snellenberg">2026 © Edition</span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs text-secondary uppercase font-mono tracking-widest">Local Time</span>
            <span className="text-base text-white font-snellenberg">
              {time ? `${time} GMT+8` : '00:00 GMT+8'}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs text-secondary uppercase font-mono tracking-widest">Socials</span>
            <div className="flex items-center gap-8 text-base text-white font-snellenberg">
              <Magnetic>
                <a href="https://linkedin.com/in/webcris" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors cursor-open">
                  LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://github.com/webcris-dev" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors cursor-open">
                  GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:johncrislabiaga@gmail.com" className="hover:text-secondary transition-colors cursor-open">
                  Email
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
