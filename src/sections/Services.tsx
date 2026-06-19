import FadeIn from '../components/FadeIn'
import { services } from '../data/services'
import { useLanguage } from '../lib/language'
import { pick } from '../lib/l10n'

/** Section Services — fond blanc, liste verticale numérotée (repris du template Jack). */
export default function Services() {
  const { t, lang } = useLanguage()
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center leading-none mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
      >
        {t('services.title')}
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((s, i) => (
          <FadeIn
            key={s.number}
            delay={i * 0.1}
            className="flex items-start gap-5 md:gap-10 py-8 sm:py-10 md:py-12"
            style={i > 0 ? { borderTop: '1px solid rgba(12,12,12,0.15)' } : undefined}
          >
            <span
              className="font-black text-[#0C0C0C] shrink-0 leading-[0.9]"
              style={{ fontSize: 'clamp(3rem,10vw,140px)' }}
            >
              {s.number}
            </span>
            <div>
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}
              >
                {pick(s.name, lang)}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl mt-2"
                style={{ fontSize: 'clamp(0.85rem,1.6vw,1.25rem)', color: 'rgba(12,12,12,0.6)' }}
              >
                {pick(s.description, lang)}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
