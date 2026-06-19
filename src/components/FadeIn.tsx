import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

type Tag = 'div' | 'section' | 'h1' | 'h2' | 'h3' | 'p' | 'nav' | 'span' | 'ul' | 'li'

interface FadeInProps {
  children: ReactNode
  as?: Tag
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  style?: CSSProperties
  /** Joue l'animation dès le montage (contenu au-dessus de la ligne de flottaison). */
  appear?: boolean
}

/**
 * Wrapper d'apparition (repris du template Jack).
 * Par défaut : au scroll (whileInView). Avec `appear` : au montage (animate).
 */
export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  appear = false,
}: FadeInProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag: any = (motion as any)[as]
  const shown = { opacity: 1, x: 0, y: 0 }
  const inViewProps = appear
    ? { animate: shown }
    : { whileInView: shown, viewport: { once: true, margin: '50px', amount: 0 } }
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...inViewProps}
    >
      {children}
    </MotionTag>
  )
}
