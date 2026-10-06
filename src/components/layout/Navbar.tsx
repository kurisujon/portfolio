'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { gsap } from '@/lib/motion'
import { Magnetic } from '@/components/ui/MagneticButton'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isActive, setIsActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const lenis = useLenis()
  const router = useRouter()
  
  const drawerRef = useRef<HTMLDivElement>(null)
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
      
      const scrollY = window.scrollY
      const wh = window.innerHeight
      if (scrollY < wh * 0.5) setActiveItem(null)
      else if (scrollY >= document.documentElement.scrollHeight - wh - 100) setActiveItem('#contact')
      else {
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
    if (isActive) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isActive, lenis])

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!drawerRef.current || !svgPathRef.current) return
    
    const ctx = gsap.context(() => {
      // Create timeline only on initial creation
      if (!tlRef.current) {
        const isMobile = window.innerWidth < 768
        
        const initialPath = `M 100 0 L 100 0 Q 100 50 100 100 L 100 100 Z`
        const transitPath = `M 100 0 L 100 0 Q -100 50 100 100 L 100 100 Z`
        const settledPath = `M 100 0 L 100 0 Q 100 50 100 100 L 100 100 Z`

        gsap.set(drawerRef.current, { 
          xPercent: 100, 
          x: isMobile ? 0 : 100,
          display: 'none'
        })

        gsap.set(navLabelRef.current, { opacity: 0, y: 15 })
        gsap.set(navDividerRef.current, { scaleX: 0, transformOrigin: 'left' })
        if (linksContainerRef.current) {
          gsap.set(linksContainerRef.current.children, { opacity: 0, x: 20 })
        }
        gsap.set(socialsLabelRef.current, { opacity: 0, y: 15 })
        if (socialsContainerRef.current) {
          gsap.set(socialsContainerRef.current.children, { opacity: 0, y: 15 })
        }

        const tl = gsap.timeline({ 
          paused: true,
          onReverseComplete: () => {
            gsap.set(drawerRef.current, { pointerEvents: 'none', display: 'none' })
          }
        })
        
        tl.to(drawerRef.current, { 
          display: 'flex',
          pointerEvents: 'auto',
          xPercent: 0, 
          x: 0, 
          duration: 1.0, 
          ease: 'power4.inOut' 
        }, 0)
        
        tl.to(svgPathRef.current, { 
          attr: { d: transitPath }, 
          duration: 0.5, 
          ease: 'power3.in' 
        }, 0)
        .to(svgPathRef.current, { 
          attr: { d: settledPath }, 
          duration: 0.45, 
          ease: 'power3.out' 
        }, 0.45)
        
        tl.to(navLabelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.4)
        tl.to(navDividerRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, 0.5)
        
        if (linksContainerRef.current) {
          tl.to(linksContainerRef.current.children, { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, 0.5)
        }
        
        tl.to(socialsLabelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.7)
        if (socialsContainerRef.current) {
          tl.to(socialsContainerRef.current.children, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, 0.7)
        }

        tlRef.current = tl
      }
    })

    return () => { ctx.revert(); tlRef.current = null; }
  }, []) // Empty dependency array so it only builds once!

  useEffect(() => {
    if (tlRef.current) {
      if (isActive) {
        gsap.set(drawerRef.current, { display: 'flex' })
        tlRef.current.timeScale(1).play()
      } else {
        tlRef.current.timeScale(1.5).reverse()
      }
    }
  }, [isActive])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsActive(false)
    lenis?.resize()
    
    setTimeout(() => {
      // If we are navigating to Home
      if (href === '/') {
        if (window.location.pathname === '/') {
          if (lenis) lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
          else window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          router.push('/')
        }
        return
      }

      // If we are not on the homepage but trying to click a hash link
      if (href.startsWith('#') && window.location.pathname !== '/') {
        router.push('/' + href)
        return
      }
      
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
    }, 600)
  }

  return (
    <>
      {/* Floating Menu Button */}
      <div className={`fixed top-6 right-6 md:top-8 md:right-12 z-[100] transition-opacity duration-500 ${(!isScrolled && !isActive) ? 'opacity-100 md:opacity-0 md:pointer-events-none' : 'opacity-100'}`}>
        <Magnetic strength={0.2} textStrength={0.1}>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${(!isScrolled && !isActive) ? "scale-100 md:scale-0" : "scale-100"} ${isActive ? "bg-[#455ce9] text-white" : "bg-[#1c1c1c] text-[#f5f5f3]"} cursor-pointer`}
          >
            <div className="relative w-[30px] h-[20px] flex flex-col justify-between items-center z-10">
              <span 
                className={`block h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-[24px] rotate-45 translate-y-[9px]' : 'w-full'}`}
              />
              <span 
                className={`block h-[2px] bg-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'w-[24px] -rotate-45 -translate-y-[9px]' : 'w-full'}`}
              />
            </div>
          </button>
        </Magnetic>
      </div>

      {/* Right Side Drawer */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 w-[100vw] md:w-[clamp(440px,37.5vw,620px)] h-[100dvh] bg-[#171717] z-[85] pointer-events-none hidden"
      >
        {/* Curved SVG Boundary (Desktop Only) */}
        <svg 
          className="absolute top-0 left-[-99px] w-[100px] h-full hidden md:block pointer-events-none"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path 
            ref={svgPathRef}
            d="M 100 0 L 100 0 Q 100 50 100 100 L 100 100 Z"
            fill="#171717"
            stroke="none"
          />
        </svg>

        {/* Drawer Content Wrapper */}
        <div className="relative w-full h-full flex flex-col px-[40px] md:pl-[clamp(60px,7vw,120px)] md:pr-[clamp(30px,4vw,70px)] py-[100px] z-10 min-h-0">
          
          {/* Navigation Section */}
          <div className="flex flex-col mb-[20px] md:mb-[40px] shrink-0">
            <span ref={navLabelRef} className="text-[12px] font-mono text-[#f5f5f3]/50 uppercase tracking-[0.1em] mb-[16px] will-change-transform">
              Navigation
            </span>
            <div className="w-full max-w-[400px] overflow-hidden">
              <div ref={navDividerRef} className="w-full h-[1px] bg-[#f5f5f3]/20 will-change-transform" />
            </div>
          </div>

          <nav ref={linksContainerRef} className="flex flex-col gap-0 md:gap-[8px] w-fit flex-1 justify-center min-h-[min-content]">
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
                  className="group relative flex items-center w-fit text-[clamp(2.5rem,10vw,3.5rem)] md:text-[clamp(3rem,4.1vw,4.6rem)] font-snellenberg text-[#f5f5f3] font-normal tracking-tight leading-[1.05] outline-none py-1 md:py-2"
                >
                  <div 
                    className={`absolute left-0 w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-[#f5f5f3] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${showDot ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                  />
                  <span className={`transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${showDot ? 'translate-x-[20px] md:translate-x-[24px]' : 'translate-x-0'} group-hover:text-[#f5f5f3]/80 group-focus-visible:text-[#f5f5f3]/80`}>
                    {link.name}
                  </span>
                </Link>
              )
            })}
          </nav>
          
          {/* Socials Section */}
          <div className="flex flex-col shrink-0 mt-auto pt-[40px]">
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
        .social-link:not(:hover):not(:focus-visible) .social-underline {
          transform-origin: right;
        }
      `}} />
    </>
  )
}

export default Navbar
