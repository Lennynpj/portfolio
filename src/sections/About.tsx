import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'
import { useLanguage } from '../lib/language'

const decos = [
  {
    cls: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    x: -80,
    delay: 0.1,
    grad: 'radial-gradient(circle at 35% 30%, #E7EEF3, #BBCCD7 35%, #646973 70%, #15151a)',
    radius: '46%',
  },
  {
    cls: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    x: 80,
    delay: 0.15,
    grad: 'linear-gradient(135deg,#7621B0,#B600A8,#BE4C00)',
    radius: '30% 70% 70% 30% / 30% 30% 70% 70%',
  },
  {
    cls: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    x: -80,
    delay: 0.25,
    grad: 'linear-gradient(135deg,#123047,#1f6f8b,#BBCCD7)',
    radius: '50%',
  },
  {
    cls: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    x: 80,
    delay: 0.3,
    grad: 'conic-gradient(from 90deg, #18011F,#7621B0,#B600A8,#18011F)',
    radius: '42% 58% 47% 53% / 38% 41% 59% 62%',
  },
]

/** Section "L'agence" — texte révélé au scroll + objets déco (placeholders 3D). */
export default function About() {
  const { t } = useLanguage()
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden"
    >
      {decos.map((d, i) => (
        <FadeIn
          key={i}
          x={d.x}
          y={0}
          delay={d.delay}
          duration={0.9}
          className={`absolute ${d.cls} pointer-events-none`}
        >
          <div
            className="aspect-square w-full"
            style={{
              background: d.grad,
              borderRadius: d.radius,
              filter: 'drop-shadow(0 20px 50px rgba(118,33,176,0.25))',
            }}
          />
        </FadeIn>
      ))}

      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center"
        style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
      >
        {t('about.title')}
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24 mt-10 sm:mt-14 md:mt-16">
        <AnimatedText
          text={t('about.body')}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem,2vw,1.35rem)' }}
        />
        <FadeIn>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
