"use client"
import { motion } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'
import { Card } from '@/components/ui/Card'
import { BookOpen, Award, Terminal } from 'lucide-react'

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 flex flex-col gap-16"
    >
      <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
        Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Main Bio (No Container) */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-8">
          <Typography variant="h2" className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 dark:text-primary transition-colors tracking-tight">
            Full-Stack Developer specializing in resilient APIs and AI-driven workflows.
          </Typography>
          
          <div className="flex flex-col gap-6 border-l-2 border-[#3b82f6] pl-6 mt-4">
            <Typography variant="body" className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-secondary transition-colors">
              I am a Full-Stack Developer dedicated to building intelligent, data-centric products and automation systems.
            </Typography>
            <Typography variant="body" className="text-base md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 transition-colors">
              I specialize in architecting workflows where data-crawling and AI-driven logic are core components, delivering scalable applications that multiply team productivity and future-proof business operations.
            </Typography>
          </div>
        </div>

        {/* Right Column Grid for Education & Achievements */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Education Card */}
          <Card className="flex flex-col gap-6 p-8 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-500 ease-out rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Education</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-primary leading-snug">Bachelor of Science in Information Technology</h4>
              <p className="text-zinc-600 dark:text-secondary text-sm leading-relaxed mt-2">
                Core focus areas include Software Development, Cybersecurity, LLM Integration, and AI Agents architecture.
              </p>
            </div>
          </Card>

          {/* Achievements Card */}
          <Card className="flex flex-col gap-6 p-8 bg-zinc-50 dark:bg-surface border border-zinc-200/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-500 ease-out rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Milestones</span>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-800 dark:text-primary font-bold">Ideation Bootcamp Champion</span>
                  <span className="text-[#3b82f6] font-bold font-mono text-xs">2025</span>
                </div>
                <span className="text-zinc-500 text-sm">SalinKaalaman (Language Barrier Solution)</span>
              </div>
              
              <div className="w-full h-px bg-zinc-200 dark:bg-white/5"></div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-800 dark:text-primary font-bold">SIA Top 5 Best Project</span>
                  <span className="text-[#3b82f6] font-bold font-mono text-xs">2025</span>
                </div>
                <span className="text-zinc-500 text-sm">CHoDaMS - City Housing Data System</span>
              </div>
              
              <div className="w-full h-px bg-zinc-200 dark:bg-white/5"></div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-800 dark:text-primary font-bold">CODECRAFT Top 5 Mobile</span>
                  <span className="text-[#3b82f6] font-bold font-mono text-xs">2023</span>
                </div>
                <span className="text-zinc-500 text-sm">Eathink About It Mobile</span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  )
}
