import type { L10n } from '../lib/l10n'

export interface Service {
  number: string
  name: L10n
  description: L10n
}

export const services: Service[] = [
  {
    number: '01',
    name: { fr: 'Développement Web', en: 'Web Development' },
    description: {
      fr: 'Sites vitrines, applications web complexes et e-commerce — rapides, accessibles et optimisés pour le référencement.',
      en: 'Showcase sites, complex web apps and e-commerce — fast, accessible and SEO-optimized.',
    },
  },
  {
    number: '02',
    name: { fr: 'Applications Mobiles', en: 'Mobile Apps' },
    description: {
      fr: 'iOS et Android, natif ou cross-platform, avec des interfaces fluides et intuitives.',
      en: 'iOS and Android, native or cross-platform, with smooth and intuitive interfaces.',
    },
  },
  {
    number: '03',
    name: { fr: 'Plateformes SaaS', en: 'SaaS Platforms' },
    description: {
      fr: 'Gestion multi-tenant, dashboards analytics, facturation et intégrations API de bout en bout.',
      en: 'Multi-tenant management, analytics dashboards, billing and end-to-end API integrations.',
    },
  },
  {
    number: '04',
    name: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence' },
    description: {
      fr: 'Chatbots intelligents, analyse de données et automatisation au service de votre productivité.',
      en: 'Smart chatbots, data analysis and automation to boost your productivity.',
    },
  },
  {
    number: '05',
    name: { fr: 'E-commerce & Fintech', en: 'E-commerce & Fintech' },
    description: {
      fr: 'Boutiques en ligne et systèmes de paiement sécurisés, pensés pour la conversion.',
      en: 'Online stores and secure payment systems, built for conversion.',
    },
  },
  {
    number: '06',
    name: { fr: 'Conseil & Accompagnement', en: 'Consulting & Support' },
    description: {
      fr: 'Audits techniques, architecture, optimisation des performances et CTO partagé.',
      en: 'Technical audits, architecture, performance optimization and fractional CTO.',
    },
  },
]
