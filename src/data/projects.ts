import type { L10n } from '../lib/l10n'

/** Type de mockup SVG affiché pour le projet. */
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
  /** Habillage visuel (mockup SVG en attendant les vrais visuels). */
  variant: MockVariant
  accent: string
  accent2: string
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
    url: '#',
    variant: 'ai',
    accent: '#B600A8',
    accent2: '#7621B0',
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
    url: '#',
    variant: 'fintech',
    accent: '#BE4C00',
    accent2: '#B600A8',
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
  },
  {
    id: 'get5stars',
    number: '04',
    name: 'Get5Stars',
    category: { fr: 'SaaS B2B', en: 'B2B SaaS' },
    pitch: {
      fr: "Plateforme de collecte d'avis clients post-achat.",
      en: 'Post-purchase customer review collection platform.',
    },
    result: { fr: 'Note moyenne portée à 4,9★', en: 'Average rating lifted to 4.9★' },
    url: '#',
    variant: 'reviews',
    accent: '#E5A100',
    accent2: '#BE4C00',
  },
  {
    id: 'steven-coaching',
    number: '05',
    name: 'Steven Coaching',
    category: { fr: 'Coaching', en: 'Coaching' },
    pitch: {
      fr: 'Site vitrine pour un coach sportif, rapide et optimisé.',
      en: 'Showcase website for a fitness coach — fast and optimized.',
    },
    result: { fr: 'Score Lighthouse 98', en: 'Lighthouse score 98' },
    url: '#',
    variant: 'landing',
    accent: '#7621B0',
    accent2: '#B600A8',
  },
]
