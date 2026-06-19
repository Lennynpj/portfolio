import FadeIn from '../components/FadeIn'
import CountUp from '../components/CountUp'
import { stats } from '../data/stats'
import { useLanguage } from '../lib/language'
import { pick } from '../lib/l10n'

/** Bande de statistiques avec compteurs animés. */
export default function Stats() {
  const { lang } = useLanguage()
  return (
    <section className="bg-ink px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.08} y={24} className="text-center">
            <CountUp
              value={s.value}
              className="hero-heading font-black leading-none block"
              style={{ fontSize: 'clamp(2.2rem,5vw,4.2rem)' }}
            />
            <p className="text-[#D7E2EA]/55 uppercase tracking-wider mt-2 text-xs sm:text-sm">
              {pick(s.label, lang)}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
