'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/motion'
import { ArrowUpRight } from 'lucide-react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoverState, setHoverState] = useState<'default' | 'view' | 'open' | 'drag'>('default')

  useEffect(() => {
    // Only enable on non-touch devices
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop || !cursorRef.current) return

    // QuickTo for high performance following
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" })
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as Element | null
      if (target) {
        // Detect specific hover intents based on classes or attributes
        if (target.closest('.cursor-view')) setHoverState('view')
        else if (target.closest('.cursor-open') || target.closest('a[target="_blank"]')) setHoverState('open')
        else if (target.closest('.cursor-drag')) setHoverState('drag')
        else if (target.closest('a, button, [role="button"]')) setHoverState('view') // Generic interactive
        else setHoverState('default')
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  // Animate cursor state changes
  useEffect(() => {
    if (!cursorRef.current) return

    if (hoverState === 'default') {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#f5f5f5', duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.to(cursorRef.current, { scale: 3.5, backgroundColor: '#f5f5f5', duration: 0.3, ease: 'power2.out' })
    }
  }, [hoverState])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-opacity duration-300 select-none hidden md:flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: '12px', height: '12px', mixBlendMode: 'difference' }}
    >
      <div className={`absolute inset-0 flex items-center justify-center text-[3px] text-black font-snellenberg tracking-wider font-bold transition-opacity duration-300 ${hoverState !== 'default' ? 'opacity-100' : 'opacity-0'}`}>
        {hoverState === 'view' && 'VIEW'}
        {hoverState === 'open' && <ArrowUpRight size={5} />}
        {hoverState === 'drag' && 'DRAG'}
      </div>
    </div>
  )
}

export default CustomCursor
