"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLenis } from '@studio-freight/react-lenis'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Refresh scroll bounds in case GSAP horizontal scroll spacers or assets shifted layout
    lenis?.resize()

    // The Contact section is inside a sticky curtain footer at the end of the page.
    // Target 'bottom' so Lenis scrolls to the absolute end of the document, completely revealing the footer.
    const target = href === '#contact' ? 'bottom' : href

    if (lenis) {
      lenis.scrollTo(target, {
        duration: href === '#contact' ? 1.5 : 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      if (href === '#contact') {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      } else {
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState(null, '', href)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    lenis?.resize()
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 left-0 right-0 backdrop-blur-md transition-all duration-300 ease-in-out ${isScrolled
          ? 'py-4 bg-[#0a0a0a]/50 border-b border-white/5'
          : 'py-8 md:py-10 bg-transparent border-transparent'
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer"
        >
          <img 
            src="/cj_outlined_logo_clean.png" 
            alt="Logo" 
            className="h-8 md:h-9 w-auto object-contain brightness-110"
          />
        </Link>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-10 text-sm font-normal text-zinc-400">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative hover:text-white transition-colors py-1 group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
