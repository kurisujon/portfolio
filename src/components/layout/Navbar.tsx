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
          onClick={(e) => {
            e.preventDefault()
            lenis?.scrollTo(0, {
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }}
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
                onClick={(e) => {
                  e.preventDefault()
                  lenis?.scrollTo(link.href, {
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  })
                }}
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
