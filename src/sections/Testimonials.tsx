import FadeIn from '../components/FadeIn'
import { testimonials } from '../data/testimonials'
import { useLanguage } from '../lib/language'
import { pick } from '../lib/l10n'

/** Section témoignages. */
export default function Testimonials() {
  const { t, lang } = useLanguage()
  return (
    <section className="bg-ink px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28">
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase tracking-tight leading-none text-center"
        style={{ fontSize: 'clamp(2.4rem,9vw,120px)' }}
      >
        {t('testimonials.title')}
      </FadeIn>

      <div className="mt-12 md:mt-16 grid gap-5 md:gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((tm, i) => (
          <FadeIn
            key={i}
            delay={i * 0.1}
            className="rounded-[28px] border border-[#D7E2EA]/15 bg-white/[0.02] p-6 md:p-8 flex flex-col gap-6 h-full"
          >
            <p
              className="text-[#D7E2EA] font-light leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem,1.4vw,1.2rem)' }}
            >
              &ldquo;{pick(tm.quote, lang)}&rdquo;
            </p>
            <div className="mt-auto">
              <p className="text-[#D7E2EA] font-medium">{tm.author}</p>
              <p className="text-[#D7E2EA]/50 text-sm">{pick(tm.role, lang)}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
