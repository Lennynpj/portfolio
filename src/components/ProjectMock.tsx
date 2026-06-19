import { useId, type CSSProperties } from 'react'
import type { MockVariant } from '../data/projects'

export type MockPart = 'hero' | 'widgetA' | 'widgetB'

const C = {
  bg: '#0c0c0c',
  panel: '#16161d',
  panel2: '#1f1f29',
  line: '#2c2c38',
  mist: '#D7E2EA',
  mute: '#5b606b',
}

interface Props {
  variant: MockVariant
  part: MockPart
  accent: string
  accent2?: string
  label?: string
  className?: string
  style?: CSSProperties
}

/** Mockup d'interface en SVG (placeholder soigné en attendant les vrais visuels). */
export default function ProjectMock({
  variant,
  part,
  accent,
  accent2,
  label,
  className = '',
  style,
}: Props) {
  const raw = useId()
  const gid = 'g' + raw.replace(/[^a-zA-Z0-9]/g, '')
  const grad = `url(#${gid})`
  const vb = part === 'hero' ? '0 0 360 480' : part === 'widgetA' ? '0 0 320 180' : '0 0 240 240'

  return (
    <div className={`relative overflow-hidden bg-[#0c0c0c] ${className}`} style={style}>
      <svg
        viewBox={vb}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={accent} />
            <stop offset="1" stopColor={accent2 ?? accent} />
          </linearGradient>
        </defs>
        {part === 'hero' && <Hero variant={variant} grad={grad} />}
        {part === 'widgetA' && <WidgetA grad={grad} />}
        {part === 'widgetB' && <WidgetB grad={grad} />}
      </svg>
      {label && (
        <span className="absolute left-3 bottom-3 text-[#D7E2EA]/85 font-medium uppercase tracking-widest text-[0.6rem] sm:text-xs">
          {label}
        </span>
      )}
    </div>
  )
}

function Star({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2
    const r = i % 2 === 0 ? s : s * 0.45
    pts.push(`${(x + r * Math.cos(ang)).toFixed(1)},${(y + r * Math.sin(ang)).toFixed(1)}`)
  }
  return <polygon points={pts.join(' ')} fill={fill} />
}

function Hero({ variant, grad }: { variant: MockVariant; grad: string }) {
  switch (variant) {
    case 'ai':
      return <HeroAI grad={grad} />
    case 'fintech':
      return <HeroFintech grad={grad} />
    case 'saas':
      return <HeroSaas grad={grad} />
    case 'reviews':
      return <HeroReviews grad={grad} />
    case 'landing':
      return <HeroLanding grad={grad} />
  }
}

function HeroAI({ grad }: { grad: string }) {
  return (
    <>
      <rect width="360" height="480" fill={C.bg} />
      <circle cx="300" cy="40" r="150" fill={grad} opacity="0.12" />
      <rect x="22" y="20" width="70" height="10" rx="5" fill={C.mist} opacity="0.85" />
      <rect x="300" y="16" width="38" height="16" rx="8" fill={C.panel2} />
      <rect x="22" y="46" width="150" height="300" rx="14" fill={C.panel} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x="36" y={66 + i * 30} width={i % 3 === 0 ? 110 : 86} height="8" rx="4" fill={C.line} />
      ))}
      <rect x="184" y="46" width="154" height="150" rx="14" fill={C.panel} />
      <circle cx="261" cy="120" r="40" fill="none" stroke={C.line} strokeWidth="10" />
      <circle
        cx="261"
        cy="120"
        r="40"
        fill="none"
        stroke={grad}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="251"
        strokeDashoffset="45"
        transform="rotate(-90 261 120)"
      />
      <text x="261" y="128" textAnchor="middle" fill={C.mist} fontSize="26" fontWeight="800" fontFamily="Kanit, sans-serif">
        92
      </text>
      <rect x="184" y="206" width="154" height="140" rx="14" fill={C.panel} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="200" y={224 + i * 28} width="100" height="8" rx="4" fill={C.line} />
          <rect x="200" y={224 + i * 28} width={88 - i * 16} height="8" rx="4" fill={grad} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <rect key={i} x="22" y={360 + i * 52} width="316" height="44" rx="12" fill={C.panel} />
      ))}
      <rect x="34" y="374" width="120" height="8" rx="4" fill={C.mist} opacity="0.7" />
      <rect x="34" y="426" width="100" height="8" rx="4" fill={C.mist} opacity="0.7" />
      <rect x="300" y="372" width="26" height="12" rx="6" fill={grad} />
      <rect x="300" y="424" width="26" height="12" rx="6" fill={grad} />
    </>
  )
}

function HeroFintech({ grad }: { grad: string }) {
  return (
    <>
      <rect width="360" height="480" fill={C.bg} />
      <circle cx="180" cy="120" r="180" fill={grad} opacity="0.12" />
      <rect x="96" y="34" width="168" height="412" rx="34" fill={C.panel} stroke={C.line} strokeWidth="2" />
      <rect x="150" y="46" width="60" height="10" rx="5" fill={C.bg} />
      <circle cx="180" cy="110" r="28" fill={grad} />
      <rect x="140" y="150" width="80" height="9" rx="4" fill={C.mist} opacity="0.8" />
      <rect x="156" y="167" width="48" height="7" rx="3" fill={C.mute} />
      <text x="180" y="242" textAnchor="middle" fill={C.mist} fontSize="42" fontWeight="800" fontFamily="Kanit, sans-serif">
        5€
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={120 + i * 42} y="262" width="34" height="26" rx="8" fill={i === 1 ? grad : C.panel2} />
      ))}
      <rect x="120" y="318" width="120" height="40" rx="20" fill={grad} />
      <rect x="150" y="334" width="60" height="9" rx="4" fill="#fff" opacity="0.9" />
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx="134" cy={390 + i * 30} r="9" fill={C.panel2} />
          <rect x="150" y={386 + i * 30} width="80" height="7" rx="3" fill={C.line} />
        </g>
      ))}
    </>
  )
}

function HeroSaas({ grad }: { grad: string }) {
  return (
    <>
      <rect width="360" height="480" fill={C.bg} />
      <rect x="0" y="0" width="64" height="480" fill={C.panel} />
      <circle cx="32" cy="34" r="12" fill={grad} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="18" y={70 + i * 30} width="28" height="8" rx="4" fill={C.line} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={80 + i * 90} y="24" width="80" height="64" rx="12" fill={C.panel} />
          <rect x={92 + i * 90} y="38" width="40" height="7" rx="3" fill={C.mute} />
          <rect x={92 + i * 90} y="54" width="52" height="14" rx="4" fill={grad} />
        </g>
      ))}
      <rect x="80" y="100" width="258" height="170" rx="14" fill={C.panel} />
      <path d="M96 240 L130 210 L165 224 L200 180 L235 196 L270 150 L322 168 L322 254 L96 254 Z" fill={grad} opacity="0.22" />
      <path d="M96 240 L130 210 L165 224 L200 180 L235 196 L270 150 L322 168" fill="none" stroke={grad} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="80" y={284 + i * 52} width="258" height="44" rx="12" fill={C.panel} />
          <circle cx="104" cy={306 + i * 52} r="11" fill={C.panel2} />
          <rect x="124" y={302 + i * 52} width="120" height="8" rx="4" fill={C.line} />
          <rect x="300" y={302 + i * 52} width="26" height="10" rx="5" fill={grad} />
        </g>
      ))}
    </>
  )
}

function HeroReviews({ grad }: { grad: string }) {
  return (
    <>
      <rect width="360" height="480" fill={C.bg} />
      <circle cx="300" cy="40" r="150" fill={grad} opacity="0.12" />
      <rect x="22" y="24" width="90" height="10" rx="5" fill={C.mist} opacity="0.85" />
      <text x="34" y="120" fill={C.mist} fontSize="54" fontWeight="800" fontFamily="Kanit, sans-serif">
        4.9
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} x={150 + i * 38} y={96} s={15} fill={grad} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="34" y={150 + i * 17} width="230" height="9" rx="4" fill={C.panel} />
          <rect x="34" y={150 + i * 17} width={210 - i * 44} height="9" rx="4" fill={grad} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x="22" y={258 + i * 100} width="316" height="86" rx="14" fill={C.panel} />
          <circle cx="50" cy={286 + i * 100} r="14" fill={C.panel2} />
          <rect x="74" y={276 + i * 100} width="90" height="8" rx="4" fill={C.line} />
          {[0, 1, 2, 3, 4].map((j) => (
            <Star key={j} x={80 + j * 20} y={300 + i * 100} s={7} fill={grad} />
          ))}
          <rect x="36" y={320 + i * 100} width="288" height="7" rx="3" fill={C.line} />
        </g>
      ))}
    </>
  )
}

function HeroLanding({ grad }: { grad: string }) {
  return (
    <>
      <rect width="360" height="480" fill={C.bg} />
      <rect x="18" y="24" width="324" height="432" rx="16" fill={C.panel} />
      <rect x="18" y="24" width="324" height="34" fill={C.panel2} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={40 + i * 16} cy="41" r="4" fill={C.mute} />
      ))}
      <rect x="40" y="80" width="54" height="9" rx="4" fill={C.mist} opacity="0.85" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={214 + i * 38} y="81" width="28" height="7" rx="3" fill={C.line} />
      ))}
      <rect x="40" y="124" width="220" height="16" rx="6" fill={C.mist} opacity="0.85" />
      <rect x="40" y="150" width="168" height="16" rx="6" fill={C.mist} opacity="0.55" />
      <rect x="40" y="188" width="98" height="30" rx="15" fill={grad} />
      <rect x="40" y="240" width="280" height="124" rx="14" fill={grad} opacity="0.85" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={40 + i * 94} y="380" width="84" height="58" rx="12" fill={C.panel2} />
      ))}
    </>
  )
}

function WidgetA({ grad }: { grad: string }) {
  return (
    <>
      <rect width="320" height="180" fill={C.bg} />
      <rect x="14" y="14" width="292" height="152" rx="14" fill={C.panel} />
      <rect x="28" y="28" width="70" height="7" rx="3" fill={C.mute} />
      <rect x="28" y="42" width="48" height="13" rx="4" fill={C.mist} opacity="0.85" />
      <path d="M28 140 L66 116 L104 126 L142 92 L180 104 L218 70 L292 96 L292 150 L28 150 Z" fill={grad} opacity="0.22" />
      <path d="M28 140 L66 116 L104 126 L142 92 L180 104 L218 70 L292 96" fill="none" stroke={grad} strokeWidth="3" />
      {[
        [66, 116],
        [142, 92],
        [218, 70],
        [292, 96],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={C.mist} />
      ))}
    </>
  )
}

function WidgetB({ grad }: { grad: string }) {
  return (
    <>
      <rect width="240" height="240" fill={C.bg} />
      <rect x="16" y="16" width="208" height="208" rx="16" fill={C.panel} />
      <circle cx="86" cy="120" r="40" fill="none" stroke={C.line} strokeWidth="14" />
      <circle
        cx="86"
        cy="120"
        r="40"
        fill="none"
        stroke={grad}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="251"
        strokeDashoffset="84"
        transform="rotate(-90 86 120)"
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="150" y={92 + i * 26} width="12" height="12" rx="3" fill={i === 0 ? grad : C.panel2} />
          <rect x="170" y={95 + i * 26} width="46" height="7" rx="3" fill={C.line} />
        </g>
      ))}
    </>
  )
}
