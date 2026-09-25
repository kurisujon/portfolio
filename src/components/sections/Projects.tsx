"use client"
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'
import { Card } from '@/components/ui/Card'
import { X, ExternalLink, ChevronRight } from 'lucide-react'

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
    title: "Veldra",
    role: "Full Stack AI Software Developer",
    image: "/veldra_preview.png",
    imageClassName: "object-cover object-top",
    description: "A smart document verification platform engineered for student visa applications. It automates structured extraction from PSA birth certificates, academic transcripts, and diplomas, employing a cross-document comparison engine to detect timeline, name, and record discrepancies. Features automated findings generation with severity ratings and legal draft preparation such as Affidavits of Discrepancy.",
    longDescription: "Architected an enterprise-grade document verification platform using Next.js and Supabase tailored for high-stakes student visa applications. Integrates Google Gemini structured extraction and OCR to ingest PSA birth certificates, academic transcripts, and diplomas. A cross-document comparison engine systematically cross-references dates, personal identifiers, and academic records to flag inconsistencies with source citations, while automated workflows generate legally formatted Affidavits of Discrepancy, Explanation Letters, and audit-ready verification packages.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Google Gemini", "OCR", "Zod", "Tailwind CSS"],
    features: [
      "Cross-Document Comparison Engine across multi-source records",
      "Structured Extraction for PSA Birth Certificates, Transcripts & Diplomas",
      "Automated Discrepancy Detection with severity levels & source citations",
      "Automated Legal Draft Generation (Affidavits of Discrepancy & Explanation Letters)",
      "Comprehensive verification reports & exportable package bundles"
    ],
    liveUrl: "https://veldra-sand.vercel.app/",
    githubUrl: "https://github.com/kurisujon/veldra"
  },
  { 
    id: 2,
    title: "StudFlow",
    role: "Full Stack AI Software Developer",
    image: "/studflow_preview.png",
    imageClassName: "object-cover object-top",
    description: "An AI-powered study workflow platform that transforms PDF and DOCX learning materials into structured, interactive study sessions. Built with Next.js and a FastAPI backend featuring asynchronous Celery processing, it generates AI summaries, flashcards, and quizzes. Employs document-grounded RAG with pgvector embeddings to provide source-backed explanations, note annotations, and contextual learning videos.",
    longDescription: "Engineered an asynchronous, document-grounded learning platform structured as a monorepo with Next.js 16 and FastAPI (Python 3.12). Background workers powered by Celery and Redis process uploaded PDF and DOCX documents to generate structured summaries, adaptive flashcards, and comprehensive quizzes. Implements a semantic RAG pipeline using Gemini embeddings and PostgreSQL pgvector cosine similarity search, enabling grounded AI explanations, interactive in-document annotations, study history tracking, and YouTube learning integrations.",
    technologies: ["Next.js 16", "React 19", "FastAPI", "Python 3.12", "PostgreSQL", "pgvector", "Celery", "Redis", "Google Gemini", "Clerk"],
    features: [
      "Document-Grounded RAG via Gemini embeddings & pgvector cosine retrieval",
      "Asynchronous background processing pipeline with Celery & Redis",
      "Automated generation of structured summaries, flashcards & quizzes",
      "Interactive study workspace with highlights, notes & explain-with-AI tools",
      "Contextual YouTube learning video suggestions & persistent AI study history"
    ],
    liveUrl: "https://studflow.webcris.dev/",
    githubUrl: "https://github.com/kurisujon/studflow"
  },
  { 
    id: 3,
    title: "CHoDaMS Web",
    role: "Full Stack Developer",
    image: "/images/projects/chodams-web/chodams-portfolio-cover-v2.png",
    imageClassName: "object-cover object-top bg-white",
    description: "A multi-layered city housing data and relocation management platform powered by PHP and MariaDB. Features a custom Weighted Scoring Algorithm that automates applicant eligibility calculations based on socio-economic, demographic, and hazard zone metrics. Integrates real-time geospatial mapping using KML/GeoJSON polygons to manage project site boundaries, lot allocations, HOA records, and post-relocation monitoring.",
    longDescription: "Developed a centralized administrative and decision-support web platform for city housing and relocation operations. Implements an automated Weighted Scoring Algorithm to objectively evaluate beneficiary eligibility across socio-economic indicators, living conditions, and hazard vulnerability. Incorporates interactive geospatial visualization via KML/GeoJSON boundaries to track city relocation zones, HOA structures, lot assignments, and policy revocations, supported by dynamic analytics dashboards filtering intricate demographic data.",
    technologies: ["PHP", "MariaDB", "RESTful API", "JavaScript", "Tailwind CSS", "GeoJSON / KML"],
    features: [
      "Custom Weighted Scoring Algorithm for automated eligibility computation",
      "Interactive geospatial mapping using KML & GeoJSON polygon boundaries",
      "Beneficiary evaluation, lot assignment & post-relocation compliance tracking",
      "Dynamic socio-economic analytics dashboards with demographic filtering",
      "HOA officer management & policy revocation administration"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/kurisujon/chodams_web"
  },
  { 
    id: 4,
    title: "CHoDaMS Mobile",
    role: "Full Stack Developer",
    image: "/images/projects/chodams-mobile/cover-dashboard-gps.png",
    imageClassName: "object-cover object-center",
    description: "An offline-first Android field census application developed with Flutter and SQLite for disconnected survey operations. Employs a custom bi-directional synchronization algorithm to reliably buffer field data and sync with the central MariaDB backend when online. Integrates hardware sensors for high-accuracy GPS geo-tagging, camera capture for household verification, digital e-signatures, and Excel backup export.",
    longDescription: "Engineered an offline-first mobile field application in Dart/Flutter designed for zero-connectivity municipal census operations. Built with a local SQLite architecture guaranteeing data preservation in remote areas, paired with a custom bi-directional synchronization algorithm that resolves state and securely transmits buffered survey payloads, photo evidence, and digital e-signatures to the central web platform. Deeply integrates device hardware for meter-accurate GPS geo-tagging and provides local Excel exports for redundant field data safety.",
    technologies: ["Flutter", "Dart", "SQLite", "PHP REST API", "MariaDB", "Android SDK"],
    features: [
      "Offline-first survey collection guaranteeing zero data loss in remote areas",
      "Custom bi-directional state-managed synchronization algorithm",
      "Hardware-integrated high-precision GPS geo-tagging & camera verification",
      "Interactive digital e-signature capture for respondent authentication",
      "Local Excel dataset export for physical & offline backup redundancy"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/kurisujon/chodams_mobile"
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
                whileHover={!isExpanded ? { y: -5 } : undefined}
                transition={{
                  layout: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 0.25, ease: "easeOut" }
                }}
                className={`${isExpanded ? 'md:col-span-2 order-first' : ''}`}
              >
                <Card className={`group relative flex flex-col gap-5 h-full bg-zinc-50 dark:bg-surface border border-zinc-200/80 dark:border-white/10 transition-colors duration-300 overflow-hidden ${isExpanded ? 'p-8 border-zinc-300 dark:border-white/20 ring-1 ring-zinc-300/50 dark:ring-white/10 shadow-2xl bg-zinc-100/50 dark:bg-white/[0.04]' : 'p-0 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]'}`}>
                  
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

                  <div className={`flex flex-col gap-6 ${isExpanded ? '' : 'h-full'}`}>
                    
                    {/* Top Row: Image & Title/Desc */}
                    <div className={`flex flex-col ${isExpanded ? 'md:flex-row-reverse md:justify-between md:items-start md:gap-12' : 'h-full gap-5'}`}>
                      
                      {/* Unified Single Image Node (eliminates glitch) */}
                      <motion.div
                        layout
                        className={`relative overflow-hidden shrink-0 origin-top bg-zinc-900 ${
                          isExpanded 
                            ? 'w-full md:w-[45%] lg:w-[50%] h-64 md:h-[450px] rounded-xl ring-1 ring-zinc-200/50 dark:ring-white/10 mt-4 md:mt-0' 
                            : 'w-full h-44'
                        }`}
                      >
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className={`${project.imageClassName} transition-transform duration-500 ease-out group-hover:scale-105`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {!isExpanded && (
                          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent 30% to-zinc-50 dark:to-surface" />
                        )}
                      </motion.div>

                      {/* Content Wrapper */}
                      <div className={`flex flex-col gap-4 flex-1 ${isExpanded ? '' : 'px-6'}`}>
                        <motion.div layout="position">
                          <Typography variant="h3" className={`text-zinc-900 dark:text-white font-bold ${isExpanded ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                            {project.title}
                          </Typography>
                          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3b82f6]">
                            {project.role}
                          </p>
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
                              <Typography variant="body" className={`text-justify leading-relaxed text-zinc-600 dark:text-zinc-400 ${isExpanded ? 'text-lg md:text-xl max-w-2xl' : ''}`}>
                                {isExpanded ? project.longDescription : project.description}
                              </Typography>
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>
                      </div>

                    </div>

                    {/* Bottom Row: Features, Tech Stack, and Buttons */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-8 mt-4 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Key Features */}
                            <div className="flex flex-col gap-4">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Key Features</h4>
                              <ul className="flex flex-col gap-3">
                                {project.features.map((feature, i) => (
                                  <li key={i} className="flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-300">
                                    <div className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
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
                    </AnimatePresence>

                    {/* View Details Button (Only in collapsed state) */}
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
