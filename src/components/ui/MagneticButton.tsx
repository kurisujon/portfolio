'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion'

interface MagneticProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  className?: string
  distanceLimit?: number
  href?: string
  target?: string
  rel?: string
}

export function Magnetic({
  children,
  className = '',
  distanceLimit = 20,
  onClick,
  href,
  target,
  rel,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    
    // Subtract current spring displacement to calculate untranslated rest center
    const currentX = springX.get() || 0
    const currentY = springY.get() || 0
    const centerX = left - currentX + width / 2
    const centerY = top - currentY + height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Smoothly pull up to distanceLimit (20px) toward the cursor
    const pullX = Math.max(-distanceLimit, Math.min(distanceLimit, distanceX * 0.35))
    const pullY = Math.max(-distanceLimit, Math.min(distanceLimit, distanceY * 0.35))

    x.set(pullX)
    y.set(pullY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Forward props and ensure child has pointer-events-auto and merged handlers
  let content = children
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    const childProps = child.props || {}
    const hasClick = typeof childProps.onClick === 'function' || typeof onClick === 'function'

    const mergedProps: Record<string, any> = {
      ...childProps,
      href: childProps.href || href,
      target: childProps.target || target,
      rel: childProps.rel || rel,
      className: `${childProps.className || ''} pointer-events-auto cursor-pointer relative z-50`.trim(),
    }

    if (hasClick) {
      mergedProps.onClick = (e: React.MouseEvent) => {
        if (typeof childProps.onClick === 'function') {
          childProps.onClick(e)
        }
        if (typeof onClick === 'function') {
          onClick(e as any)
        }
      }
    }

    content = React.cloneElement(child, mergedProps)
  }

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === ref.current && ref.current?.firstElementChild) {
      (ref.current.firstElementChild as HTMLElement).click?.()
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleWrapperClick}
      style={{ x: springX, y: springY }}
      className={`inline-block relative z-50 pointer-events-auto cursor-pointer ${className}`}
      {...props}
    >
      {content}
    </motion.div>
  )
}

export default Magnetic
