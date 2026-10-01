'use client'
import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = 0
    let animationFrameId: number

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 56 * 2,
      height: 56 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.5, 0.2],
      glowColor: [0.2, 0.2, 0.2],
      markers: [{ location: [12.8797, 121.774], size: 0.1 }],
    })

    const animate = () => {
      phi += 0.01
      globe.update({ phi })
      animationFrameId = requestAnimationFrame(animate)
    }

    // Only schedule frames while the badge is actually visible —
    // cobe v2 has no toggle(), so pausing means not scheduling at all
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(animationFrameId)
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
    <div className="w-[56px] h-[56px] rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-[#1c1c1c]">
      <canvas ref={canvasRef} className="w-[56px] h-[56px] rounded-full overflow-hidden block" />
    </div>
  )
}

export default GlobeCanvas
