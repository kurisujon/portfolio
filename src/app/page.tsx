import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/Hero'
import { AboutSection } from '@/components/About'
import { TechStackSection } from '@/components/sections/TechStack'
import { ExperienceSection } from '@/components/sections/Experience'
import { ProjectsSection } from '@/components/sections/Projects'
import { CurtainReveal } from '@/components/layout/CurtainReveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cris John Labiaga | Full Stack & AI Developer',
    description: 'Full Stack & AI Developer building modern web applications, REST APIs, database-driven systems, RAG workflows, AI integrations, and automation.',
    url: '/',
    siteName: 'Cris John Labiaga',
    images: [{ url: '/portfolio_logo.png', width: 800, height: 800, alt: 'Cris John Labiaga' }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <CurtainReveal>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
    </CurtainReveal>
  )
}
