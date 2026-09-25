'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ExternalLink, ArrowRight } from 'lucide-react'
import { Magnetic } from '@/components/ui/MagneticButton'

const GithubIcon = ({ size = 18 }: { size?: number }) => (
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

export const projectsData = [
  { 
    id: 1,
    number: "01",
    title: "Veldra",
    role: "Full Stack AI Software Developer",
    image: "/veldra_preview.png",
    imageClassName: "object-cover object-top",
    tagline: "Enterprise document verification & anomaly detection platform for visa workflows.",
    description: "A smart document verification platform engineered for student visa applications. It automates structured extraction from PSA birth certificates, academic transcripts, and diplomas, employing a cross-document comparison engine to detect timeline, name, and record discrepancies.",
    longDescription: "Architected an enterprise-grade document verification platform using Next.js and Supabase tailored for high-stakes student visa applications. Integrates Google Gemini structured extraction and OCR to ingest PSA birth certificates, academic transcripts, and diplomas. A cross-document comparison engine systematically cross-references dates, personal identifiers, and academic records to flag inconsistencies with source citations, while automated workflows generate legally formatted Affidavits of Discrepancy, Explanation Letters, and audit-ready verification packages.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Google Gemini", "OCR", "Zod", "Tailwind CSS"],
    features: [
      "Cross-Document Comparison Engine across multi-source records",
      "Structured Extraction for PSA Birth Certificates, Transcripts & Diplomas",
      "Automated Discrepancy Detection with severity levels & source citations",
      "Automated Legal Draft Generation (Affidavits & Explanation Letters)",
      "Comprehensive verification reports & exportable package bundles"
    ],
    liveUrl: "https://veldra-sand.vercel.app/",
    githubUrl: "https://github.com/kurisujon/veldra"
  },
  { 
    id: 2,
    number: "02",
    title: "StudFlow",
    role: "Full Stack AI Software Developer",
    image: "/studflow_preview.png",
    imageClassName: "object-cover object-top",
    tagline: "Asynchronous learning platform with document-grounded RAG & pgvector embeddings.",
    description: "An AI-powered study workflow platform that transforms PDF and DOCX learning materials into structured, interactive study sessions. Built with Next.js and a FastAPI backend featuring asynchronous Celery processing, generating AI summaries, flashcards, and quizzes.",
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
    number: "03",
    title: "CHoDaMS Web",
    role: "Full Stack Developer",
    image: "/images/projects/chodams-web/chodams-portfolio-cover-v2.png",
    imageClassName: "object-cover object-top bg-white",
    tagline: "Municipal housing allocation platform with Weighted Scoring & geospatial analysis.",
    description: "A multi-layered city housing data and relocation management platform powered by PHP and MariaDB. Features a custom Weighted Scoring Algorithm that automates applicant eligibility calculations based on socio-economic, demographic, and hazard zone metrics.",
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
    number: "04",
    title: "CHoDaMS Mobile",
    role: "Full Stack Developer",
    image: "/images/projects/chodams-mobile/cover-dashboard-gps.png",
    imageClassName: "object-cover object-center",
    tagline: "Offline-first Android census application with bi-directional syncing & GPS.",
    description: "An offline-first Android field census application developed with Flutter and SQLite for disconnected survey operations. Employs a custom bi-directional synchronization algorithm to reliably buffer field data and sync with the central MariaDB backend when online.",
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return -(trackWidth - viewportWidth + 96)
      }

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-screen max-h-screen bg-[#0a0a0a] flex flex-col justify-between overflow-hidden py-4 sm:py-6"
    >
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-2 sm:mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2 shrink-0">
        <div>
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#3b82f6] uppercase">
            Selected Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-0.5">
            Engineering & Systems
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md hidden sm:block">
          Horizontal gallery showcasing end-to-end applications, distributed backends, and AI pipelines. Scroll down to travel through projects.
        </p>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex flex-row items-center gap-6 sm:gap-8 px-6 md:px-12 w-max will-change-transform my-auto"
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="w-[85vw] sm:w-[480px] md:w-[540px] lg:w-[580px] shrink-0 flex flex-col relative z-30 pointer-events-auto h-[75vh] max-h-[570px] min-h-[450px]"
          >
            <div className="group relative z-30 flex flex-col justify-between h-full bg-[#141414] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-5 sm:p-6 overflow-hidden shadow-2xl">
              
              {/* Card Top: Number, Title, and Role - Clickable to open Case Study */}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="relative z-50 pointer-events-auto cursor-pointer text-left w-full flex flex-col gap-2.5 focus:outline-none"
                aria-label={`Open case study for ${project.title}`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    {project.number} / 04
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3b82f6] bg-[#3b82f6]/10 px-3 py-0.5 rounded-full border border-[#3b82f6]/20">
                    {project.role}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#3b82f6] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>
              </button>

              {/* Card Center: Project Preview Image - Clickable button to open Case Study */}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="relative z-50 pointer-events-auto cursor-pointer w-full h-36 sm:h-44 md:h-48 my-3 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 group/img focus:outline-none shrink-0"
                aria-label={`View ${project.title} case study`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className={`${project.imageClassName} transition-transform duration-700 ease-out group-hover/img:scale-105`}
                  sizes="(max-width: 768px) 85vw, 580px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </button>

              {/* Card Bottom: Technologies & Actions */}
              <div className="flex flex-col gap-3.5 mt-auto relative z-50 pointer-events-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium rounded-md bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-zinc-500">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 relative z-50 pointer-events-auto">
                  <div className="flex items-center gap-2.5 relative z-50 pointer-events-auto">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <Magnetic className="relative z-50 pointer-events-auto cursor-pointer">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-50 pointer-events-auto cursor-pointer inline-flex items-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all shadow-md shadow-blue-500/15"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </a>
                      </Magnetic>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Magnetic className="relative z-50 pointer-events-auto cursor-pointer">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-50 pointer-events-auto cursor-pointer inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                        >
                          <GithubIcon size={13} />
                          Code
                        </a>
                      </Magnetic>
                    )}
                  </div>

                  <Magnetic className="relative z-50 pointer-events-auto cursor-pointer">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="relative z-50 pointer-events-auto cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 px-1.5"
                    >
                      <span>Full Case Study</span>
                      <ArrowRight size={13} />
                    </button>
                  </Magnetic>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-50 pointer-events-auto w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#171717] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col gap-6 text-white"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
                  {selectedProject.role}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className={selectedProject.imageClassName}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Architectural Summary
                </h4>
                <p className="text-zinc-300 text-base leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Key Features & Capabilities
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 text-zinc-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10 relative z-50 pointer-events-auto">
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <Magnetic className="relative z-50 pointer-events-auto cursor-pointer">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-50 pointer-events-auto cursor-pointer inline-flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-md text-sm font-semibold transition-all"
                    >
                      <ExternalLink size={16} />
                      Live Project
                    </a>
                  </Magnetic>
                )}
                {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                  <Magnetic className="relative z-50 pointer-events-auto cursor-pointer">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-50 pointer-events-auto cursor-pointer inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-md text-sm font-semibold transition-all border border-white/10"
                    >
                      <GithubIcon size={16} />
                      View Source
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsSection
