'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  const lenis = useLenis()
  
  const overlayRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  // Handle scroll to show/hide the floating button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle overlay animation
  useEffect(() => {
    if (!overlayRef.current || !svgPathRef.current || !menuLinksRef.current) return
    
    // We animate the path to simulate the curved entrance
    // Start path: flat at top
    // Curve path: bulging down
    // End path: flat at bottom (full screen)
    
    const tl = gsap.timeline({ paused: true })
    
    const startPath = `M 0 0 L 100 0 L 100 0 Q 50 0 0 0 L 0 0`
    const curvePath = `M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0`
    const flatPath  = `M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0`
    
    // Reverse paths for closing (curves upwards)
    const curvePathReverse = `M 0 100 L 100 100 L 100 0 Q 50 -50 0 0 L 0 100`

    if (isActive) {
      // Opening
      gsap.set(overlayRef.current, { pointerEvents: 'auto', display: 'flex' })
      tl.to(svgPathRef.current, { attr: { d: curvePath }, duration: 0.4, ease: 'power3.in' })
        .to(svgPathRef.current, { attr: { d: flatPath }, duration: 0.4, ease: 'power3.out' })
      
      tl.fromTo(
        menuLinksRef.current.children, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
        "-=0.2"
      )
      tl.play()
    } else {
      // Closing
      tl.to(svgPathRef.current, { attr: { d: curvePathReverse }, duration: 0.4, ease: 'power3.in' })
        .to(svgPathRef.current, { attr: { d: startPath }, duration: 0.4, ease: 'power3.out' })
      
      tl.to(menuLinksRef.current.children, { y: -50, opacity: 0, duration: 0.4, stagger: 0.02, ease: 'power3.in' }, 0)
      
      tl.eventCallback("onComplete", () => {
        gsap.set(overlayRef.current, { pointerEvents: 'none', display: 'none' })
      })
      tl.play()
    }

    return () => { tl.kill() }
  }, [isActive])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsActive(false)
    lenis?.resize()
    
    const target = href === '#contact' ? 'bottom' : href

    // Short delay to let menu close
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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsActive(false)
    lenis?.resize()
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 100) // Immediate for logo
  }

  return (
    <>
      {/* 1. Standard Top Navbar */}
      <nav className={`fixed top-0 w-full z-[80] left-0 right-0 py-8 px-6 md:px-12 transition-transform duration-500 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center cursor-pointer mix-blend-difference z-[90]">
            <Image src="/cj_outlined_logo_clean.png" alt="WebCris" width={100} height={32} className="h-6 md:h-8 w-auto object-contain brightness-200" priority />
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white mix-blend-difference">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative hover:text-white/70 transition-colors py-1 group cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Floating Circular Menu Button */}
      <button 
        onClick={() => setIsActive(!isActive)}
        className={`w-20 h-20 bg-[#1c1c1c] text-white rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110 ${(!isScrolled && !isActive) ? 'scale-0' : 'scale-100'} cursor-pointer`}
      >
        <span className="font-snellenberg text-sm font-medium relative z-10">{isActive ? 'Close' : 'Menu'}</span>
      </button>

      {/* 3. Fullscreen Curved Overlay */}
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

        <div className="relative w-full h-full flex flex-col justify-center px-10 md:px-32 z-10">
          <div className="flex flex-col gap-4" ref={menuLinksRef}>
            <span className="text-sm font-mono text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4 w-fit">Navigation</span>
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-5xl md:text-8xl font-snellenberg text-white font-medium tracking-tight hover:text-white/60 transition-colors w-fit"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="mt-12 flex gap-8">
              <a href="https://github.com/webcris-dev" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-white hover:text-white/50 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/webcris" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-white hover:text-white/50 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
