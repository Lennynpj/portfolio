import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useLanguage } from '../lib/language'

/** Section Projets — cartes à empilement collant (repris du template Jack). */
export default function Projects() {
  const { t } = useLanguage()
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="relative z-10 bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-10"
    >
      <h2
        className="hero-heading font-black uppercase tracking-tight leading-none text-center mb-12 sm:mb-16"
        style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
      >
        {t('projects.title')}
      </h2>

      <div ref={container} className="relative max-w-6xl mx-auto">
        {projects.map((p, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.03
          return (
            <ProjectCard
              key={p.id}
              project={p}
              i={i}
              progress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
