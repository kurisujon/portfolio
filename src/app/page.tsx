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
    <main className="flex flex-col min-h-screen">
      <Navbar />
      
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      
      <div>
        <Container>
          <div className="pb-24 flex flex-col gap-12 md:gap-24 overflow-hidden">
            <ScrollReveal delay={0.1}>
              <AboutSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1} staggerChildren={0.15}>
              <TechStackSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1} staggerChildren={0.2}>
              <ExperienceSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1} staggerChildren={0.15}>
              <ProjectsSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <ContactSection />
            </ScrollReveal>
          </div>
        </Container>
      </div>

      <footer className="w-full border-t border-zinc-200 dark:border-white/5 py-8 mt-auto flex justify-center items-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} John Cris Labiaga. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
