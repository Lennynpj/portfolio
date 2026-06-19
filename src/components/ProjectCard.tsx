import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { Project } from '../data/projects'
import ProjectMock from './ProjectMock'
import LiveProjectButton from './LiveProjectButton'
import { useLanguage } from '../lib/language'
import { pick } from '../lib/l10n'

interface Props {
  project: Project
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/** Carte projet à empilement collant (sticky stacking, repris du template Jack). */
export default function ProjectCard({ project, i, progress, range, targetScale }: Props) {
  const { lang } = useLanguage()
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="h-[85vh] sticky top-24 md:top-32 flex items-start justify-center">
      <motion.div
        style={{ scale, top: `${i * 28}px` }}
        className="relative w-full origin-top rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-ink p-4 sm:p-6 md:p-8"
      >
        {/* Ligne du haut */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-8">
          <span
            className="font-black text-[#D7E2EA] leading-none shrink-0"
            style={{ fontSize: 'clamp(2.4rem,7vw,110px)' }}
          >
            {project.number}
          </span>
          <div className="flex-1 min-w-[180px]">
            <p className="text-[#D7E2EA]/55 uppercase tracking-widest text-[0.7rem] sm:text-sm">
              {pick(project.category, lang)}
            </p>
            <h3
              className="text-[#D7E2EA] font-medium uppercase leading-tight"
              style={{ fontSize: 'clamp(1.4rem,3.4vw,2.6rem)' }}
            >
              {project.name}
            </h3>
            <p
              className="text-[#D7E2EA]/50 font-light mt-1 max-w-xl"
              style={{ fontSize: 'clamp(0.82rem,1.3vw,1.05rem)' }}
            >
              {pick(project.pitch, lang)}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(1rem,2vw,1.7rem)' }}
            >
              {pick(project.result, lang)}
            </span>
            <LiveProjectButton href={project.url} />
          </div>
        </div>

        {/* Visuel : vraie capture (cadre navigateur) ou mockup SVG en fallback */}
        {project.screenshot ? (
          <div className="mt-5 md:mt-7 overflow-hidden rounded-[18px] sm:rounded-[26px] md:rounded-[32px] border border-[#D7E2EA]/15">
            <div className="flex items-center gap-2 border-b border-[#D7E2EA]/10 bg-white/[0.04] px-4 py-3">
              <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
              {hostOf(project.url) && (
                <span className="ml-3 truncate text-xs text-[#D7E2EA]/40">{hostOf(project.url)}</span>
              )}
            </div>
            <img
              src={project.screenshot}
              alt={`${project.name} — aperçu du site`}
              loading="lazy"
              className="block w-full object-cover object-top"
              style={{ height: 'clamp(240px,36vw,540px)' }}
            />
          </div>
        ) : (
          <div className="mt-5 md:mt-7 grid grid-cols-1 gap-3 md:grid-cols-[40%_1fr] md:gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
              <ProjectMock
                variant={project.variant}
                accent={project.accent}
                accent2={project.accent2}
                part="widgetA"
                className="w-full rounded-[22px] sm:rounded-[30px] md:rounded-[40px]"
                style={{ height: 'clamp(120px,14vw,200px)' }}
              />
              <ProjectMock
                variant={project.variant}
                accent={project.accent}
                accent2={project.accent2}
                part="widgetB"
                className="w-full rounded-[22px] sm:rounded-[30px] md:rounded-[40px]"
                style={{ height: 'clamp(150px,20vw,300px)' }}
              />
            </div>
            <ProjectMock
              variant={project.variant}
              accent={project.accent}
              accent2={project.accent2}
              part="hero"
              label={project.name}
              className="w-full rounded-[22px] sm:rounded-[30px] md:rounded-[40px]"
              style={{ height: '100%', minHeight: 'clamp(290px,34vw,520px)' }}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
