import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MapPin, Mail, GitBranch, ExternalLink, Download } from 'lucide-react'
import { PERSONAL } from '../../../data/portfolio.data'
import { useMagnetic } from '../../../shared/hooks/useMagnetic'
import type { Lang } from '../../../shared/i18n'

export default function HeroSubtitle({ language }: { language: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLAnchorElement>(null)
  const secondaryRef = useRef<HTMLAnchorElement>(null)
  useMagnetic(primaryRef, 0.22)
  useMagnetic(secondaryRef, 0.18)
  const copy = language === 'es'
    ? {
        summary: 'Juego de 10: conecto IA, nube e IoT en sistemas que eliminan trabajo manual y llegan a producción. Juego limpio, jugadas simples y bien ejecutadas.',
        primary: 'Ver jugadas',
        secondary: 'Contactarme',
        cv: 'Descargar CV',
        cvFile: '/cv/Andres-Guido-CV-ES.pdf',
      }
    : {
        summary: 'Playing as a number 10: I connect AI, cloud and IoT into systems that remove manual work and ship to production. Clean game, simple plays, well executed.',
        primary: 'View highlights',
        secondary: 'Contact me',
        cv: 'Download CV',
        cvFile: '/cv/Andres-Guido-CV-EN.pdf',
      }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, delay: 1.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div ref={ref} className="mt-8 flex flex-col gap-6">
      {/* Availability — the first thing a recruiter wants to know */}
      <div className="flex">
        <span
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase rounded-full w-fit"
          style={{
            padding: '7px 14px',
            border: '1px solid rgba(16,185,129,0.4)',
            background: 'rgba(16,185,129,0.07)',
            color: 'var(--ucl-gold)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#10B981', animation: 'nav-dot-pulse 2.2s ease-in-out infinite' }}
          />
          {language === 'es' ? 'Abierto a oportunidades' : 'Open to opportunities'}
        </span>
      </div>

      {/* Summary */}
      <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ color: 'var(--ucl-silver)' }}>
        {copy.summary}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap gap-5">
        <span className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--ucl-silver)' }}>
          <MapPin size={12} style={{ color: '#10B981' }} />
          {PERSONAL.location}
        </span>
        <a
          href={`mailto:${PERSONAL.email}`}
          className="flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--ucl-silver)' }}
        >
          <Mail size={12} style={{ color: '#10B981' }} />
          {PERSONAL.email}
        </a>
        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--ucl-silver)' }}
        >
          <GitBranch size={12} style={{ color: '#10B981' }} />
          GitHub
        </a>
        <a
          href={PERSONAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--ucl-silver)' }}
        >
          <ExternalLink size={12} style={{ color: '#10B981' }} />
          LinkedIn
        </a>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3 flex-wrap mt-1">
        <a
          ref={primaryRef}
          href="#projects"
          className="group relative flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase rounded-xl overflow-hidden transition-all duration-300"
          style={{
            padding: '14px 28px',
            background: 'linear-gradient(145deg, #10B981, #059669)',
            color: '#06251A',
            fontWeight: 700,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px -8px rgba(16,185,129,0.65), inset 0 1px 0 rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {copy.primary}
          <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '11px' }}>→</span>
        </a>

        <a
          ref={secondaryRef}
          href="#contact"
          className="group flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase rounded-xl transition-all duration-300"
          style={{
            padding: '14px 28px',
            border: '1px solid var(--chipline)',
            color: 'var(--ucl-white)',
            background: 'var(--chipbg)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.6)'; e.currentTarget.style.background = 'rgba(16,185,129,0.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--chipline)'; e.currentTarget.style.background = 'var(--chipbg)' }}
        >
          {copy.secondary}
          <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '11px' }}>→</span>
        </a>

        {/* CV download — both languages always available */}
        <div
          className="flex items-center font-mono text-xs tracking-[0.18em] uppercase rounded-xl overflow-hidden"
          style={{ border: '1px dashed var(--chipline)' }}
        >
          <span className="flex items-center gap-2" style={{ padding: '14px 12px 14px 20px', color: 'var(--ucl-silver)' }}>
            <Download size={13} />
            CV
          </span>
          <a
            href="/cv/Andres-Guido-CV-ES.pdf"
            download
            className="transition-colors duration-300 hover:text-[#34D399]"
            style={{ padding: '14px 10px', color: 'var(--ucl-white)' }}
          >
            ES
          </a>
          <span style={{ color: 'var(--ucl-silver)', opacity: 0.5 }}>·</span>
          <a
            href="/cv/Andres-Guido-CV-EN.pdf"
            download
            className="transition-colors duration-300 hover:text-[#34D399]"
            style={{ padding: '14px 20px 14px 10px', color: 'var(--ucl-white)' }}
          >
            EN
          </a>
        </div>
      </div>
    </div>
  )
}
