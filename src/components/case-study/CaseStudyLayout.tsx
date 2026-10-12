'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from '@/lib/motion'
import type { Project } from '@/data/projects'

export function CaseStudyLayout({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const titleInner = hero.querySelector('.hero-title-inner')
    const tagline = hero.querySelector('.hero-tagline')
    const buttons = hero.querySelector('.hero-buttons')
    const imageContainer = hero.querySelector('.hero-image-container')
    const image = hero.querySelector('.hero-image')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      if (titleInner) gsap.set(titleInner, { yPercent: 105, opacity: 0 })
      if (tagline) gsap.set(tagline, { opacity: 0, y: 15 })
      if (buttons) gsap.set(buttons, { opacity: 0, y: 15 })
      if (imageContainer) gsap.set(imageContainer, { opacity: 0, y: 20 })
      if (image) gsap.set(image, { scale: 1.04 })

      if (titleInner) {
        tl.to(titleInner, { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power4.out' })
      }
      if (tagline) {
        tl.to(tagline, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
      }
      if (buttons) {
        tl.to(buttons, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
      }
      if (imageContainer && image) {
        tl.to(imageContainer, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.6')
          .to(image, { scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1.0')
      }

      // Scroll Animations for content sections (transform/opacity only)
      const sections = document.querySelectorAll('.cs-section')
      sections.forEach((sec) => {
        const fadeEls = sec.querySelectorAll('.cs-fade')
        const lines = sec.querySelectorAll('.cs-line')

        if (fadeEls.length) gsap.set(fadeEls, { opacity: 0, y: 18 })
        if (lines.length) gsap.set(lines, { scaleX: 0, transformOrigin: 'left' })

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top 88%',
            once: true,
          },
        })

        if (lines.length) {
          st.to(lines, { scaleX: 1, duration: 1.0, ease: 'power3.out' })
        }
        if (fadeEls.length) {
          st.to(
            fadeEls,
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
            lines.length ? '-=0.7' : 0
          )
        }
      })
    })

    return () => ctx.revert()
  }, [project])

  const hasLiveLink = Boolean(project.links?.live)
  const hasSourceLink = Boolean(project.links?.source)
  const hasAnyLink = hasLiveLink || hasSourceLink

  const hasRolesOrDecisions = Boolean(
    (project.role && project.role.length > 0) || (project.decisions && project.decisions.length > 0)
  )

  const hasWriteUp = Boolean(project.writeUp && project.writeUp.length > 0)

  return (
    <div className="relative w-full bg-[#f5f5f3] text-[#1c1d20] min-h-screen">
      {/* 01 HEADER & HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-full pt-[100px] md:pt-[140px] pb-[60px] md:pb-[90px] px-6 sm:px-8 md:px-[5vw] max-w-[1440px] mx-auto"
      >
        {/* Back Link */}
        <div className="mb-10 md:mb-14">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[#5c5d61] hover:text-[#1c1d20] font-mono text-[12px] md:text-[13px] uppercase tracking-widest transition-colors rounded-sm focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#455ce9] focus-visible:outline-offset-2"
          >
            <span>← Back to work</span>
          </Link>
        </div>

        {/* Logo + Giant Title */}
        <div className="flex flex-col mb-6 md:mb-8">
          <div className="flex items-center gap-4 md:gap-8 overflow-hidden mb-4">
            {project.logo && (
              <div
                className="shrink-0 relative flex items-center justify-center select-none"
                style={{
                  height: 'clamp(56px, 9vw, 150px)',
                  width: 'clamp(56px, 9vw, 150px)',
                }}
              >
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={150}
                  height={150}
                  priority
                  className="object-contain w-full h-full"
                />
              </div>
            )}
            <h1
              className="hero-title-inner font-snellenberg text-[#1c1d20] font-normal leading-[0.95] tracking-[-0.05em]"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9.5rem)' }}
            >
              {project.name}
            </h1>
          </div>

          {/* Tagline (one line, statement text max ~36ch wide) */}
          <p
            className="hero-tagline font-snellenberg text-[#1c1d20] leading-[1.3] tracking-tight max-w-[36ch]"
            style={{ fontSize: 'clamp(1.25rem, 2.3vw, 2.2rem)' }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Buttons (View live site primary, Source secondary; full width < 480px) */}
        {hasAnyLink && (
          <div className="hero-buttons flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-12 md:mb-16">
            {hasLiveLink && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1c1d20] text-[#f5f5f3] hover:bg-[#34353a] px-6 py-3.5 rounded-md font-snellenberg text-[15px] md:text-[16px] font-medium transition-colors w-full sm:w-auto shadow-sm focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#455ce9] focus-visible:outline-offset-2"
              >
                <span>View live site</span>
                <span aria-hidden>↗</span>
              </a>
            )}
            {hasSourceLink && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#1c1d20]/25 text-[#1c1d20] hover:bg-[#1c1d20]/5 px-6 py-3.5 rounded-md font-snellenberg text-[15px] md:text-[16px] font-medium transition-colors w-full sm:w-auto focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#455ce9] focus-visible:outline-offset-2"
              >
                <span>Source</span>
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}

        {/* Meta Row (Role / Type / Year / Stack chips; 4 cols -> 2 -> 1) */}
        <div className="cs-section w-full border-y border-[rgba(28,29,32,0.15)] py-8 md:py-10 mb-12 md:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="cs-fade flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold">
                Role
              </span>
              <span className="font-snellenberg text-[1.1rem] md:text-[1.25rem] text-[#1c1d20] leading-snug">
                {project.meta.role}
              </span>
            </div>

            <div className="cs-fade flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold">
                Type
              </span>
              <span className="font-snellenberg text-[1.1rem] md:text-[1.25rem] text-[#1c1d20] leading-snug">
                {project.meta.type}
              </span>
            </div>

            <div className="cs-fade flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold">
                Year
              </span>
              <span className="font-snellenberg text-[1.1rem] md:text-[1.25rem] text-[#1c1d20] leading-snug">
                {project.meta.year}
              </span>
            </div>

            <div className="cs-fade flex flex-col gap-2">
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold">
                Stack
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {project.meta.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block text-[12px] md:text-[13px] font-mono px-2.5 py-1 rounded-sm bg-[#1c1d20]/5 text-[#1c1d20] border border-[rgba(28,29,32,0.1)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Screenshot (object-fit cover, object-position top, max-height 80vh) */}
        {project.heroImage && (
          <div className="hero-image-container relative w-full aspect-[16/10] max-h-[80vh] overflow-hidden rounded-md bg-[#e0e0de] border border-[rgba(28,29,32,0.1)] shadow-sm">
            <Image
              src={project.heroImage}
              alt={`${project.name} interface`}
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 48px), min(90vw, 1296px)"
              className="hero-image object-cover object-top"
            />
          </div>
        )}
      </section>

      {/* 02 THE SHORT VERSION (Problem / Approach / Outcome) */}
      <section className="cs-section w-full px-6 sm:px-8 md:px-[5vw] max-w-[1440px] mx-auto py-12 md:py-20 border-t border-[rgba(28,29,32,0.15)]">
        <span className="cs-fade block text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold mb-6 md:mb-8">
          The short version
        </span>

        <div
          className={`grid grid-cols-1 ${
            project.brief.outcome ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } gap-8 md:gap-12`}
        >
          <div className="cs-fade flex flex-col gap-2.5">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-[#5c5d61] font-semibold">
              Problem
            </h3>
            <p className="font-snellenberg text-[16px] md:text-[17px] text-[#1c1d20] leading-relaxed">
              {project.brief.problem}
            </p>
          </div>

          <div className="cs-fade flex flex-col gap-2.5">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-[#5c5d61] font-semibold">
              Approach
            </h3>
            <p className="font-snellenberg text-[16px] md:text-[17px] text-[#1c1d20] leading-relaxed">
              {project.brief.approach}
            </p>
          </div>

          {project.brief.outcome && (
            <div className="cs-fade flex flex-col gap-2.5">
              <h3 className="text-[12px] font-mono uppercase tracking-wider text-[#5c5d61] font-semibold">
                Outcome
              </h3>
              <p className="font-snellenberg text-[16px] md:text-[17px] text-[#1c1d20] leading-relaxed">
                {project.brief.outcome}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 03 WHAT I BUILT (2x2 Grid) */}
      {project.built && project.built.length > 0 && (
        <section className="cs-section w-full px-6 sm:px-8 md:px-[5vw] max-w-[1440px] mx-auto py-12 md:py-20 border-t border-[rgba(28,29,32,0.15)]">
          <span className="cs-fade block text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold mb-6 md:mb-8">
            What I built
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {project.built.map((item, idx) => (
              <div
                key={idx}
                className="cs-fade p-6 sm:p-8 rounded-md bg-[#e8e8e6] border border-[rgba(28,29,32,0.08)] flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-snellenberg font-medium text-[1.25rem] md:text-[1.4rem] text-[#1c1d20] leading-tight mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-[#5c5d61] text-[15px] md:text-[16px] font-snellenberg leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04 HOW IT WORKS (Workflow + Failure Chain) */}
      {project.workflow && project.workflow.length > 0 && (
        <section className="cs-section w-full px-6 sm:px-8 md:px-[5vw] max-w-[1440px] mx-auto py-12 md:py-20 border-t border-[rgba(28,29,32,0.15)]">
          <span className="cs-fade block text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold mb-6 md:mb-8">
            How it works
          </span>

          {/* Workflow: 7 cols >= 1180px, 4 cols >= 720px, vertical timeline below */}
          <div className="grid grid-cols-1 min-[720px]:grid-cols-4 min-[1180px]:grid-cols-7 gap-3 sm:gap-4 md:gap-4">
            {project.workflow.map((item, idx) => (
              <div
                key={idx}
                className="cs-fade p-4 sm:p-5 rounded-md bg-[#e8e8e6] border border-[rgba(28,29,32,0.08)] flex flex-col justify-between relative"
              >
                <span className="text-[12px] font-mono text-[#5c5d61] mb-2 block font-semibold">
                  {item.step}
                </span>
                <p className="text-[14px] md:text-[15px] font-snellenberg text-[#1c1d20] leading-snug font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Failure Chain (if defined) */}
          {project.failureChain && project.failureChain.length > 0 && (
            <div className="cs-fade mt-10 md:mt-12 p-6 sm:p-8 rounded-md bg-[#1c1d20]/5 border border-[rgba(28,29,32,0.12)]">
              <span className="block text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold mb-4">
                System Failure Chain & Safeguards
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {project.failureChain.map((fc, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <span className="font-snellenberg text-[15px] font-medium text-[#1c1d20]">
                      {fc.stage}
                    </span>
                    <span className="text-[13px] md:text-[14px] text-[#5c5d61] font-snellenberg leading-relaxed">
                      → {fc.consequence}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 05 MY ROLE & DECISIONS (Hides completely if both are undefined) */}
      {hasRolesOrDecisions && (
        <section className="cs-section w-full px-6 sm:px-8 md:px-[5vw] max-w-[1440px] mx-auto py-12 md:py-20 border-t border-[rgba(28,29,32,0.15)]">
          <span className="cs-fade block text-[11px] md:text-[12px] font-mono uppercase tracking-[0.06em] text-[#5c5d61] font-semibold mb-6 md:mb-8">
            My role & decisions
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {project.role && project.role.length > 0 && (
              <div className="cs-fade flex flex-col gap-4">
                <h3 className="text-[12px] font-mono uppercase tracking-wider text-[#5c5d61] font-semibold">
                  Responsibilities
                </h3>
                <ul className="space-y-3">
                  {project.role.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15px] md:text-[16px] text-[#1c1d20] font-snellenberg leading-relaxed"
                    >
                      <span className="text-[#5c5d61] mt-1.5 text-xs">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.decisions && project.decisions.length > 0 && (
              <div className="cs-fade flex flex-col gap-4">
                <h3 className="text-[12px] font-mono uppercase tracking-wider text-[#5c5d61] font-semibold">
                  Architectural Decisions
                </h3>
                <ul className="space-y-3">
                  {project.decisions.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15px] md:text-[16px] text-[#1c1d20] font-snellenberg leading-relaxed"
                    >
                      <span className="text-[#5c5d61] mt-1.5 text-xs">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 06 FULL TECHNICAL WRITE-UP (Collapsed by default, accessible focus) */}
      {hasWriteUp && (
        <section className="cs-section w-full px-6 sm:px-8 md:px-[5vw] max-w-[1440px] mx-auto py-12 md:py-16 border-t border-[rgba(28,29,32,0.15)]">
          <details className="group p-6 sm:p-8 rounded-md bg-[#e8e8e6] border border-[rgba(28,29,32,0.1)] transition-colors">
            <summary className="cursor-pointer select-none font-snellenberg text-[1.25rem] md:text-[1.5rem] text-[#1c1d20] font-medium flex items-center justify-between focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#455ce9] focus-visible:outline-offset-2 rounded-sm list-none [&::-webkit-details-marker]:hidden">
              <span>Full technical write-up</span>
              <span
                aria-hidden
                className="text-[1.2rem] md:text-[1.4rem] text-[#5c5d61] transition-transform duration-300 group-open:rotate-180"
              >
                ↓
              </span>
            </summary>
            <div className="pt-6 mt-6 border-t border-[rgba(28,29,32,0.1)] space-y-4 max-w-[900px]">
              {project.writeUp?.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-[#5c5d61] text-[15px] md:text-[16px] font-snellenberg leading-[1.65]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        </section>
      )}

      {/* 07 NEXT PROJECT CARD */}
      {project.nextProject && (
        <section className="w-full border-t border-[rgba(28,29,32,0.15)]">
          <Link
            href={`/work/${project.nextProject}`}
            className="block w-full group py-20 md:py-32 px-6 sm:px-8 md:px-[5vw] bg-[#f5f5f3] hover:bg-[#e8e8e6] transition-colors duration-500 text-center focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#455ce9] focus-visible:outline-offset-2"
          >
            <span className="text-[11px] md:text-[12px] font-mono tracking-[0.2em] uppercase text-[#5c5d61] font-semibold mb-4 md:mb-6 block">
              Next Project
            </span>
            <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              {project.nextLogo && (
                <div
                  className="shrink-0 relative select-none"
                  style={{
                    height: 'clamp(64px, 7vw, 120px)',
                    width: 'clamp(64px, 7vw, 120px)',
                  }}
                >
                  <Image
                    src={project.nextLogo}
                    alt={`${project.nextTitle} logo`}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
              <h2
                className="font-snellenberg text-[#1c1d20] font-normal tracking-[-0.04em] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
              >
                {project.nextTitle}{' '}
                <span className="inline-block ml-3 md:ml-4 text-[2rem] md:text-[3rem] text-[#5c5d61] group-hover:text-[#1c1d20] transition-transform group-hover:translate-x-3 group-hover:-translate-y-3 duration-500">
                  ↗
                </span>
              </h2>
            </div>
          </Link>
        </section>
      )}
    </div>
  )
}

export default CaseStudyLayout
