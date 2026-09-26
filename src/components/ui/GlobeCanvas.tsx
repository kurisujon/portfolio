'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let globe: any = null
    let phi = 0
    let isVisible = true
    let animationFrameId: number

    const initGlobe = (width: number, height: number) => {
      if (!canvasRef.current || globe) return

      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2
      const canvasWidth = Math.round(width * dpr)
      const canvasHeight = Math.round(height * dpr)

      console.log('createGlobe dimensions:', canvasWidth, canvasHeight)

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: canvasWidth,
        height: canvasHeight,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.4,
        scale: 1,
        mapSamples: 12000,
        mapBrightness: 6,
        baseColor: [0.4, 0.4, 0.4],
        markerColor: [1, 0.5, 0.2], // warm accent marker
        glowColor: [0.8, 0.8, 0.8],
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
    }

    const wrapper = wrapperRef.current
    if (!wrapper) return

    // ResizeObserver ensures non-zero dimensions are observed before initializing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          if (!globe) {
            initGlobe(width, height)
          }
        }
      }
    })

    resizeObserver.observe(wrapper)

    // Fallback if dimensions are already available
    const rect = wrapper.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0 && !globe) {
      initGlobe(rect.width, rect.height)
    }

    // Pause animation when scrolled out of view using IntersectionObserver
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (typeof globe?.toggle === 'function') {
        globe.toggle(entry.isIntersecting)
      }
    })

    if (canvasRef.current) {
      intersectionObserver.observe(canvasRef.current)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      if (globe) {
        globe.destroy()
      }
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

export default GlobeCanvas
