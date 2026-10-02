import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/Hero'
import { AboutSection } from '@/components/About'
import { TechStackSection } from '@/components/sections/TechStack'
import { ExperienceSection } from '@/components/sections/Experience'
import { ProjectsSection } from '@/components/sections/Projects'
import { ContactSection } from '@/components/Contact'

export default function Home() {
  return (
    <div className="relative w-full bg-primary">
      {/* Main content wrapper with solid black background and higher z-index to cover footer */}
      <main className="relative z-10 bg-primary min-h-screen shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>

      {/* Curtain Reveal Footer / Contact Section */}
      <footer className="sticky bottom-0 z-0 w-full min-h-screen bg-primary pointer-events-auto">
        <ContactSection />
      </footer>
    </div>
  )
}
