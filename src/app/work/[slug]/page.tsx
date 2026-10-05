import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { ContactSection } from '@/components/Contact'
import { CaseStudyLayout } from '@/components/case-study/CaseStudyLayout'
import { projectData } from '@/data/projects'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug as keyof typeof projectData]

  if (!project) notFound()

  return (
    <div className="relative w-full bg-primary">
      <main className="relative z-10 bg-[#f5f5f3] min-h-screen shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
        <Navbar />
        <CaseStudyLayout project={project} />
      </main>

      <footer className="sticky bottom-0 z-0 w-full min-h-screen bg-primary pointer-events-auto">
        <ContactSection />
      </footer>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug as keyof typeof projectData]
  
  if (!project) return { title: 'Project Not Found — Cris John Labiaga' }

  return {
    title: `${project.title} — Cris John Labiaga`,
    description: project.overview || project.subtitle || '',
    openGraph: {
      images: project.heroImage ? [project.heroImage] : [],
    }
  }
}
