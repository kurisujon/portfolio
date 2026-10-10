'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

// Brand colors
const colors: Record<string, string> = {
  "TypeScript": "#3178C6",
  "React": "#61DAFB",
  "Next.js": "#000000",
  "Tailwind CSS": "#06B6D4",
  "Python": "#3776AB",
  "Node.js": "#339939",
  "PostgreSQL": "#4169E1",
  "Docker": "#2496ED",
  "AWS": "#FF9900",
  "OpenAI": "#412991",
}

const images: Record<string, string> = {
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
}

const botSvgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" fill="none" stroke="#33343d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`)

async function loadAndFixSVG(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    if (url.startsWith('data:')) {
       img.src = url
       return
    }
    fetch(url).then(r => r.text()).then(text => {
      if (!text.includes('width=') && text.includes('<svg')) {
         text = text.replace('<svg', '<svg width="256" height="256"')
      }
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text)
    }).catch(() => {
      img.src = url
    })
  })
}

const textureCache = new Map<string, THREE.CanvasTexture>()
const shadowTextureCache = new Map<string, THREE.CanvasTexture>()

function getPlanetTexture(name: string): THREE.CanvasTexture {
  if (textureCache.has(name)) return textureCache.get(name)!
  
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  
  // 1. Pearl body - LIGHT theme
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#ffffff')
  grad.addColorStop(1, '#eeeef0')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)
  
  // 2. Bands
  const color = colors[name] || '#666666'
  ctx.fillStyle = color
  for (let i = 0; i < 7; i++) {
    // alpha 0.035 - 0.08
    ctx.globalAlpha = 0.035 + Math.random() * (0.08 - 0.035)
    const y = Math.random() * 256
    const h = 5 + Math.random() * 15
    ctx.fillRect(0, y, 512, h)
  }
  
  // 3. Ring
  ctx.globalAlpha = 0.10
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(128, 128, 76, 0, Math.PI * 2)
  ctx.stroke()
  
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  textureCache.set(name, tex)
  
  // Load logo
  const url = name === "OpenAI" ? botSvgUrl : images[name]
  if (url) {
    loadAndFixSVG(url).then(img => {
      ctx.globalAlpha = 1.0
      const size = 104
      const aspect = img.width / Math.max(1, img.height)
      let w = size
      let h = size
      if (aspect > 1) { h = size / aspect }
      else { w = size * aspect }
      ctx.drawImage(img, 128 - w / 2, 128 - h / 2, w, h)
      tex.needsUpdate = true
    })
  }
  return tex
}

function getCoreTexture(): THREE.CanvasTexture {
  if (textureCache.has('core')) return textureCache.get('core')!
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#2b2c31')
  grad.addColorStop(1, '#17181b')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)
  
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 48px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('AI', 128, 128)
  
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  textureCache.set('core', tex)
  return tex
}

function getShadowTexture(): THREE.CanvasTexture {
  if (shadowTextureCache.has('shadow')) return shadowTextureCache.get('shadow')!
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(20,20,28,0.55)')
  grad.addColorStop(1, 'rgba(20,20,28,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  
  const tex = new THREE.CanvasTexture(canvas)
  shadowTextureCache.set('shadow', tex)
  return tex
}

const sharedGeom = new THREE.SphereGeometry(1, 48, 32)
const outlineMaterial = new THREE.MeshBasicMaterial({ color: "#e0e1df", side: THREE.BackSide })

function Planet({ name, angle, radius, speed, planetRadius, setHovered }: { name: string, angle: number, radius: number, speed: number, planetRadius: number, setHovered: (v: string | null) => void }) {
  const tex = useMemo(() => getPlanetTexture(name), [name])
  const shadowTex = useMemo(() => getShadowTexture(), [])
  
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const outlineRef = useRef<THREE.Mesh>(null)
  const shadowRef = useRef<THREE.Sprite>(null)
  
  const [hover, setHover] = useState(false)
  const qParent = useMemo(() => new THREE.Quaternion(), [])
  const qWob = useMemo(() => new THREE.Quaternion(), [])
  const euler = useMemo(() => new THREE.Euler(), [])
  const vec = useMemo(() => new THREE.Vector3(), [])
  
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    // Group orbit
    if (groupRef.current) {
       groupRef.current.position.x = Math.cos(angle) * radius
       groupRef.current.position.z = Math.sin(angle) * radius
    }
    
    if (meshRef.current && groupRef.current) {
      groupRef.current.getWorldQuaternion(qParent)
      meshRef.current.quaternion.copy(qParent).invert()
      
      const phase = angle
      qWob.setFromEuler(euler.set(Math.sin(t*0.7+phase)*0.2, Math.sin(t*0.5+phase*1.3)*0.38, 0))
      meshRef.current.quaternion.multiply(qWob)
      
      // Depth scaling
      groupRef.current.getWorldPosition(vec)
      vec.project(camera)
      const depth = vec.z
      const scale = THREE.MathUtils.lerp(1.08, 0.92, (depth + 1) / 2) * (hover ? 1.15 : 1)
      
      meshRef.current.scale.setScalar(planetRadius * scale)
      if (outlineRef.current) {
        outlineRef.current.scale.setScalar(planetRadius * scale * 1.045)
      }
      
      if (shadowRef.current) {
         // Soft shadows place at world pos + offset
         const wp = new THREE.Vector3()
         groupRef.current.getWorldPosition(wp)
         shadowRef.current.position.copy(wp).add(new THREE.Vector3(0.16 * planetRadius, -0.55 * planetRadius, -1.0 * planetRadius))
         shadowRef.current.scale.setScalar(2.6 * planetRadius * scale)
         
         const t_near = 1 - (depth + 1) / 2
         shadowRef.current.material.opacity = 0.05 + 0.11 * t_near
      }
    }
  })
  
  return (
    <>
      <group ref={groupRef}>
        <mesh 
          ref={meshRef} 
          geometry={sharedGeom}
          onPointerOver={() => { setHover(true); setHovered(name); }}
          onPointerOut={() => { setHover(false); setHovered(null); }}
        >
          <meshStandardMaterial map={tex} roughness={0.42} metalness={0.12} />
        </mesh>
        <mesh ref={outlineRef} geometry={sharedGeom} material={outlineMaterial} />
        
        {hover && (
          <Billboard position={[0, planetRadius * 1.6, 0]}>
            <mesh>
              <planeGeometry args={[1.2, 0.4]} />
              <meshBasicMaterial color="#1c1d20" />
            </mesh>
            <Text fontSize={0.15} color="white" fontWeight={500} position={[0, 0, 0.01]}>{name}</Text>
          </Billboard>
        )}
      </group>
      
      {/* Absolute world space shadow sprite */}
      <sprite ref={shadowRef} material-depthWrite={false} material-fog={false} material-blending={THREE.NormalBlending}>
        <spriteMaterial map={shadowTex} color="#fff" />
      </sprite>
    </>
  )
}

function OrbitRing({ radius, color }: { radius: number, color: string }) {
  const geom = useMemo(() => {
    return new THREE.TorusGeometry(radius, 0.02, 8, 180)
  }, [radius])
  return (
    <mesh geometry={geom} rotation-x={Math.PI/2}>
      <meshBasicMaterial color={color} fog={true} />
    </mesh>
  )
}

function Scene() {
  const inner = ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  const outer = ["OpenAI", "Python", "Node.js", "PostgreSQL", "Docker", "AWS"]
  
  const coreTex = useMemo(() => getCoreTexture(), [])
  const shadowTex = useMemo(() => getShadowTexture(), [])
  
  const rootRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Group>(null)
  
  const [hovered, setHovered] = useState<string | null>(null)
  const hoverFactor = useRef(1)
  
  useFrame(({ clock, pointer }) => {
    // Mouse parallax
    const targetX = pointer.y * 0.18
    const targetY = pointer.x * 0.35
    
    if (rootRef.current) {
      rootRef.current.rotation.x += (targetX - rootRef.current.rotation.x) * 0.05
      rootRef.current.rotation.y += (targetY - rootRef.current.rotation.y) * 0.05
    }
    
    // Slow down on hover
    const targetFactor = hovered ? 0.12 : 1
    hoverFactor.current += (targetFactor - hoverFactor.current) * 0.1
    
    // Rotate rings
    if (innerRef.current) innerRef.current.rotation.y += 0.55 * hoverFactor.current * 0.016
    if (outerRef.current) outerRef.current.rotation.y += -0.34 * hoverFactor.current * 0.016
  })
  
  return (
    <group>
      <fog attach="fog" args={['#f5f5f3', 11, 30]} />
      <ambientLight intensity={2.1} color="#ffffff" />
      <directionalLight position={[-5, 6, 9]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[6, -3, 4]} intensity={0.75} color="#dfe6ff" />
      
      <group ref={rootRef}>
        <group rotation={[0.5, 0, 0]}>
          <group rotation={[-0.35, 0, 0.25]}>
            <OrbitRing radius={2.8} color="#dedfdd" />
            <group ref={innerRef}>
              {inner.map((name, i) => (
                <Planet key={name} name={name} angle={(i / inner.length) * Math.PI * 2} radius={2.8} speed={0.55} planetRadius={0.55} setHovered={setHovered} />
              ))}
            </group>
          </group>
          <group rotation={[0.50, 0, -0.40]}>
            <OrbitRing radius={4.5} color="#dedfdd" />
            <group ref={outerRef}>
              {outer.map((name, i) => (
                <Planet key={name} name={name} angle={(i / outer.length) * Math.PI * 2} radius={4.5} speed={-0.34} planetRadius={0.65} setHovered={setHovered} />
              ))}
            </group>
          </group>
          
          {/* Core */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1.4, 48, 32]} />
            <meshStandardMaterial map={coreTex} roughness={0.34} metalness={0.25} />
          </mesh>
        </group>
      </group>
      
      {/* Static Core Shadow */}
      <sprite position={[0.13, -0.5, -0.88]} scale={[2.5, 2.5, 1]} material-depthWrite={false} material-fog={false} material-blending={THREE.NormalBlending}>
        <spriteMaterial map={shadowTex} color="#fff" opacity={0.26} />
      </sprite>
    </group>
  )
}

export default function Orbit3DContainer({ fallback }: { fallback: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  
  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    
    // Check WebGL
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch(e) {
      setHasWebGL(false)
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { rootMargin: '100px' })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])
  
  if (!hasWebGL || reduceMotion) {
     return <>{fallback}</>
  }
  
  return (
    <div ref={containerRef} className="w-full h-full relative" aria-label="Orbit of technologies I work with">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 40 }}
        frameloop={isVisible ? 'always' : 'never'}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
