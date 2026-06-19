import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import fr from '../locales/fr.json'
import en from '../locales/en.json'
import type { Locale } from './l10n'

const dictionaries: Record<Locale, unknown> = { fr, en }

/** Résout une clé pointée ("nav.about") dans un dictionnaire imbriqué. */
function resolve(dict: unknown, key: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let acc: any = dict
  for (const part of key.split('.')) {
    if (acc && typeof acc === 'object' && part in acc) acc = acc[part]
    else return undefined
  }
  return typeof acc === 'string' ? acc : undefined
}

interface LanguageContextValue {
  lang: Locale
  setLang: (lang: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

interface ProviderProps {
  children: ReactNode
  /** Langue contrôlée (ex. depuis l'URL). Si absent, état interne. */
  lang?: Locale
  onLangChange?: (lang: Locale) => void
}

export function LanguageProvider({ children, lang: controlled, onLangChange }: ProviderProps) {
  const [internal, setInternal] = useState<Locale>('fr')
  const lang = controlled ?? internal
  const setLang = useCallback(
    (l: Locale) => {
      setInternal(l)
      onLangChange?.(l)
    },
    [onLangChange],
  )
  const t = useCallback((key: string) => resolve(dictionaries[lang], key) ?? key, [lang])
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
