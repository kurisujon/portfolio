import React from 'react'

export function Background() {
  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-[#0a0a0a] pointer-events-none">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Lightweight radial gradient replacing heavy 140px filter blur blobs */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 85% 10%, rgba(30, 58, 138, 0.2) 0%, transparent 50%), radial-gradient(circle at 15% 25%, rgba(39, 39, 42, 0.2) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}
