"use client"
import React from 'react'
import { Mail, Download } from 'lucide-react'
import { Magnetic } from '@/components/ui/MagneticButton'

// Custom SVG Icons for Brand logos
const GithubIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export function ContactSection() {
  return (
    <section 
      id="contact"
      className="py-6 md:py-10 flex flex-col items-center text-center gap-5 w-full my-auto relative z-10 pointer-events-auto"
    >
      <span className="text-[#3b82f6] font-mono font-bold tracking-widest text-xs uppercase">
        What&apos;s Next?
      </span>
      
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-primary max-w-4xl">
        Let&apos;s build something <span className="text-[#3b82f6]">useful.</span>
      </h2>
      
      <p className="max-w-[50ch] text-sm sm:text-base md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 mt-2">
        I&apos;m open to full-stack, backend/API, AI integration, and automation opportunities. If you need a developer who can work across the application stack and integrate practical AI workflows, feel free to get in touch.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 w-full mt-8 relative z-20 pointer-events-auto">
        
        <Magnetic>
          <a 
            href="mailto:johncrislabiaga@gmail.com" 
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#171717] text-white hover:bg-white hover:text-black hover:border-white px-6 py-3 text-sm font-medium transition-all duration-300 relative z-50 pointer-events-auto cursor-pointer"
          >
            <Mail size={18} className="text-zinc-400 group-hover:text-black transition-colors duration-300" />
            <span className="font-medium text-sm transition-colors duration-300 group-hover:text-black">Email</span>
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="https://github.com/Kurisujon" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#171717] text-white hover:bg-white hover:text-black hover:border-white px-6 py-3 text-sm font-medium transition-all duration-300 relative z-50 pointer-events-auto cursor-pointer"
          >
            <GithubIcon size={18} className="text-zinc-400 group-hover:text-black transition-colors duration-300" />
            <span className="font-medium text-sm transition-colors duration-300 group-hover:text-black">GitHub</span>
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="https://www.linkedin.com/in/labiagacrisjohn/"
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#171717] text-white hover:bg-white hover:text-black hover:border-white px-6 py-3 text-sm font-medium transition-all duration-300 relative z-50 pointer-events-auto cursor-pointer"
          >
            <LinkedinIcon size={18} className="text-zinc-400 group-hover:text-black transition-colors duration-300" />
            <span className="font-medium text-sm transition-colors duration-300 group-hover:text-black">LinkedIn</span>
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            download
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#171717] text-white hover:bg-white hover:text-black hover:border-white px-6 py-3 text-sm font-medium transition-all duration-300 relative z-50 pointer-events-auto cursor-pointer"
          >
            <Download size={18} className="text-zinc-400 group-hover:text-black transition-colors duration-300" />
            <span className="font-medium text-sm transition-colors duration-300 group-hover:text-black">Resume</span>
          </a>
        </Magnetic>

      </div>
    </section>
  )
}

export default ContactSection
