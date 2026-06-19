import type { L10n } from '../lib/l10n'

export interface Stat {
  value: string
  label: L10n
}

export const stats: Stat[] = [
  { value: '50+', label: { fr: 'projets livrés', en: 'projects shipped' } },
  { value: '98%', label: { fr: 'satisfaction', en: 'satisfaction' } },
  { value: '24h', label: { fr: 'temps de réponse', en: 'response time' } },
  { value: '72', label: { fr: 'NPS', en: 'NPS' } },
  { value: '4.9/5', label: { fr: 'note client', en: 'client rating' } },
]
