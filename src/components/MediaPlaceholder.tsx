import type { CSSProperties } from 'react'

const GRADS = [
  'linear-gradient(135deg,#1a1430,#3a1145,#7621B0)',
  'linear-gradient(135deg,#0c1a2a,#123047,#1f6f8b)',
  'linear-gradient(135deg,#2a0c1a,#5a1430,#B600A8)',
  'linear-gradient(135deg,#14140c,#33312a,#646973)',
  'linear-gradient(135deg,#2a1a0c,#5a3a14,#BE4C00)',
]

interface Props {
  label?: string
  seed?: number
  className?: string
  style?: CSSProperties
}

/** Placeholder visuel élégant en attendant les mockups générés. */
export default function MediaPlaceholder({ label, seed = 0, className = '', style }: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: GRADS[seed % GRADS.length], ...style }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 70% 18%, rgba(255,255,255,0.14), transparent 60%)' }}
      />
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-center px-4 text-[#D7E2EA]/70 font-medium uppercase tracking-widest text-xs sm:text-sm">
          {label}
        </span>
      )}
    </div>
  )
}
