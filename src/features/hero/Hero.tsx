import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Trophy, Code2, Star } from 'lucide-react'
import HeroTitle from './components/HeroTitle'
import HeroSubtitle from './components/HeroSubtitle'
import PlayerCard from './components/PlayerCard'
import PitchLines from '../../shared/components/PitchLines'
import { PERSONAL } from '../../data/portfolio.data'
import type { Lang } from '../../shared/i18n'


function HeroStats({ language }: { language: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const items = language === 'es'
    ? [
        { icon: Trophy, value: '3+',    label: 'Años' },
        { icon: Code2,  value: '20h',   label: 'Ahorro semanal con IA' },
        { icon: Star,   value: 'Miles', label: 'Dispositivos IoT' },
      ]
    : [
        { icon: Trophy, value: '3+',    label: 'Years' },
        { icon: Code2,  value: '20h',   label: 'Weekly hours saved w/ AI' },
        { icon: Star,   value: '1000s', label: 'IoT devices (telemetry)' },
      ]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 2.5, ease: 'power3.out' }
    )
    // Count-up for numeric stats (3+, 10+)
    el.querySelectorAll<HTMLElement>('[data-count]').forEach((span) => {
      const target = Number(span.dataset.count)
      const suffix = span.dataset.suffix ?? ''
      const state = { n: 0 }
      gsap.to(state, {
        n: target,
        duration: 1.4,
        delay: 2.6,
        ease: 'power2.out',
        onUpdate: () => { span.textContent = `${Math.round(state.n)}${suffix}` },
      })
    })
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row w-full sm:w-fit rounded-xl overflow-hidden"
      style={{
        marginTop: '2.5rem',
        border: '1px solid var(--line)',
        background: 'var(--glass)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className="flex items-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 opacity-0 border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            style={{ borderColor: 'var(--line)' }}
          >
            <Icon size={16} style={{ color: '#10B981' }} />
            <div className="flex flex-col">
              <span
                className="font-display text-2xl font-semibold leading-none"
                style={{ color: 'var(--ucl-white)' }}
                {...(/^\d/.test(item.value)
                  ? { 'data-count': parseInt(item.value, 10), 'data-suffix': item.value.replace(/^\d+/, '') }
                  : {})}
              >
                {/^\d/.test(item.value) ? `0${item.value.replace(/^\d+/, '')}` : item.value}
              </span>
              <span className="font-mono text-xs mt-0.5 tracking-wider uppercase" style={{ color: 'var(--ucl-silver)' }}>
                {item.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ScrollIndicator({ language }: { language: Lang }) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--ucl-silver)' }}>
        {language === 'es' ? 'Saque inicial' : 'Kick-off'}
      </span>
      <div
        className="w-px h-12"
        style={{
          background: 'linear-gradient(to bottom, rgba(16,185,129,0.8), transparent)',
          animation: 'float-star 2s ease-in-out infinite',
        }}
      />
    </div>
  )
}

export default function Hero({ language, activeComp }: { language: Lang; activeComp: number }) {
  const title = language === 'es'
    ? 'Ingeniero de Software y Nube · Líder de IA'
    : 'Software & Cloud Engineer · AI Lead'

  return (
    <section id="hero" className="relative min-h-screen flex items-center section-padding overflow-hidden">

      {/* Stadium atmosphere background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}stadium-crowd-c.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.06,
        }}
      />

      {/* UCL logo watermark — large, very subtle */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '3%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '520px',
          height: '520px',
          opacity: 0.04,
          backgroundImage: `url(${import.meta.env.BASE_URL}ucl-logo.svg)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: 'brightness(10)',
        }}
      />

      {/* Animated pitch lines — behind the PlayerCard */}
      <PitchLines
        className="absolute pointer-events-none"
        style={{
          right: '-8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '62%',
          opacity: 1,
          zIndex: 1,
        }}
        startDelay={1.2}
      />

      {/* Left edge accent line — subtle emerald */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none"
        style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.35), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 min-w-0 w-full">
            <HeroTitle name={PERSONAL.shortName} title={title} />
            <HeroSubtitle language={language} />
            <HeroStats language={language} />
          </div>

          {/* Right: Player Card */}
          <div className="shrink-0 flex justify-center lg:justify-end w-full lg:w-auto">
            <PlayerCard activeComp={activeComp} />
          </div>
        </div>
      </div>

      <ScrollIndicator language={language} />

      <div
        className="absolute bottom-0 left-0 h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, var(--line), transparent)' }}
      />
    </section>
  )
}
