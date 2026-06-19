import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { LanguageProvider } from './lib/language'
import type { Locale } from './lib/l10n'
import useLenis from './hooks/useLenis'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Stats from './sections/Stats'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

function Site() {
  useLenis()
  return (
    <main className="bg-ink min-h-screen text-mist font-kanit" style={{ overflowX: 'clip' }}>
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}

function LocalizedSite() {
  const { lang } = useParams()
  const navigate = useNavigate()
  const current: Locale = lang === 'en' ? 'en' : 'fr'

  useEffect(() => {
    if (lang !== 'fr' && lang !== 'en') {
      navigate('/fr', { replace: true })
      return
    }
    document.documentElement.lang = current
    document.title = current === 'en' ? 'HumanX — Web & Mobile Studio' : 'HumanX — Studio Web & Mobile'
  }, [lang, current, navigate])

  return (
    <LanguageProvider lang={current} onLangChange={(l) => navigate(`/${l}`)}>
      <Site />
    </LanguageProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<LocalizedSite />} />
        <Route path="*" element={<Navigate to="/fr" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
