"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface NameRevealProps {
  text: string
  className?: string
}

export const NameReveal: React.FC<NameRevealProps> = ({ text, className }) => {
  return (
    <div className="relative inline-block overflow-hidden py-2 px-1 max-w-full">
      {/* The Text - Revealed exactly when the block covers it */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.01 }}
        className={`${className} text-white uppercase font-bold tracking-[0.1em] leading-none whitespace-nowrap`}
      >
        {text}
      </motion.h1>

      {/* The Block Overlay - Faster slide animation */}
      <motion.div
        initial={{ x: "-101%" }}
        animate={{
          // Overshoot the clipped edges to avoid a subpixel seam at exactly 100%.
          x: ["-101%", "0%", "101%"],
          transitionEnd: { visibility: "hidden" }
        }}
        transition={{ 
          duration: 0.9, 
          times: [0, 0.5, 1],
          ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
          delay: 0.2
        }}
        aria-hidden="true"
        className="absolute inset-0 bg-white z-20"
      />
    </div>
  )
}
