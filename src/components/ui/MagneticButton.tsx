'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/motion'

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  strength?: number
  textStrength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, textStrength = 0.15, className = '', ...props }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop || !containerRef.current || !childRef.current) return

    const container = containerRef.current
    const child = childRef.current

    const xToContainer = gsap.quickTo(container, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yToContainer = gsap.quickTo(container, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })
    
    const xToChild = gsap.quickTo(child, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yToChild = gsap.quickTo(child, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = container.getBoundingClientRect()
      
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      xToContainer(x * strength)
      yToContainer(y * strength)
      
      xToChild(x * textStrength)
      yToChild(y * textStrength)
    }

    const handleMouseLeave = () => {
      xToContainer(0)
      yToContainer(0)
      xToChild(0)
      yToChild(0)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, textStrength])

  return (
    <div ref={containerRef} className={`relative inline-flex ${className}`} {...props}>
      <div ref={childRef} className="relative flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  )
}

// Fallback for older imports
export const MagneticButton = Magnetic
