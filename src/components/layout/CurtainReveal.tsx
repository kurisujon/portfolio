'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'
import { CurveEdge } from '@/components/ui/CurveEdge'
import { ContactSection } from '@/components/Contact'

interface CurtainRevealProps {
  children: ReactNode
}

export function CurtainReveal({ children }: CurtainRevealProps) {
  const mainRef = useRef<HTMLElement>(null)
  const curveRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mainRef.current || !curveRef.current || !contentRef.current) return

    const main = mainRef.current
    const curve = curveRef.current
    const content = contentRef.current
    const footer = footerRef.current

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      const st = {
        trigger: main,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      }

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(curve, { scaleY: 1 }, { scaleY: 0.0001, ease: 'none', scrollTrigger: st })
        gsap.set(content, { y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(curve, { scaleY: 1 }, { scaleY: 0.0001, ease: 'none', scrollTrigger: st })
        gsap.fromTo(
          content,
          { y: () => window.innerHeight * 0.7 },
          { y: 0, ease: 'none', scrollTrigger: st }
        )
      })

      // Toggle menu button on-dark border class when crossing into the dark footer
      ScrollTrigger.create({
        trigger: main,
        start: 'bottom 90px',
        toggleClass: { targets: '#menu-btn', className: 'on-dark' },
      })

      // Set footer visibility: hidden until main's bottom is within reach of viewport bottom
      if (footer) {
        gsap.set(footer, { visibility: 'hidden' })
        ScrollTrigger.create({
          trigger: main,
          start: () => `bottom ${window.innerHeight + 250}px`,
          onEnter: () => {
            footer.style.visibility = 'visible'
          },
          onLeaveBack: () => {
            footer.style.visibility = 'hidden'
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative w-full">
      {/* 1. <main> wraps all page content: position: relative; z-index: 1; background: #f5f5f3 */}
      <main
        ref={mainRef}
        className="relative z-[1] w-full bg-[#f5f5f3]"
      >
        {children}
        {/* 2. <CurveEdge ref={curveRef}/> is the LAST child of <main> */}
        <CurveEdge ref={curveRef} />
      </main>

      {/* 3. <div> spacer AFTER <main>: height = footer height (100svh with 100vh fallback) */}
      <div
        className="h-[100vh] h-[100svh] pointer-events-none"
        aria-hidden
      />

      {/* 4. Footer: position: fixed; left/right/bottom: 0; height: 100svh; z-index: 0;
             background: #1c1d20; overflow: hidden; contact content inside ONE wrapper (contentRef) */}
      <footer
        ref={footerRef}
        id="contact"
        className="fixed bottom-0 left-0 right-0 w-full h-[100vh] h-[100svh] z-0 bg-[#1c1d20] text-[#f5f5f3] overflow-hidden"
      >
        <div
          ref={contentRef}
          className="w-full h-[100vh] h-[100svh] will-change-transform"
        >
          <ContactSection />
        </div>
      </footer>
    </div>
  )
}
