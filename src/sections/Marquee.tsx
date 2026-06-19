import { useEffect, useRef, useState } from 'react'
import ProjectMock from '../components/ProjectMock'
import { projects, type MockVariant } from '../data/projects'

const SPECS: { variant: MockVariant; accent: string; accent2: string }[] = [
  { variant: 'saas', accent: '#2EA7A0', accent2: '#1F6F8B' },
  { variant: 'ai', accent: '#B600A8', accent2: '#7621B0' },
  { variant: 'fintech', accent: '#BE4C00', accent2: '#B600A8' },
  { variant: 'reviews', accent: '#E5A100', accent2: '#BE4C00' },
  { variant: 'landing', accent: '#7621B0', accent2: '#B600A8' },
]

/** Captures réelles disponibles, indexées par nom de projet. */
const SHOT: Record<string, string> = Object.fromEntries(
  projects.filter((p) => p.screenshot).map((p) => [p.name, p.screenshot as string]),
)

const TILE = 'shrink-0 w-[300px] h-[195px] sm:w-[420px] sm:h-[270px] rounded-2xl'

const ROW1 = [
  'MIA CV',
  'TipsYou',
  'HumanONG',
  'Get5Stars',
  'Steven Coaching',
  'EventPics',
  'Web App',
  'SaaS',
  'IA',
  'Mobile',
  'Fintech',
]
const ROW2 = [
  'EventPics',
  'TipsYou',
  'Get5Stars',
  'UX/UI',
  'Steven Coaching',
  'Dashboard',
  'Paiements',
  'API',
  'Conversion',
]

function Tile({ label, seed }: { label: string; seed: number }) {
  const shot = SHOT[label]
  if (shot) {
    // Vraie capture du site (cadre simple + label en surimpression)
    return (
      <div className={`relative overflow-hidden border border-[#D7E2EA]/10 ${TILE}`}>
        <img src={shot} alt={label} loading="lazy" className="h-full w-full object-cover object-top" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />
        <span className="absolute bottom-3 left-3 font-medium uppercase tracking-widest text-[0.6rem] text-[#D7E2EA] sm:text-xs">
          {label}
        </span>
      </div>
    )
  }
  const spec = SPECS[seed % SPECS.length]
  return (
    <ProjectMock
      variant={spec.variant}
      accent={spec.accent}
      accent2={spec.accent2}
      part={seed % 2 === 0 ? 'widgetA' : 'widgetB'}
      label={label}
      className={TILE}
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
