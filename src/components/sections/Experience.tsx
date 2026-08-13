"use client"
import { motion, type Variants } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'

const experiences = [
  {
    role: "OJT Backend Developer",
    company: "Infosoft Tech Solutions · Davao City, Philippines",
    duration: "January 2026 - Present",
    description: "Contributed to the development and maintenance of government LTS platforms for Tagum, Panabo, and Davao de Oro, supporting frontend interfaces, backend workflows, REST API integrations, relational data handling, testing, debugging, and system maintenance.",
  },
  {
    role: "Full Stack Developer — Independent Projects",
    company: "Independent & Academic Projects",
    duration: "2023 - Present",
    description: "Architected and built full-stack applications through independent and academic projects, working across frontend interfaces, backend APIs, databases, deployment, AI integrations, and automation. Projects include Veldra, StudFlow, and CHoDaMS.",
  }
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
    }
  }
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-24 flex flex-col gap-16"
    >
      <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
        Experience
      </h2>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Glowing Vertical Line */}
        <div className="absolute left-[11px] md:left-[19px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-[#3b82f6] via-zinc-200 dark:via-default to-transparent"></div>

        <div className="flex flex-col gap-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="relative pl-12 md:pl-20 group"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute left-[5px] md:left-[13px] top-2 w-[14px] h-[14px] rounded-full bg-white dark:bg-surface border-2 border-[#3b82f6] group-hover:bg-[#3b82f6] transition-colors duration-300 z-10">
                <div className="absolute inset-0 rounded-full bg-[#3b82f6] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] font-mono text-xs font-bold w-fit">
                  {exp.duration}
                </span>
                
                <div className="flex flex-col mt-2">
                  <Typography variant="h3" className="text-zinc-900 dark:text-primary font-bold text-2xl md:text-3xl transition-colors">
                    {exp.role}
                  </Typography>
                  <Typography variant="body" className="text-zinc-500 dark:text-zinc-400 font-medium mt-1 transition-colors">
                    {exp.company}
                  </Typography>
                </div>

                <Typography variant="body" className="mt-4 leading-relaxed text-zinc-600 dark:text-secondary transition-colors text-lg">
                  {exp.description}
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
