import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'framer-motion'

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)

interface Props {
  value: string
  className?: string
  style?: CSSProperties
}

/** Compteur animé : extrait le nombre de tête ("50+", "4.9/5"…) et l'anime à l'apparition. */
export default function CountUp({ value, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const match = value.match(/^([\d.]+)(.*)$/)
  const hasNumber = match !== null
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const decimals = match && match[1].includes('.') ? 1 : 0
  const [n, setN] = useState(0)

  // ⚠️ Dépendances = primitives STABLES (hasNumber, target), surtout PAS `match` :
  // `value.match()` renvoie un nouvel objet à chaque render, donc à chaque frame
  // (setN → render → nouveau match) l'effet se relançait, remettait `start` à
  // "maintenant" et annulait le timer → l'anim restait figée à ~0 % ("0h", "0.1/5").
  useEffect(() => {
    if (!inView || !hasNumber) return
    // Mobile / reduced-motion : valeur finale directe (pas d'anim per-frame).
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reduced || isTouch) {
      setN(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1200
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      setN(target * easeOut(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Filet de sécurité si rAF est throttlé (onglet en arrière-plan).
    const safety = setTimeout(() => setN(target), dur + 250)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
    }
  }, [inView, hasNumber, target])

  return (
    <span ref={ref} className={className} style={style}>
      {hasNumber ? `${n.toFixed(decimals)}${suffix}` : value}
    </span>
  )
}
