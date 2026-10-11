'use client'

import { forwardRef, useEffect, useState } from 'react'

const SH = 190

export const CurveEdge = forwardRef<HTMLDivElement>(function CurveEdge(_, ref) {
  const [g, setG] = useState({ W: 1920, S: 88 })

  useEffect(() => {
    const m = () => {
      const W = document.documentElement.clientWidth
      setG({ W, S: Math.max(24, Math.min(W * 0.046, 120)) })
    }
    m()
    window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [])

  const { W, S } = g
  const R = (W * W / 4 + S * S) / (2 * S)
  const shadow = `radial-gradient(circle ${R}px at 50% ${S - R}px, rgba(28,29,32,0) ${R - 3}px, rgba(28,29,32,.62) ${R}px, rgba(28,29,32,.40) ${R + 20}px, rgba(28,29,32,.24) ${R + 45}px, rgba(28,29,32,.13) ${R + 80}px, rgba(28,29,32,.06) ${R + 120}px, rgba(28,29,32,0) ${R + SH}px)`

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-full -mt-px w-full origin-top will-change-transform"
      style={{ height: S + SH }}
    >
      <div className="absolute inset-0" style={{ background: shadow }} />
      <svg
        className="absolute left-0 top-0 block w-full"
        style={{ height: S }}
        viewBox={`0 0 1000 ${S}`}
        preserveAspectRatio="none"
      >
        <path d={`M0 0H1000Q500 ${2 * S} 0 0Z`} style={{ fill: 'var(--page-bg, #f5f5f3)' }} />
      </svg>
    </div>
  )
})
