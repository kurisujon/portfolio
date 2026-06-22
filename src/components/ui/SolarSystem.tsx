"use client"
import {
  Code2,
  Database,
  Cloud,
  Terminal,
  Cpu,
  Layers,
  Server,
  Globe,
  MonitorSmartphone,
  Box,
  BrainCircuit,
  Container
} from 'lucide-react'

const innerRingNodes = [
  { icon: Code2, label: "Next.js" },
  { icon: Terminal, label: "TypeScript" },
  { icon: Layers, label: "React" },
  { icon: Database, label: "PostgreSQL" },
]

const outerRingNodes = [
  { icon: Globe, label: "FastAPI" },
  { icon: BrainCircuit, label: "LangChain" },
  { icon: Cloud, label: "AWS" },
  { icon: Server, label: "Node.js" },
  { icon: Box, label: "Docker" },
  { icon: MonitorSmartphone, label: "Tailwind" },
  { icon: Container, label: "Qdrant" },
  { icon: Cpu, label: "Gemini" },
]

export function SolarSystem() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center group overflow-visible">
      {/* AI Core */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-elevated border border-default flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.2)]">
        <div className="w-16 h-16 rounded-full bg-[#ea580c]/10 flex items-center justify-center animate-pulse">
          <BrainCircuit className="w-8 h-8 text-[#ea580c]" />
        </div>
      </div>

      {/* Inner Ring (Radius 120px => Diameter 240px) */}
      <div className="absolute w-[240px] h-[240px] rounded-full border border-default/30 animate-orbit group-hover:[animation-play-state:paused]">
        {innerRingNodes.map((node, i) => {
          const angle = (i * 360) / innerRingNodes.length;
          return (
            <div 
              key={node.label}
              className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6"
              style={{ transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)` }}
            >
              <div className="w-full h-full rounded-full bg-surface border border-default flex items-center justify-center hover:scale-110 hover:border-accent-muted transition-transform shadow-lg animate-counter-orbit group-hover:[animation-play-state:paused] group/node cursor-pointer">
                 <node.icon className="w-5 h-5 text-text-secondary group-hover/node:text-text-primary group-hover/node:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
                 {/* Tooltip */}
                 <span className="absolute -top-10 bg-elevated text-primary text-xs px-2 py-1 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-default">
                   {node.label}
                 </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Outer Ring (Radius 200px => Diameter 400px) */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-default/20 animate-orbit-slow group-hover:[animation-play-state:paused]">
        {outerRingNodes.map((node, i) => {
          const angle = (i * 360) / outerRingNodes.length;
          return (
            <div 
              key={node.label}
              className="absolute top-1/2 left-1/2 w-14 h-14 -mt-7 -ml-7"
              style={{ transform: `rotate(${angle}deg) translateY(-200px) rotate(-${angle}deg)` }}
            >
              <div className="w-full h-full rounded-full bg-surface border border-default flex items-center justify-center hover:scale-110 hover:border-accent-muted transition-transform shadow-lg animate-counter-orbit-slow group-hover:[animation-play-state:paused] group/node cursor-pointer">
                 <node.icon className="w-6 h-6 text-text-secondary group-hover/node:text-text-primary group-hover/node:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
                 {/* Tooltip */}
                 <span className="absolute -top-10 bg-elevated text-primary text-xs px-2 py-1 rounded opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-default">
                   {node.label}
                 </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
