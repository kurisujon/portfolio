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
  const lenis = useLenis()
  
  const overlayRef = useRef<HTMLDivElement>(null)
  const svgPathRef = useRef<SVGPathElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!overlayRef.current || !svgPathRef.current || !menuLinksRef.current) return
    
    const tl = gsap.timeline({ paused: true })
    
    const startPath = `M 0 0 L 100 0 L 100 0 Q 50 0 0 0 L 0 0`
    const curvePath = `M 0 0 L 100 0 L 100 100 Q 50 150 0 100 L 0 0`
    const flatPath  = `M 0 0 L 100 0 L 100 100 Q 50 100 0 100 L 0 0`
    
    const curvePathReverse = `M 0 100 L 100 100 L 100 0 Q 50 -50 0 0 L 0 100`

    if (isActive) {
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
            className={`w-20 h-20 bg-[#1c1c1c] text-white rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110 ${(!isScrolled && !isActive) ? 'scale-100 md:scale-0' : 'scale-100'} cursor-pointer`}
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
