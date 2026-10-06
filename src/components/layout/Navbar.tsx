'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { gsap } from '@/lib/motion'
import { Magnetic } from '@/components/ui/MagneticButton'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const lenis = useLenis()
  
  const overlayRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  
  // Refs for animation sequencing
  const navLabelRef = useRef<HTMLSpanElement>(null)
  const navDividerRef = useRef<HTMLDivElement>(null)
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const socialsLabelRef = useRef<HTMLSpanElement>(null)
  const socialsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
      
      // Determine active item heuristically
      const scrollY = window.scrollY
      const wh = window.innerHeight
      if (scrollY < wh * 0.5) setActiveItem(null)
      else if (scrollY >= document.documentElement.scrollHeight - wh - 100) setActiveItem('#contact')
      else {
        // very basic intersection logic just for active state demonstration
        const sections = navLinks.map(l => ({ id: l.href, el: document.querySelector(l.href) as HTMLElement }))
        let current = null
        for (const sec of sections) {
          if (sec.el && sec.el.offsetTop <= scrollY + wh * 0.3) {
            current = sec.id
          }
        }
        setActiveItem(current)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!overlayRef.current || !svgPathRef.current) return
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      
      const startPath = `M 0 0 L 100 0 L 100 0 Q 50 0 0 0 L 0 0`
      const curvePath = `M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0`
      const flatPath  = `M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0`
      const curvePathReverse = `M 0 100 L 100 100 L 100 0 Q 50 -50 0 0 L 0 100`

      // Ensure elements start hidden when closed
      gsap.set(navLabelRef.current, { opacity: 0, y: 15 })
      gsap.set(navDividerRef.current, { scaleX: 0, transformOrigin: 'left' })
      if (linksContainerRef.current) {
        gsap.set(linksContainerRef.current.children, { opacity: 0, y: 30 })
      }
      gsap.set(socialsLabelRef.current, { opacity: 0, y: 15 })
      if (socialsContainerRef.current) {
        gsap.set(socialsContainerRef.current.children, { opacity: 0, y: 15 })
      }

      if (isActive) {
        gsap.set(overlayRef.current, { pointerEvents: 'auto', display: 'flex' })
        
        tl.to(svgPathRef.current, { attr: { d: curvePath }, duration: 0.4, ease: 'power3.in' })
          .to(svgPathRef.current, { attr: { d: flatPath }, duration: 0.4, ease: 'power3.out' })
        
        // 3. NAVIGATION label appears
        tl.to(navLabelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, "-=0.3")
        // 4. divider expands/reveals
        tl.to(navDividerRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, "-=0.2")
        // 5. navigation links reveal vertically
        if (linksContainerRef.current) {
          tl.to(linksContainerRef.current.children, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }, "-=0.3")
        }
        // 7. SOCIALS label appears
        tl.to(socialsLabelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, "-=0.2")
        // 8. social links reveal
        if (socialsContainerRef.current) {
          tl.to(socialsContainerRef.current.children, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, "-=0.2")
        }
        
        tl.play()
      } else {
        tl.to(svgPathRef.current, { attr: { d: curvePathReverse }, duration: 0.4, ease: 'power3.in' })
          .to(svgPathRef.current, { attr: { d: startPath }, duration: 0.4, ease: 'power3.out' })
        
        // Hide elements quickly
        tl.to([
          navLabelRef.current, 
          navDividerRef.current,
          ...(linksContainerRef.current ? Array.from(linksContainerRef.current.children) : []),
          socialsLabelRef.current,
          ...(socialsContainerRef.current ? Array.from(socialsContainerRef.current.children) : [])
        ], { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
        
        tl.eventCallback("onComplete", () => {
          gsap.set(overlayRef.current, { pointerEvents: 'none', display: 'none' })
        })
        tl.play()
      }
    })

    return () => ctx.revert()
  }, [isActive])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsActive(false)
    lenis?.resize()
    
    const target = href === '#contact' ? 'bottom' : href

    setTimeout(() => {
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
    }, 600)
  }

  return (
    <>
      <div className={`fixed top-6 right-6 md:top-8 md:right-12 z-[100] transition-opacity duration-500 ${(!isScrolled && !isActive) ? 'opacity-100 md:opacity-0 md:pointer-events-none' : 'opacity-100'}`}>
        <Magnetic strength={0.2} textStrength={0.1}>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-20 h-20 bg-[#1c1c1c] text-[#f5f5f3] rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110 ${(!isScrolled && !isActive) ? 'scale-100 md:scale-0' : 'scale-100'} cursor-pointer`}
          >
            <span className="font-snellenberg text-sm font-medium relative z-10">{isActive ? 'Close' : 'Menu'}</span>
          </button>
        </Magnetic>
      </div>

      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[85] pointer-events-none hidden"
      >
        <svg 
          className="absolute top-0 left-0 w-full h-[120vh]"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <path 
            ref={svgPathRef}
            d="M 0 0 L 100 0 L 100 0 Q 50 0 0 0 L 0 0"
            fill="#171717"
            stroke="none"
          />
        </svg>

        <div className="relative w-full h-full flex flex-col justify-center px-[32px] md:px-[8vw] z-10 max-w-[1440px] mx-auto">
          
          <div className="flex flex-col mb-[16px]">
            <span ref={navLabelRef} className="text-[12px] font-mono text-[#f5f5f3]/50 uppercase tracking-[0.1em] mb-[16px] will-change-transform">
              Navigation
            </span>
            <div className="w-full max-w-[400px] overflow-hidden">
              <div ref={navDividerRef} className="w-full h-[1px] bg-[#f5f5f3]/20 will-change-transform" />
            </div>
          </div>

          <nav ref={linksContainerRef} className="flex flex-col gap-0 md:gap-[10px] mb-[40px] md:mb-[60px] w-fit">
            {navLinks.map((link) => {
              const showDot = hoveredItem === link.href || (!hoveredItem && activeItem === link.href);
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredItem(link.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onFocus={() => setHoveredItem(link.href)}
                  onBlur={() => setHoveredItem(null)}
                  className="group relative flex items-center w-fit text-[4rem] md:text-[6.5rem] lg:text-[8rem] font-snellenberg text-[#f5f5f3] font-normal tracking-tight leading-[1] outline-none"
                >
                  <div 
                    className={`absolute left-0 w-[10px] h-[10px] bg-[#f5f5f3] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${showDot ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                  />
                  <span className={`transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${showDot ? 'translate-x-[20px] md:translate-x-[24px]' : 'translate-x-0'} group-hover:text-[#f5f5f3]/80 group-focus-visible:text-[#f5f5f3]/80`}>
                    {link.name}
                  </span>
                </Link>
              )
            })}
          </nav>
          
          <div className="flex flex-col mt-[20px]">
            <span ref={socialsLabelRef} className="text-[12px] font-mono text-[#f5f5f3]/50 uppercase tracking-[0.1em] mb-[16px] will-change-transform">
              Socials
            </span>
            <div ref={socialsContainerRef} className="flex gap-[32px]">
              <Magnetic strength={0.12} textStrength={0.05}>
                <a 
                  href="https://github.com/webcris-dev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link relative text-[14px] md:text-[16px] font-mono text-[#f5f5f3] transition-colors outline-none pb-1"
                >
                  GitHub
                  <span className="social-underline absolute left-0 bottom-0 w-full h-[1px] bg-[#f5f5f3] origin-left scale-x-0 transition-transform duration-300 ease-out" />
                </a>
              </Magnetic>
              <Magnetic strength={0.12} textStrength={0.05}>
                <a 
                  href="https://linkedin.com/in/webcris" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link relative text-[14px] md:text-[16px] font-mono text-[#f5f5f3] transition-colors outline-none pb-1"
                >
                  LinkedIn
                  <span className="social-underline absolute left-0 bottom-0 w-full h-[1px] bg-[#f5f5f3] origin-left scale-x-0 transition-transform duration-300 ease-out" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .social-link:hover .social-underline,
        .social-link:focus-visible .social-underline {
          transform: scaleX(1);
          transform-origin: left;
        }
        /* Exit animation: if you want right-to-left exit, hover off sets origin to right */
        .social-link:not(:hover):not(:focus-visible) .social-underline {
          transform-origin: right;
        }
      `}} />
    </>
  )
}

export default Navbar
