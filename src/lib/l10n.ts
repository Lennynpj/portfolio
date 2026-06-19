export type Locale = 'fr' | 'en'

/** Une chaîne disponible dans les deux langues. */
export interface L10n {
  fr: string
  en: string
}

export const pick = (value: L10n, lang: Locale): string => value[lang]
