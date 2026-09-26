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

    // Initialize Cobe 3D Globe with retina sharpness (devicePixelRatio: 2)
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 56 * 2,
      height: 56 * 2,
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
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
      className="w-[56px] h-[56px] rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-[#1c1c1c]"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
        className="w-[56px] h-[56px] rounded-full overflow-hidden block"
      />
    </div>
  )
}

export default GlobeCanvas
