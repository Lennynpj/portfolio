import { useEffect, useRef, useState } from 'react'
import ProjectMock from '../components/ProjectMock'
import type { MockVariant } from '../data/projects'

const SPECS: { variant: MockVariant; accent: string; accent2: string }[] = [
  { variant: 'saas', accent: '#2EA7A0', accent2: '#1F6F8B' },
  { variant: 'ai', accent: '#B600A8', accent2: '#7621B0' },
  { variant: 'fintech', accent: '#BE4C00', accent2: '#B600A8' },
  { variant: 'reviews', accent: '#E5A100', accent2: '#BE4C00' },
  { variant: 'landing', accent: '#7621B0', accent2: '#B600A8' },
]

const ROW1 = [
  'MIA CV',
  'TipsYou',
  'HumanONG',
  'Get5Stars',
  'Steven Coaching',
  'Web App',
  'SaaS',
  'IA',
  'Mobile',
  'Fintech',
  'E-commerce',
]
const ROW2 = ['Branding', 'UX/UI', 'Dashboard', 'Paiements', 'Chatbot', 'Audit', 'Vitrine', 'API', 'Design', 'Conversion']

function Tile({ label, seed }: { label: string; seed: number }) {
  const spec = SPECS[seed % SPECS.length]
  return (
    <ProjectMock
      variant={spec.variant}
      accent={spec.accent}
      accent2={spec.accent2}
      part={seed % 2 === 0 ? 'widgetA' : 'widgetB'}
      label={label}
      className="shrink-0 w-[300px] h-[195px] sm:w-[420px] sm:h-[270px] rounded-2xl"
    />
  )
}

/** Deux rangées d'aperçus qui défilent selon le scroll (repris du template Jack). */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const r1 = [...ROW1, ...ROW1, ...ROW1]
  const r2 = [...ROW2, ...ROW2, ...ROW2]

  return (
    <section ref={ref} className="bg-ink pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
        >
          {r1.map((l, i) => (
            <Tile key={`a${i}`} label={l} seed={i} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
        >
          {r2.map((l, i) => (
            <Tile key={`b${i}`} label={l} seed={i + 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
