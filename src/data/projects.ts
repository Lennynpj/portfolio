import type { L10n } from '../lib/l10n'

/** Type de mockup SVG affiché en fallback (si pas de screenshot). */
export type MockVariant = 'ai' | 'fintech' | 'saas' | 'reviews' | 'landing'

export interface Project {
  id: string
  number: string
  /** Nom de marque — non traduit. */
  name: string
  category: L10n
  pitch: L10n
  result: L10n
  url: string
  /** Habillage visuel SVG (fallback quand pas de screenshot). */
  variant: MockVariant
  accent: string
  accent2: string
  /** Capture réelle du site (sinon → mockup SVG). */
  screenshot?: string
}

export const projects: Project[] = [
  {
    id: 'mia-cv',
    number: '01',
    name: 'MIA CV',
    category: { fr: 'IA & Recrutement', en: 'AI & Recruiting' },
    pitch: {
      fr: "Plateforme d'optimisation de CV par IA et d'analyse d'offres d'emploi.",
      en: 'AI-powered CV optimization and job-offer analysis platform.',
    },
    result: { fr: '+3,4× de passage ATS', en: '+3.4× ATS pass rate' },
    url: 'https://mia-cv.com/fr',
    variant: 'ai',
    accent: '#B600A8',
    accent2: '#7621B0',
    screenshot: '/projects/mia-cv.jpg',
  },
  {
    id: 'tipsyou',
    number: '02',
    name: 'TipsYou',
    category: { fr: 'Fintech & Social', en: 'Fintech & Social' },
    pitch: {
      fr: 'Application de pourboires et de soutien aux créateurs — mobile, web et paiements.',
      en: 'Tipping and creator-support app — mobile, web and payments.',
    },
    result: { fr: 'Interface fluide à 60 fps', en: 'Silky 60 fps UI' },
    url: 'https://www.thetipsyou.fr/fr',
    variant: 'fintech',
    accent: '#BE4C00',
    accent2: '#B600A8',
    screenshot: '/projects/tipsyou.jpg',
  },
  {
    id: 'humanong',
    number: '03',
    name: 'HumanONG',
    category: { fr: 'SaaS B2B', en: 'B2B SaaS' },
    pitch: {
      fr: 'Tableau de bord de gestion des donateurs pour les ONG.',
      en: 'Donor management dashboard for NGOs.',
    },
    result: { fr: '+38 % de rétention donateurs', en: '+38% donor retention' },
    url: '#',
    variant: 'saas',
    accent: '#2EA7A0',
    accent2: '#1F6F8B',
    screenshot: '/projects/humanong.jpg',
  },
  {
    id: 'get5stars',
    number: '04',
    name: 'Get5Stars',
    category: { fr: 'SaaS B2B', en: 'B2B SaaS' },
    pitch: {
      fr: "Plateforme de collecte d'avis clients en pilote automatique.",
      en: 'Automated customer review collection platform.',
    },
    result: { fr: 'Note moyenne portée à 4,9★', en: 'Average rating lifted to 4.9★' },
    url: 'https://www.get5stars.app/fr',
    variant: 'reviews',
    accent: '#E5A100',
    accent2: '#BE4C00',
    screenshot: '/projects/get5stars.jpg',
  },
  {
    id: 'steven-coaching',
    number: '05',
    name: 'Steven Coaching',
    category: { fr: 'Coaching', en: 'Coaching' },
    pitch: {
      fr: 'Site vitrine pour un coach sportif (méthode IKIGAI), rapide et optimisé.',
      en: 'Showcase website for a fitness coach (IKIGAI method) — fast and optimized.',
    },
    result: { fr: 'Score Lighthouse 98', en: 'Lighthouse score 98' },
    url: 'https://steven-coaching.fr/',
    variant: 'landing',
    accent: '#7621B0',
    accent2: '#B600A8',
    screenshot: '/projects/steven-coaching.jpg',
  },
  {
    id: 'eventpics',
    number: '06',
    name: 'EventPics',
    category: { fr: 'IA & Événementiel', en: 'AI & Events' },
    pitch: {
      fr: "Application IA qui livre à chaque invité ses photos d'événement à partir d'un simple selfie.",
      en: 'AI app that delivers each guest their event photos from a single selfie.',
    },
    result: { fr: 'Photos livrées en un selfie', en: 'Photos delivered in one selfie' },
    url: 'https://eventpics.fr/',
    variant: 'ai',
    accent: '#5B6CF0',
    accent2: '#9333EA',
    screenshot: '/projects/eventpics.jpg',
  },
]
