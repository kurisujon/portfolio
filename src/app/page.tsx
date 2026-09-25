import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/Hero'
import { Container } from '@/components/layout/Container'
import { AboutSection } from '@/components/sections/About'
import { TechStackSection } from '@/components/sections/TechStack'
import { ExperienceSection } from '@/components/sections/Experience'
import { ProjectsSection } from '@/components/sections/Projects'
import { ContactSection } from '@/components/sections/Contact'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Main content wrapper with solid black background and higher z-index */}
      <main className="relative z-10 bg-[#0a0a0a] min-h-screen shadow-[0_40px_80px_rgba(0,0,0,0.9)] pb-12 sm:pb-16 md:pb-24">
        <Navbar />
        
        <HeroSection />
        
        <div>
          <Container>
            <div className="pb-24 flex flex-col gap-12 md:gap-24">
              <ScrollReveal delay={0.1}>
                <AboutSection />
              </ScrollReveal>
              
              <ScrollReveal delay={0.1} staggerChildren={0.15}>
                <TechStackSection />
              </ScrollReveal>
              
              <ScrollReveal delay={0.1} staggerChildren={0.2}>
                <ExperienceSection />
              </ScrollReveal>
            </div>
          </Container>
        </div>

        {/* Pinned Horizontal Projects Gallery */}
        <ProjectsSection />
      </main>

      {/* Curtain Reveal Footer / Contact Section */}
      <footer 
        className="sticky bottom-0 -z-[1] w-full min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center py-8 md:py-12 px-6"
      >
        <Container className="w-full my-auto flex flex-col justify-center items-center">
          <ContactSection />
        </Container>

        <div className="w-full border-t border-white/5 py-6 mt-auto flex justify-center items-center shrink-0">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Cris John Labiaga. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
