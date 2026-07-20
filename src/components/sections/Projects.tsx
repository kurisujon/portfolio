"use client"
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'
import { Card } from '@/components/ui/Card'
import { X, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react'

// Custom SVG Icons for Brand logos as they are missing in the current lucide-react version
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const projectsData = [
  { 
    id: 1,
    title: "Studflow", 
    image: "/studflow_preview.jpg",
    description: "An AI-powered web application that transforms study documents into summaries, flashcards, quizzes, and notes.",
    longDescription: "A comprehensive application integrating Next.js, FastAPI, Celery, and Gemini. It transforms study documents into interactive learning workflows using Large Language Models to generate summaries, flashcards, quizzes, and an AI-explained interactive study workspace.",
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "Celery", "Redis", "Gemini"],
    features: ["Asynchronous document processing", "AI-generated quizzes & flashcards", "Interactive study workspace", "Clerk Authentication"],
    liveUrl: "https://studflow.webcris.dev/",
    githubUrl: "https://github.com/Kurisujon/studflow"
  },
  { 
    id: 2,
    title: "Veldra", 
    image: "/veldra_preview.jpg",
    description: "A Smart Document Verification Platform tailored for checking student visa application documents.",
    longDescription: "It automates the extraction and cross-referencing of critical data across documents using Next.js and Supabase, streamlining the student visa verification process.",
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
    features: ["Automated data extraction", "Cross-referencing documents", "Smart verification workflows"],
    liveUrl: "https://veldra-sand.vercel.app/",
    githubUrl: "https://github.com/kurisujon/veldra.git"
  },
  { 
    id: 3,
    title: "Project Gamma", 
    image: "/gamma_preview.jpg",
    description: "Minimalist task management system with offline capabilities.",
    longDescription: "A productivity tool that focuses on speed and simplicity. It works fully offline and syncs automatically when a connection is restored, ensuring you never lose your flow.",
    technologies: ["TypeScript", "PWA", "IndexedDB", "Framer Motion"],
    features: ["Offline-first architecture", "Drag-and-drop workflow", "Smart notification system"],
    liveUrl: "#",
    githubUrl: "#"
  },
  { 
    id: 4,
    title: "Project Delta", 
    image: "/delta_preview.jpg",
    description: "Automated workflow engine integrating multiple third-party APIs.",
    longDescription: "A powerful automation platform that connects your favorite tools. Build complex multi-step workflows with a visual builder and monitor executions in real-time.",
    technologies: ["Laravel", "Inertia.js", "Vue.js", "AWS"],
    features: ["Visual flow builder", "Webhook integration", "Error recovery automation"],
    liveUrl: "#",
    githubUrl: "#"
  }
]

export function ProjectsSection() {
  const [activeId, setActiveId] = useState<number | null>(null)

  // Sort projects so the active one is at the top, but preserve relative order of others
  const displayProjects = activeId 
    ? [
        projectsData.find(p => p.id === activeId)!,
        ...projectsData.filter(p => p.id !== activeId)
      ]
    : projectsData;

  const handleToggle = (id: number) => {
    if (activeId === id) {
      setActiveId(null)
    } else {
      setActiveId(id)
      // Smoothly scroll to the top of the projects section when opening
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section 
      id="projects"
      className="py-24 flex flex-col gap-12"
    >
      <div className="flex justify-between items-end">
        <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
        <AnimatePresence mode="popLayout">
          {displayProjects.map((project) => {
            const isExpanded = activeId === project.id
            const isSecondary = activeId !== null && !isExpanded

            return (
              <motion.div
                key={project.id}
                layout
                initial={false}
                animate={{
                  opacity: isSecondary ? 0.3 : 1,
                  scale: isSecondary ? 0.98 : 1,
                  zIndex: isExpanded ? 20 : 1
                }}
                transition={{
                  layout: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className={`${isExpanded ? 'md:col-span-2 order-first' : ''}`}
              >
                <Card className={`relative flex flex-col gap-5 h-full bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 transition-all duration-500 ease-out overflow-hidden ${isExpanded ? 'p-8 border-zinc-300 dark:border-white/20 ring-1 ring-zinc-300/50 dark:ring-white/10 shadow-2xl bg-zinc-100/50 dark:bg-white/[0.04]' : 'p-0'}`}>
                  
                  {/* Project Preview Image */}
                  <motion.div
                    layout="position"
                    className={`relative w-full overflow-hidden transition-all duration-500 ${isExpanded ? 'h-56 md:h-80 rounded-xl ring-1 ring-zinc-200/50 dark:ring-white/10 shrink-0' : 'h-44'}`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className={`object-cover object-top transition-transform duration-700 ${!isExpanded ? 'group-hover:scale-105' : ''}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {!isExpanded && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-50 dark:to-[#171717]" />
                    )}
                  </motion.div>

                  {/* Card content wrapper with padding */}
                  <div className={`flex flex-col gap-5 flex-1 ${isExpanded ? '' : 'px-6 pb-6'}`}>
                  
                  {/* Close/Minimize Button */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setActiveId(null)}
                        className="absolute top-6 right-6 p-2 rounded-full bg-zinc-200/50 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-600 dark:text-zinc-400 transition-colors z-30"
                      >
                        <X size={18} />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div className={`flex flex-col gap-2 ${isExpanded ? 'md:flex-row md:justify-between md:items-start md:gap-12' : ''}`}>
                    <div className="flex flex-col gap-4 flex-1">
                      <motion.div layout="position">
                        <Typography variant="h3" className={`text-zinc-900 dark:text-white font-bold transition-all duration-700 ${isExpanded ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                          {project.title}
                        </Typography>
                      </motion.div>
                      
                      <motion.div layout className="relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={isExpanded ? 'expanded' : 'collapsed'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Typography variant="body" className={`leading-relaxed text-zinc-600 dark:text-zinc-400 ${isExpanded ? 'text-lg md:text-xl max-w-2xl' : ''}`}>
                              {isExpanded ? project.longDescription : project.description}
                            </Typography>
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-col gap-10 mt-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Key Features */}
                            <div className="flex flex-col gap-4">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Key Features</h4>
                              <ul className="flex flex-col gap-3">
                                {project.features.map((feature, i) => (
                                  <li key={i} className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-300">
                                    <div className="w-1 h-1 rounded-full bg-zinc-400" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-col gap-4">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <span key={tech} className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-zinc-200/50 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-zinc-200 dark:border-white/5">
                            {project.liveUrl && project.liveUrl !== "#" && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#3b82f6] text-white px-8 py-3.5 rounded-md text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[#3b82f6]/20">
                                <ExternalLink size={16} />
                                Live Project
                              </a>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-900 dark:text-white px-8 py-3.5 rounded-md text-sm font-bold transition-all active:scale-95">
                                <GithubIcon size={16} />
                                View Source
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {!isExpanded && (
                    <motion.div layout="position" className="pt-4 mt-auto px-6 pb-6">
                      <button 
                        onClick={() => handleToggle(project.id)}
                        className="group flex items-center gap-2 bg-transparent border border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/40 text-zinc-900 dark:text-white px-6 py-2.5 text-sm rounded-full transition-all font-medium active:scale-95"
                      >
                        View Details
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </motion.div>
                  )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
