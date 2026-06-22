"use client"
import { motion } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'

const techCategories = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "Java"]
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Laravel"]
  },
  {
    category: "Frontend",
    items: ["Tailwind CSS", "React Native"]
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "FastAPI", "Rest APIs", "n8n"]
  },
  {
    category: "AI & ML",
    items: ["LLM Integration", "LangChain", "Qdrant", "Google Gemini",]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "Nginx", "Git", "GitHub Actions", "CI/CD"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Firebase"]
  }
]

import { ScrollReveal, revealItemVariants } from '@/components/animations/ScrollReveal'
export function TechStackSection() {
  return (
    <section
      id="skills"
      className="py-24 flex flex-col gap-16 md:gap-24"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
          Tech Stack
        </h2>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {techCategories.map((group, idx) => (
          <motion.div 
            key={idx} 
            variants={revealItemVariants}
            className="flex flex-col gap-5"
          >
            <Typography variant="small" className="uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-bold text-xs transition-colors">
              {group.category}
            </Typography>
            <div className="flex flex-wrap gap-3">
              {group.items.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] hover:bg-zinc-200 dark:hover:bg-white/5 transition-all duration-300 ease-out cursor-default"
                >
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
