import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface Props {
  className?: string
  style?: React.CSSProperties
  startDelay?: number
}

/**
 * Animated top-down football pitch SVG.
 * Each line draws itself in sequence — UCL broadcast style.
 * Dimensions proportional to a real 105×68m pitch.
 */
export default function PitchLines({ className = '', style, startDelay = 1.5 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const elements = Array.from(
      svg.querySelectorAll<SVGGeometryElement>('[data-draw]')
    )

    // Initialise all elements invisible
    elements.forEach((el) => {
      const len = el.getTotalLength?.() ?? 500
      gsap.set(el, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 1,
      })
    })

    // Staggered draw-in animation
    elements.forEach((el, i) => {
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: i < 4 ? 1.4 : 0.9,
        delay: startDelay + i * 0.18,
        ease: 'power2.inOut',
      })
    })
  }, [startDelay])

  const S  = 'var(--pitch-stroke)'   // primary stroke — themed chalk
  const SA = 'var(--pitch-accent)'   // accent (spots, corners) — themed emerald

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* ── Pitch border ────────────────────────────────── */}
      <path
        data-draw
        d="M 2 2 H 598 V 388 H 2 Z"
        stroke={S}
        strokeWidth="1.8"
      />

      {/* ── Midfield line ───────────────────────────────── */}
      <path
        data-draw
        d="M 300 2 V 388"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Centre circle ───────────────────────────────── */}
      <circle
        data-draw
        cx="300" cy="195" r="52"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Centre spot ─────────────────────────────────── */}
      <circle
        data-draw
        cx="300" cy="195" r="3"
        stroke={SA}
        strokeWidth="2"
      />

      {/* ── Left penalty area ───────────────────────────── */}
      <path
        data-draw
        d="M 2 80 H 96 V 310 H 2"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Left goal area ──────────────────────────────── */}
      <path
        data-draw
        d="M 2 143 H 33 V 247 H 2"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Left penalty spot ───────────────────────────── */}
      <circle
        data-draw
        cx="63" cy="195" r="3"
        stroke={SA}
        strokeWidth="2"
      />

      {/* ── Left penalty arc ────────────────────────────── */}
      <path
        data-draw
        d="M 96 155 A 52 52 0 0 1 96 235"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Right penalty area ──────────────────────────── */}
      <path
        data-draw
        d="M 598 80 H 504 V 310 H 598"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Right goal area ─────────────────────────────── */}
      <path
        data-draw
        d="M 598 143 H 567 V 247 H 598"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Right penalty spot ──────────────────────────── */}
      <circle
        data-draw
        cx="537" cy="195" r="3"
        stroke={SA}
        strokeWidth="2"
      />

      {/* ── Right penalty arc ───────────────────────────── */}
      <path
        data-draw
        d="M 504 155 A 52 52 0 0 0 504 235"
        stroke={S}
        strokeWidth="1.5"
      />

      {/* ── Corner arcs ─────────────────────────────────── */}
      <path data-draw d="M 12 2 A 10 10 0 0 0 2 12"   stroke={SA} strokeWidth="1.5" />
      <path data-draw d="M 588 2 A 10 10 0 0 1 598 12"  stroke={SA} strokeWidth="1.5" />
      <path data-draw d="M 598 378 A 10 10 0 0 1 588 388" stroke={SA} strokeWidth="1.5" />
      <path data-draw d="M 12 388 A 10 10 0 0 1 2 378"  stroke={SA} strokeWidth="1.5" />
    </svg>
  )
}
