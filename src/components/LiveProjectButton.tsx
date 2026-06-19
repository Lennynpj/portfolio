import { useLanguage } from '../lib/language'

interface LiveProjectButtonProps {
  href?: string
  className?: string
}

/** Bouton ghost/outline (repris du template Jack). */
export default function LiveProjectButton({ href = '#', className = '' }: LiveProjectButtonProps) {
  const { t } = useLanguage()
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
    >
      {t('cta.live')}
    </a>
  )
}
