import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import LanguageSwitcher from '../components/LanguageSwitcher'
import HeroHeads from '../components/HeroHeads'
import { useLanguage } from '../lib/language'

/**
 * Hero plein écran (repris du template Jack, repositionné HumanX).
 * Le bloc "têtes" est un placeholder porcelaine en attendant les .glb
 * (Lenny + Gabriel) qui seront chargés via React Three Fiber.
 */
export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      {/* Navbar */}
      <FadeIn
        as="nav"
        y={-20}
        delay={0}
        appear
        className="relative z-20 flex items-center justify-between gap-4 px-6 md:px-10 pt-6 md:pt-8"
      >
        <div className="flex gap-5 md:gap-9 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="transition-opacity duration-200 hover:opacity-70">
            {t('nav.about')}
          </a>
          <a href="#services" className="transition-opacity duration-200 hover:opacity-70">
            {t('nav.services')}
          </a>
          <a href="#projects" className="transition-opacity duration-200 hover:opacity-70">
            {t('nav.projects')}
          </a>
          <a href="#contact" className="transition-opacity duration-200 hover:opacity-70">
            {t('nav.contact')}
          </a>
        </div>
        <LanguageSwitcher />
      </FadeIn>

      {/* Titre géant */}
      <div className="relative z-0 flex-1 flex items-center overflow-hidden px-4 md:px-8">
        <FadeIn
          as="h1"
          y={40}
          delay={0.15}
          appear
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[21vw]"
        >
          {t('hero.heading')}
        </FadeIn>
      </div>

      {/* Halo de marque derrière les têtes */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[4%] z-0 w-[75vw] max-w-[820px] h-[48vh] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(182,0,168,0.22), rgba(190,76,0,0.10) 45%, transparent 72%)',
        }}
      />
      {/* Têtes 3D (Lenny + Gabriel) */}
      <HeroHeads className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-full max-w-[1080px] h-[62vh] sm:h-[66vh] md:h-[70vh]" />

      {/* Barre du bas */}
      <div className="relative z-20 flex items-end justify-between gap-4 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          y={20}
          delay={0.35}
          appear
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          {t('hero.tagline')}
        </FadeIn>
        <FadeIn delay={0.5} y={20} appear>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
