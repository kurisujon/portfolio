import React from 'react'

export function Background() {
  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-[#0a0a0a] pointer-events-none">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Dark Gray/Slate Blob - Left Side */}
      <div 
        className="absolute top-[10%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-zinc-800/20 mix-blend-screen filter blur-[140px] animate-blob-float opacity-30"
      />
      
      {/* Blueish Glow - Right Side */}
      <div 
        className="absolute top-[-10%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-blue-900/25 mix-blend-screen filter blur-[140px] animate-blob-float-alt opacity-40"
      />
      
      {/* Subtle Bottom Glow for Depth */}
      <div 
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-blue-900/10 mix-blend-screen filter blur-[120px] opacity-20"
      />
    </div>
  )
}
