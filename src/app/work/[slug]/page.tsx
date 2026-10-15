import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { CurtainReveal } from '@/components/layout/CurtainReveal'
import { CaseStudyLayout } from '@/components/case-study/CaseStudyLayout'
import { projectData } from '@/data/projects'

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug as keyof typeof projectData]

  if (!project) notFound()

  return (
    <CurtainReveal>
      <Navbar />
      <CaseStudyLayout project={project} />
    </CurtainReveal>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug as keyof typeof projectData]
  
  if (!project) return { title: 'Project Not Found — Cris John Labiaga' }

  return {
    title: `${project.name} — Cris John Labiaga`,
    description: project.tagline || '',
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${project.name} — Cris John Labiaga`,
      description: project.tagline || '',
      url: `https://www.webcris.dev/work/${slug}`,
      siteName: 'Cris John Labiaga',
      images: project.heroImage ? [project.heroImage] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Cris John Labiaga`,
      description: project.tagline || '',
      images: project.heroImage ? [project.heroImage] : [],
    }
  }
}
