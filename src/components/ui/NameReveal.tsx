"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface NameRevealProps {
  text: string
  className?: string
}

export const NameReveal: React.FC<NameRevealProps> = ({ text, className }) => {
  return (
    <div className="relative inline-block overflow-hidden py-2 px-1">
      {/* The Text - Revealed exactly when the block covers it */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.01 }}
        className={`${className} text-white uppercase font-bold tracking-[0.1em] leading-none`}
      >
        {text}
      </motion.h1>

      {/* The Block Overlay - Faster slide animation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "100%"] }}
        transition={{ 
          duration: 0.9, 
          times: [0, 0.5, 1],
          ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
          delay: 0.2
        }}
        className="absolute inset-0 bg-white z-20"
      />
    </div>
  )
}
