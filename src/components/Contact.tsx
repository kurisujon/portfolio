'use client'

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
    <div className="w-full h-full flex flex-col justify-between">
      {/* Upper content wrapper width 68%, centred; padding-top 16svh */}
      <div
        className="w-[88%] md:w-[68%] mx-auto flex flex-col"
        style={{
          paddingTop: 'clamp(40px, 16svh, 172px)',
        }}
      >
        {/* Heading 6.6vw, line-height 1, letter-spacing -0.045em, two lines; ↙ arrow at the right */}
        <div className="relative w-full flex items-end justify-between">
          <h2
            className="font-snellenberg font-normal select-none text-[#f5f5f3]"
            style={{
              fontSize: 'clamp(2.5rem, 6.6vw, 7.8rem)',
              lineHeight: 1,
              letterSpacing: '-0.045em',
            }}
          >
            <div className="flex items-center">
              {/* Avatar 5.2vw circle */}
              <div
                className="rounded-full shrink-0 mr-3 md:mr-[2vw] overflow-hidden relative bg-[#1c1d20]"
                style={{
                  width: 'clamp(44px, 5.2vw, 96px)',
                  height: 'clamp(44px, 5.2vw, 96px)',
                }}
              >
                <Image
                  src="/profile.png"
                  alt="Cris John Labiaga"
                  fill
                  className="object-cover"
                  style={{ transform: 'scale(1.8) translateY(15%)', objectPosition: 'center' }}
                  sizes="(max-width: 768px) 50px, 5.2vw"
                />
              </div>
              <span>Let's work</span>
            </div>
            <div>together</div>
          </h2>

          {/* ↙ arrow at the right of the heading */}
          <div className="hidden md:block pb-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-[180deg]"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="#f5f5f3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Divider 1px rgba(255,255,255,.17), 7svh below the heading */}
        <div
          className="relative w-full"
          style={{
            marginTop: 'clamp(20px, 7svh, 75px)',
          }}
        >
          <div
            className="w-full h-[1px]"
            style={{ background: 'rgba(255, 255, 255, 0.17)' }}
          />

          {/* "Get in touch" circle 12vw (max 230px), background #455ce9, centred ON the divider at left 82.3% */}
          <div
            className="absolute -translate-x-1/2 top-1/2 -translate-y-1/2 z-20"
            style={{ left: '82.3%' }}
          >
            <Magnetic strength={0.2} textStrength={0.1}>
              <a
                href="mailto:johncrislabiaga@gmail.com"
                className="group relative flex items-center justify-center bg-[#455ce9] text-white rounded-full hover:bg-[#3448c5] transition-colors duration-300 shadow-xl"
                style={{
                  width: 'clamp(96px, 12vw, 230px)',
                  height: 'clamp(96px, 12vw, 230px)',
                }}
              >
                <span className="font-snellenberg font-normal text-[clamp(13px, 1.2vw, 18px)] tracking-wide transition-transform duration-300 group-hover:scale-105 whitespace-nowrap">
                  Get in touch
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Pills 5.1vw tall, 1px rgba(255,255,255,.2) border, 9svh below the divider */}
        <div
          className="flex flex-col md:flex-row gap-3 md:gap-4"
          style={{
            marginTop: 'clamp(24px, 9svh, 95px)',
          }}
        >
          <a
            href="mailto:johncrislabiaga@gmail.com"
            className="flex items-center justify-center px-6 md:px-8 rounded-full hover:bg-white hover:text-[#1c1d20] transition-colors duration-300 font-snellenberg text-[15px] md:text-[18px] w-fit"
            style={{
              height: 'clamp(46px, 5.1vw, 76px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            johncrislabiaga@gmail.com
          </a>
          <a
            href="tel:+639123456789"
            className="flex items-center justify-center px-6 md:px-8 rounded-full hover:bg-white hover:text-[#1c1d20] transition-colors duration-300 font-snellenberg text-[15px] md:text-[18px] w-fit"
            style={{
              height: 'clamp(46px, 5.1vw, 76px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            +63 912 345 6789
          </a>
        </div>
      </div>

      {/* Bottom row (VERSION / LOCAL TIME left, SOCIALS right) at 3vw side padding, small labels #8e8e90 */}
      <div
        className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mt-auto pb-6 md:pb-8"
        style={{
          paddingLeft: '3vw',
          paddingRight: '3vw',
        }}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[11px] md:text-[12px] uppercase font-mono tracking-widest"
              style={{ color: '#8e8e90' }}
            >
              Version
            </span>
            <span className="text-[14px] md:text-[16px] font-snellenberg text-[#f5f5f3]">
              2026 © Edition
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span
              className="text-[11px] md:text-[12px] uppercase font-mono tracking-widest"
              style={{ color: '#8e8e90' }}
            >
              Local Time
            </span>
            <span className="text-[14px] md:text-[16px] font-snellenberg text-[#f5f5f3]">
              {time ? `${time} GMT+8` : '00:00 GMT+8'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-6 md:mt-0">
          <span
            className="text-[11px] md:text-[12px] uppercase font-mono tracking-widest"
            style={{ color: '#8e8e90' }}
          >
            Socials
          </span>
          <div className="flex gap-6 md:gap-8 text-[14px] md:text-[16px] font-snellenberg">
            <a
              href="https://linkedin.com/in/webcris"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f5f3] hover:-translate-y-[2px] transition-transform duration-300 relative group block"
            >
              LinkedIn
              <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
            <a
              href="https://github.com/webcris-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f5f3] hover:-translate-y-[2px] transition-transform duration-300 relative group block"
            >
              GitHub
              <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f5f5f3] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
