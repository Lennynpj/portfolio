import { useEffect } from 'react'
import Lenis from 'lenis'

/** Active le smooth scroll Lenis — desktop uniquement.
 *  Sur mobile/tactile (ou prefers-reduced-motion) on garde le scroll natif :
 *  le momentum natif est plus fluide que le smooth-scroll JS qui se bat avec
 *  le thread principal (canvas 3D, images…). */
export default function useLenis() {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduced) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
