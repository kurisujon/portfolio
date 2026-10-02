'use client'

import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

interface TextMaskRevealProps {
  children?: React.ReactNode
  text?: string
  className?: string
  containerClassName?: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div'
  splitBy?: 'words' | 'lines'
  delay?: number
  stagger?: number
  start?: string
}

export function TextMaskReveal({
  text = '',
  className = '',
  containerClassName = '',
  as: Component = 'div',
  splitBy = 'words',
  delay = 0,
  stagger = 0.05,
  start = 'top 80%',
}: TextMaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const ctx = gsap.context(() => {
      const spans = containerRef.current?.querySelectorAll('.mask-span')
      if (!spans || spans.length === 0) return

      gsap.from(spans, {
        y: '100%',
        duration: 0.85,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [delay, stagger, start])

  if (!text) return null

  if (splitBy === 'lines') {
    const lines = text.split('\n').filter((l) => l.trim().length > 0)
    return (
      <Component ref={containerRef} className={containerClassName}>
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden block leading-normal">
            <span
              className={`mask-span block will-change-transform ${className}`}
            >
              {line}
            </span>
          </div>
        ))}
      </Component>
    )
  }

  const words = text.split(' ')

  return (
    <Component ref={containerRef} className={containerClassName}>
      {words.map((word, i) => (
        <div
          key={i}
          className="overflow-hidden inline-block mr-[0.25em] align-top leading-normal"
        >
          <span
            className={`mask-span inline-block will-change-transform ${className}`}
          >
            {word}
          </span>
        </div>
      ))}
    </Component>
  )
}

export default TextMaskReveal
