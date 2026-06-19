import { useState, type FormEvent } from 'react'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { useLanguage } from '../lib/language'

// TODO: remplacer par la vraie adresse de contact.
const EMAIL = 'contact@humanx-group.com'

const fieldClass =
  'w-full bg-white/[0.03] border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 outline-none focus:border-[#D7E2EA]/40 transition-colors'

/** Section Contact (CTA final) + footer. */
export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Projet — ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="bg-ink px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-12">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase tracking-tight leading-none"
          style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
        >
          {t('contact.title')}
        </FadeIn>
        <p className="text-[#D7E2EA]/70" style={{ fontSize: 'clamp(1rem,2vw,1.4rem)' }}>
          {t('contact.subtitle')}
        </p>
      </div>

      <FadeIn className="max-w-2xl mx-auto mt-12 w-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className={fieldClass}
              placeholder={t('contact.name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={fieldClass}
              type="email"
              placeholder={t('contact.emailField')}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <textarea
            className={fieldClass}
            rows={4}
            placeholder={t('contact.message')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button
            type="submit"
            className="self-center mt-2 rounded-full text-white font-medium uppercase tracking-widest text-sm md:text-base px-12 py-4 transition-transform duration-300 hover:scale-[1.04]"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid #fff',
              outlineOffset: '-3px',
            }}
          >
            {t('contact.send')}
          </button>
        </form>
      </FadeIn>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[#D7E2EA] font-black uppercase tracking-tight text-xl">HumanX</span>
        <div className="flex items-center gap-5 text-[#D7E2EA]/60">
          <a href={`mailto:${EMAIL}`} aria-label="Email" className="hover:text-[#D7E2EA] transition-colors">
            <Mail size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#D7E2EA] transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-[#D7E2EA] transition-colors">
            <Github size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#D7E2EA] transition-colors">
            <Instagram size={20} />
          </a>
        </div>
        <span className="text-[#D7E2EA]/40 text-sm">© 2026 HumanX</span>
      </footer>
    </section>
  )
}
