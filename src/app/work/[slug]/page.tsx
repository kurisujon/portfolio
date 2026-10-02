import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const projectData = {
  'veldra': {
    title: 'VELDRA',
    role: 'Full Stack AI Software Developer',
    description: 'Smart document verification platform for student visa workflows.',
    heroImage: '/veldra_preview.png',
    overview: 'Veldra is an operational software system designed to automate and secure student visa workflows. It focuses on deterministic verification rather than generic AI chatbots.',
    problem: 'Manual verification of student visa documents, sponsor cross-referencing, and discrepancy identification is error-prone and time-consuming.',
    responsibilities: 'Frontend development, Backend architecture, RAG integration, Document validation pipelines.',
    technologies: ['Next.js', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
    nextProject: 'studflow',
    nextTitle: 'STUDFLOW'
  },
  'studflow': {
    title: 'STUDFLOW',
    role: 'Full Stack AI Developer',
    description: 'AI-powered, document-grounded learning platform.',
    heroImage: '/studflow_preview.png',
    overview: 'StudFlow transforms static documents into interactive, AI-grounded learning experiences with high reliability.',
    problem: 'Document to AI pipelines are notoriously unreliable without proper context selection and validation.',
    responsibilities: 'Document extraction, Chunking, Retrieval systems, Grounded AI response generation, Validation fallbacks.',
    technologies: ['RAG', 'PostgreSQL', 'LangChain', 'Next.js', 'Docker'],
    nextProject: 'chodams-web',
    nextTitle: 'CHoDaMS WEB'
  },
  'chodams-web': {
    title: 'CHoDaMS WEB',
    role: 'Full Stack Developer',
    description: 'City Housing Data Management System.',
    heroImage: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png',
    overview: 'An award-winning platform for local government housing operations, featuring automated eligibility scoring and geospatial analytics.',
    problem: 'Manual housing beneficiary evaluation lacks standardization and geospatial context.',
    responsibilities: 'Web application architecture, Eligibility scoring algorithms, Geospatial data integration.',
    technologies: ['React', 'Geospatial Analytics', 'SQL', 'PHP', 'Laravel'],
    nextProject: 'chodams-mobile',
    nextTitle: 'CHoDaMS MOBILE'
  },
  'chodams-mobile': {
    title: 'CHoDaMS MOBILE',
    role: 'Mobile Developer',
    description: 'Offline-first mobile data collection for field census workflows.',
    heroImage: '/images/projects/chodams-mobile/cover-dashboard-gps.png',
    overview: 'Companion mobile app for CHoDaMS designed to collect reliable field information in low-connectivity areas.',
    problem: 'Field census workers often lose internet connectivity, breaking standard data collection tools.',
    responsibilities: 'Offline-first architecture, Local database sync, Mobile UI development.',
    technologies: ['Dart', 'Flutter', 'Local DB', 'REST APIs'],
    nextProject: 'veldra',
    nextTitle: 'VELDRA'
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+ (App Router standard behavior for async components)
  const { slug } = await params;
  const project = projectData[slug as keyof typeof projectData]

  if (!project) notFound()

  return (
    <main className="relative z-10 bg-primary min-h-screen pb-12 sm:pb-16 md:pb-24">
      {/* Navbar space filler */}
      <div className="h-32 w-full"></div>
      
      <article className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-24">
        {/* Project Hero */}
        <div className="flex flex-col gap-8 pt-12">
          <h1 className="text-5xl md:text-[8vw] font-snellenberg font-medium text-white tracking-tighter uppercase leading-none">
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-8 justify-between border-t border-default pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary">Role</span>
              <span className="text-lg text-white font-snellenberg">{project.role}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary">Technologies</span>
              <span className="text-lg text-white font-snellenberg">{project.technologies.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[80vh] rounded-md overflow-hidden bg-surface border border-default">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Case Study Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-default pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono tracking-[0.2em] uppercase text-secondary">Overview</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-12">
            <p className="text-2xl md:text-4xl text-white font-snellenberg leading-snug">
              {project.overview}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-default pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono tracking-[0.2em] uppercase text-secondary">Problem & Context</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl text-secondary font-snellenberg leading-relaxed">
              {project.problem}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-default pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono tracking-[0.2em] uppercase text-secondary">Responsibilities</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl text-secondary font-snellenberg leading-relaxed">
              {project.responsibilities}
            </p>
          </div>
        </div>
      </article>

      {/* Next Project Footer */}
      <div className="w-full mt-32 border-t border-default">
        <Link href={`/work/${project.nextProject}`} className="block w-full group py-32 bg-surface hover:bg-elevated transition-colors text-center">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-secondary mb-4 block">Next Project</span>
          <h2 className="text-5xl md:text-[8vw] font-snellenberg font-medium text-white tracking-tighter uppercase leading-none group-hover:scale-105 transition-transform duration-500">
            {project.nextTitle}
          </h2>
        </Link>
      </div>
    </main>
  )
}
