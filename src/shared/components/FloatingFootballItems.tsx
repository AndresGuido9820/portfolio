/**
 * FloatingFootballItems
 * Three infinite marquee rows of football jerseys (back view) and UCL trophies
 * that float across the background of a section, each item spinning slowly.
 */

const JERSEY_COLORS = [
  'rgba(15,60,185,0.72)',
  'rgba(5,20,95,0.78)',
  'rgba(20,75,210,0.68)',
  'rgba(8,35,130,0.74)',
  'rgba(12,50,165,0.70)',
  'rgba(4,18,85,0.76)',
]

const TROPHY_COLORS = [
  'rgba(195,148,18,0.70)',
  'rgba(215,170,30,0.65)',
  'rgba(175,130,14,0.68)',
  'rgba(230,180,35,0.62)',
]

/* ── SVG shapes ──────────────────────────────────────────────────── */

function JerseySVG({ number, color }: { number: number; color: string }) {
  return (
    <svg
      viewBox="0 0 100 115"
      width="70"
      height="80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Body (back view) */}
      <path
        d="M 20 18 Q 13 54 12 100 L 88 100 Q 87 54 80 18 L 66 7 Q 58 24 50 24 Q 42 24 34 7 Z"
        fill={color}
      />
      {/* Left sleeve */}
      <path d="M 20 18 L 1 31 L 4 55 L 26 46 Z" fill={color} />
      {/* Right sleeve */}
      <path d="M 80 18 L 99 31 L 96 55 L 74 46 Z" fill={color} />
      {/* Jersey number */}
      <text
        x="50"
        y="76"
        textAnchor="middle"
        fontSize="34"
        fontWeight="900"
        fontFamily="'Bebas Neue', sans-serif"
        fill="rgba(255,255,255,0.38)"
      >
        {number}
      </text>
    </svg>
  )
}

function TrophySVG({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 80 122"
      width="52"
      height="80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Cup body */}
      <path
        d="M 16 26 Q 15 74 31 84 Q 37 89 40 89 Q 43 89 49 84 Q 65 74 64 26 Z"
        fill={color}
      />
      {/* Lid */}
      <ellipse cx="40" cy="26" rx="24" ry="9" fill={color} />
      {/* Top finial */}
      <path
        d="M 35 17 Q 38 9 40 7 Q 42 9 45 17"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Left handle */}
      <path
        d="M 16 34 Q 1 42 2 58 Q 3 68 16 63"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Right handle */}
      <path
        d="M 64 34 Q 79 42 78 58 Q 77 68 64 63"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Stem */}
      <rect x="34" y="89" width="12" height="16" fill={color} />
      {/* Base steps */}
      <rect x="22" y="105" width="36" height="6" rx="2" fill={color} />
      <rect x="17" y="111" width="46" height="6" rx="2" fill={color} />
    </svg>
  )
}

/* ── Row data ────────────────────────────────────────────────────── */

type FootballItem =
  | { type: 'jersey'; num: number; color: string }
  | { type: 'trophy'; color: string }

const ROW_A: FootballItem[] = [
  { type: 'jersey', num: 1,  color: JERSEY_COLORS[0]! },
  { type: 'trophy',           color: TROPHY_COLORS[0]! },
  { type: 'jersey', num: 10, color: JERSEY_COLORS[1]! },
  { type: 'trophy',           color: TROPHY_COLORS[1]! },
  { type: 'jersey', num: 7,  color: JERSEY_COLORS[2]! },
  { type: 'trophy',           color: TROPHY_COLORS[2]! },
  { type: 'jersey', num: 4,  color: JERSEY_COLORS[3]! },
  { type: 'trophy',           color: TROPHY_COLORS[3]! },
]

const ROW_B: FootballItem[] = [
  { type: 'trophy',           color: TROPHY_COLORS[1]! },
  { type: 'jersey', num: 9,  color: JERSEY_COLORS[4]! },
  { type: 'trophy',           color: TROPHY_COLORS[0]! },
  { type: 'jersey', num: 6,  color: JERSEY_COLORS[5]! },
  { type: 'trophy',           color: TROPHY_COLORS[3]! },
  { type: 'jersey', num: 11, color: JERSEY_COLORS[1]! },
  { type: 'trophy',           color: TROPHY_COLORS[2]! },
  { type: 'jersey', num: 3,  color: JERSEY_COLORS[3]! },
]

/* ── Row component ───────────────────────────────────────────────── */

function MarqueeRow({
  items,
  direction,
  duration,
  top,
}: {
  items: FootballItem[]
  direction: 'left' | 'right'
  duration: number
  top: string
}) {
  // Duplicate items for seamless loop
  const track = [...items, ...items]

  return (
    <div
      className="absolute flex items-center"
      style={{
        top,
        gap: '48px',
        animation: `marquee-${direction} ${duration}s linear infinite`,
        willChange: 'transform',
      }}
    >
      {track.map((item, i) => {
        const spinDir = i % 2 === 0 ? 'spin-cw' : 'spin-ccw'
        const spinDur = item.type === 'trophy' ? 10 + (i % 3) * 3 : 14 + (i % 4) * 3

        return (
          <div
            key={i}
            style={{
              animation: `${spinDir} ${spinDur}s linear infinite`,
              transformOrigin: 'center center',
              flexShrink: 0,
            }}
          >
            {item.type === 'jersey'
              ? <JerseySVG number={item.num} color={item.color} />
              : <TrophySVG color={item.color} />}
          </div>
        )
      })}
    </div>
  )
}

/* ── Main export ─────────────────────────────────────────────────── */

export default function FloatingFootballItems() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    >
      <MarqueeRow items={ROW_A} direction="left"  duration={38} top="8%"  />
      <MarqueeRow items={ROW_B} direction="right" duration={28} top="44%" />
      <MarqueeRow items={ROW_A} direction="left"  duration={46} top="78%" />
    </div>
  )
}
