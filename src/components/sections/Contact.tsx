"use client"
import { Mail, Download } from 'lucide-react'

// Custom SVG Icons for Brand logos
const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
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

const LinkedinIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
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
      className="py-32 md:py-48 flex flex-col items-center text-center gap-6 w-full"
    >
      <span className="text-[#3b82f6] font-mono font-bold tracking-widest text-sm uppercase">
        What&apos;s Next?
      </span>
      
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-primary max-w-4xl">
        Let&apos;s build something <span className="text-[#3b82f6]">useful.</span>
      </h2>
      
      <p className="max-w-[50ch] text-lg md:text-xl leading-relaxed text-zinc-500 dark:text-zinc-400 mt-4">
        I&apos;m open to full-stack, backend/API, AI integration, and automation opportunities. If you need a developer who can work across the application stack and integrate practical AI workflows, feel free to get in touch.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 w-full mt-8">
        
        <a 
          href="mailto:johncrislabiaga@gmail.com" 
          className="flex items-center gap-3 px-6 py-4 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-all duration-500 ease-out rounded-full hover:-translate-y-[2px]"
        >
          <Mail size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-sm text-zinc-900 dark:text-primary">Email</span>
        </a>

        <a 
          href="https://github.com/Kurisujon" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-all duration-500 ease-out rounded-full hover:-translate-y-[2px]"
        >
          <GithubIcon size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-sm text-zinc-900 dark:text-primary">GitHub</span>
        </a>

        <a 
          href="https://www.linkedin.com/in/labiagacrisjohn/"
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-all duration-500 ease-out rounded-full hover:-translate-y-[2px]"
        >
          <LinkedinIcon size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-sm text-zinc-900 dark:text-primary">LinkedIn</span>
        </a>

        <a 
          href="/resume.pdf" 
          target="_blank" 
          download
          className="flex items-center gap-3 px-6 py-4 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-all duration-500 ease-out rounded-full hover:-translate-y-[2px]"
        >
          <Download size={20} className="text-[#3b82f6]" />
          <span className="font-bold text-sm text-zinc-900 dark:text-primary">Resume</span>
        </a>

      </div>
    </section>
  )
}
