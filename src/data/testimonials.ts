import type { L10n } from '../lib/l10n'

export interface Testimonial {
  quote: L10n
  author: string
  role: L10n
}

// TODO: remplacer par de vrais témoignages clients (placeholders pour l'instant).
export const testimonials: Testimonial[] = [
  {
    quote: {
      fr: 'Code propre, transparence totale, et une vraie compréhension de nos enjeux business.',
      en: 'Clean code, full transparency, and a real understanding of our business needs.',
    },
    author: 'Camille R.',
    role: { fr: 'Fondatrice, startup SaaS', en: 'Founder, SaaS startup' },
  },
  {
    quote: {
      fr: 'Livré dans les temps, au-delà de nos attentes. On a doublé notre taux de conversion.',
      en: 'Delivered on time, beyond expectations. We doubled our conversion rate.',
    },
    author: 'Marc D.',
    role: { fr: 'CEO, e-commerce', en: 'CEO, e-commerce' },
  },
  {
    quote: {
      fr: 'Des conseils honnêtes dès le premier appel. Rare et précieux.',
      en: 'Honest advice from the very first call. Rare and valuable.',
    },
    author: 'Sofia L.',
    role: { fr: 'Directrice, ONG', en: 'Director, NGO' },
  },
]
