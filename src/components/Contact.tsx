"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Magnetic } from '@/components/ui/MagneticButton'

export function ContactSection() {
  const [time, setTime] = useState<string>('')

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

  return (
    <section 
      id="contact"
      className="w-full min-h-[85vh] flex flex-col justify-between py-12 md:py-16 relative z-10 text-white"
    >
      {/* Top / Main Contact Block */}
      <div className="flex flex-col gap-12 w-full">
        {/* Headline + Magnetic Action Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 w-full pb-16 border-b border-white/10">
          <div className="flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none tracking-tighter font-medium text-white select-none">
            <div className="flex items-center gap-4">
              <Image
                src="/profile-cutout.png"
                alt="Cris John Labiaga"
                width={80}
                height={80}
                className="rounded-full object-cover bg-white/10 w-16 h-16 sm:w-20 sm:h-20 shrink-0"
              />
              <span>Let&apos;s work</span>
            </div>
            <span>together</span>
          </div>

          <div className="self-end md:self-center shrink-0">
            <Magnetic>
              <a
                href="mailto:johncrislabiaga@gmail.com"
                className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-medium cursor-pointer hover:scale-105 transition-transform shadow-2xl"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Contact Pills */}
        <div className="flex flex-wrap gap-4 mt-2">
          <Magnetic>
            <a
              href="mailto:johncrislabiaga@gmail.com"
              className="border border-white/20 rounded-full px-8 py-4 text-lg hover:bg-white hover:text-black transition-colors cursor-pointer inline-block"
            >
              johncrislabiaga@gmail.com
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="tel:+639302051319"
              className="border border-white/20 rounded-full px-8 py-4 text-lg hover:bg-white hover:text-black transition-colors cursor-pointer inline-block"
            >
              +63 930 205 1319
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Footer Grid: 3 columns */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-16 md:pt-24 mt-16 border-t border-white/10">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-white/40 uppercase font-mono tracking-widest">Version</span>
          <span className="text-sm sm:text-base text-white/80 font-normal">2026 © Edition</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-white/40 uppercase font-mono tracking-widest">Local Time</span>
          <span className="text-sm sm:text-base text-white/80 font-normal">
            {time ? `${time} GMT+8` : '07:15 PM GMT+8'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-white/40 uppercase font-mono tracking-widest">Socials</span>
          <div className="flex items-center gap-6 text-sm sm:text-base text-white/80">
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/labiagacrisjohn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/Kurisujon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Twitter
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
