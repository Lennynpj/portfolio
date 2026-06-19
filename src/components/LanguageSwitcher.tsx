import { useLanguage } from '../lib/language'
import type { Locale } from '../lib/l10n'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const item = (code: Locale, label: string) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      className={`transition-opacity duration-200 ${
        lang === code ? 'opacity-100' : 'opacity-40 hover:opacity-70'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-1.5 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-base">
      {item('fr', 'FR')}
      <span className="opacity-30">/</span>
      {item('en', 'EN')}
    </div>
  )
}
