'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    let isVisible = true
    let animationFrameId: number
    const canvas = canvasRef.current
    if (!canvas) return

    // Explicitly calculate based on wrapper size (48px) multiplied by devicePixelRatio (2)
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 48 * 2,
      height: 48 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.5, 0.2], // warm accent marker
      glowColor: [0.2, 0.2, 0.2],
      markers: [
        // Philippines coordinates: [12.8797, 121.7740]
        { location: [12.8797, 121.774], size: 0.1 },
      ],
      onRender: (state: any) => {
        state.phi = phi
        phi += 0.01
      },
    } as any)

    // Animation loop supporting both cobe v0.6 and v2
    const animate = () => {
      if (isVisible && globe) {
        phi += 0.01
        globe.update?.({ phi })
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    // Pause animation when scrolled out of view using IntersectionObserver
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (typeof (globe as any)?.toggle === 'function') {
        ;(globe as any).toggle(entry.isIntersecting)
      }
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      globe.destroy()
    }
  }, [])

  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

export default GlobeCanvas
