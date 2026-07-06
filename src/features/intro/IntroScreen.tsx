import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { Lang } from '../../shared/i18n'

interface Props {
  language: Lang
  onEnter: () => void
  /** Fast exit — bypasses the tunnel transition entirely. */
  onSkip?: () => void
}

const ACCENT = '#10B981'
const ACCENT_SOFT = 'rgba(16,185,129,0.9)'
const MUTED = 'rgba(155,161,166,0.85)'

function Emblem() {
  return (
    <div
      style={{
        width: '104px',
        height: '104px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 18px rgba(16,185,129,0.55)) drop-shadow(0 0 40px rgba(16,185,129,0.25))',
      }}
    >
      <img
        src="/ucl-logo.svg"
        alt="emblem"
        style={{ width: '96px', height: '96px', objectFit: 'contain', opacity: 0.95 }}
      />
    </div>
  )
}

function CountdownBar({ progress }: { progress: number }) {
  return (
    <div className="w-64 h-px relative" style={{ background: 'rgba(255,255,255,0.10)' }}>
      <div
        className="absolute top-0 left-0 h-full transition-none"
        style={{
          width: `${progress}%`,
          background: ACCENT,
          boxShadow: '0 0 10px rgba(16,185,129,0.7)',
        }}
      />
    </div>
  )
}

export default function IntroScreen({ language, onEnter, onSkip }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [showBtn, setShowBtn] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    const logo = logoRef.current
    const title = titleRef.current
    const lines = linesRef.current
    if (!el || !logo || !title || !lines) return

    const tl = gsap.timeline()

    tl.fromTo(lines.children, { scaleX: 0 }, {
      scaleX: 1, duration: 0.06, stagger: 0.015, ease: 'none',
    })

    tl.fromTo(
      logo,
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.4)' },
      '+=0.1'
    )

    tl.to(logo, {
      filter: 'drop-shadow(0 0 34px rgba(16,185,129,0.9)) drop-shadow(0 0 70px rgba(16,185,129,0.4))',
      duration: 0.6, ease: 'power2.inOut', yoyo: true, repeat: 1,
    })

    tl.fromTo(
      title.querySelectorAll('.intro-char'),
      { y: 60, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.06, stagger: 0.045, ease: 'back.out(1.2)' },
      '-=0.3'
    )

    tl.to({}, {
      duration: 1.3, ease: 'power1.inOut',
      onUpdate() { setProgress(Math.round(this.progress() * 100)) },
      onComplete() { setShowBtn(true) },
    }, '+=0.2')
  }, [])

  useEffect(() => {
    if (!showBtn || !btnRef.current) return
    gsap.fromTo(
      btnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [showBtn])

  const handleEnter = () => {
    if (entered) return
    setEntered(true)
    const el = containerRef.current
    if (!el) return
    gsap.to(el, { opacity: 0, scale: 1.04, duration: 0.7, ease: 'power3.inOut', onComplete: onEnter })
  }

  const handleSkip = () => {
    if (entered) return
    setEntered(true)
    const el = containerRef.current
    const fin = onSkip ?? onEnter
    if (!el) { fin(); return }
    gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power2.out', onComplete: fin })
  }

  const first = 'ANDRÉS'.split('')
  const last = 'GUIDO'.split('')
  const copy = language === 'es'
    ? { kicker: 'Portafolio', role: 'Full Stack · IA / LLMs · Cloud & IoT', loading: 'CALENTANDO', ready: 'LISTO', button: 'Salir al campo', skip: 'Saltar intro' }
    : { kicker: 'Portfolio', role: 'Full Stack · AI / LLMs · Cloud & IoT', loading: 'WARMING UP', ready: 'READY', button: 'Take the pitch', skip: 'Skip intro' }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Scan lines */}
      <div ref={linesRef} className="absolute inset-0 pointer-events-none flex flex-col justify-around" style={{ gap: 0 }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="w-full"
            style={{
              height: '1px',
              background: i % 6 === 0 ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.012)',
              transformOrigin: 'left',
            }}
          />
        ))}
      </div>

      {/* Radial backdrop glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '620px', height: '620px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 68%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="mb-9 opacity-0">
        <Emblem />
      </div>

      {/* Kicker */}
      <div className="flex items-center gap-3 mb-5">
        <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <span className="font-mono text-[11px] tracking-[0.45em] uppercase" style={{ color: ACCENT_SOFT }}>
          {copy.kicker}
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: MUTED }}>#10</span>
        <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
      </div>

      {/* Main title */}
      <div ref={titleRef} className="mb-4">
        <div
          className="font-display flex flex-wrap justify-center leading-[0.9]"
          style={{ fontSize: 'clamp(3rem, 11vw, 8.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          {first.map((char, i) => (
            <span key={`f${i}`} className="intro-char inline-block" style={{ color: 'var(--ucl-white)' }}>
              {char}
            </span>
          ))}
          <span className="intro-char inline-block" style={{ width: '0.35em' }}>&nbsp;</span>
          {last.map((char, i) => (
            <span key={`l${i}`} className="intro-char inline-block" style={{ color: ACCENT }}>
              {char}
            </span>
          ))}
        </div>
      </div>

      <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-12" style={{ color: MUTED }}>
        {copy.role}
      </p>

      {/* Progress */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <CountdownBar progress={progress} />
        <span className="font-mono text-[11px] tracking-[0.25em]" style={{ color: MUTED }}>
          {progress < 100 ? `${copy.loading} ${progress}%` : copy.ready}
        </span>
      </div>

      {/* Enter button */}
      {showBtn && (
        <button
          ref={btnRef}
          onClick={handleEnter}
          className="group relative px-12 py-4 font-mono text-sm tracking-[0.35em] uppercase overflow-hidden opacity-0 rounded-full"
          style={{ border: `1px solid ${ACCENT}`, color: ACCENT, background: 'transparent' }}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
            {copy.button}
          </span>
          <div
            className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            style={{ background: ACCENT }}
          />
        </button>
      )}

      {/* Skip — always available; a recruiter in a hurry never waits */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-10 font-mono text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-white"
        style={{ color: 'rgba(155,161,166,0.55)' }}
      >
        {copy.skip} →
      </button>

      {/* Corner accents */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} pointer-events-none`}>
          <div
            className="w-6 h-6"
            style={{
              borderTop: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              borderBottom: i >= 2 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              borderLeft: i % 2 === 0 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              borderRight: i % 2 === 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
            }}
          />
        </div>
      ))}
    </div>
  )
}
