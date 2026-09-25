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
    const centerX = left + width / 2
    const centerY = top + height / 2

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
    const childProps = (children as React.ReactElement<any>).props || {}
    content = React.cloneElement(children as React.ReactElement<any>, {
      ...childProps,
      href: childProps.href || href,
      target: childProps.target || target,
      rel: childProps.rel || rel,
      onClick: (e: React.MouseEvent) => {
        childProps.onClick?.(e)
        onClick?.(e as any)
      },
      className: `${childProps.className || ''} pointer-events-auto cursor-pointer relative z-50`.trim(),
    })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`inline-block relative z-50 pointer-events-auto cursor-pointer ${className}`}
      {...props}
    >
      {content}
    </motion.div>
  )
}

export default Magnetic
