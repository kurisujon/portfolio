'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/motion'

interface NameRevealProps {
  text: string
  className?: string
}

export const NameReveal: React.FC<NameRevealProps> = ({ text, className }) => {
  const textRef = useRef<HTMLHeadingElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !blockRef.current) return

    const tl = gsap.timeline({ delay: 0.2 })
    
    // Initial states
    gsap.set(textRef.current, { opacity: 0 })
    gsap.set(blockRef.current, { xPercent: -101, visibility: 'visible' })

    // Block enters
    tl.to(blockRef.current, {
      xPercent: 0,
      duration: 0.45,
      ease: 'power3.inOut'
    })
    // Text reveals right when block is fully covering it
    .set(textRef.current, { opacity: 1 })
    // Block leaves
    .to(blockRef.current, {
      xPercent: 101,
      duration: 0.45,
      ease: 'power3.inOut'
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="relative inline-block overflow-hidden py-2 px-1 max-w-full">
      <h1
        ref={textRef}
        className={`${className} text-white uppercase font-bold tracking-[0.1em] leading-none whitespace-nowrap`}
      >
        {text}
      </h1>

      <div
        ref={blockRef}
        aria-hidden="true"
        className="absolute inset-0 bg-white z-20"
      />
    </div>
  )
}
