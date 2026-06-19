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
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const decimals = match && match[1].includes('.') ? 1 : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || !match) return
    let raf = 0
    const start = performance.now()
    const dur = 1200
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      setN(target * easeOut(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, match, target])

  return (
    <span ref={ref} className={className} style={style}>
      {match ? `${n.toFixed(decimals)}${suffix}` : value}
    </span>
  )
}
