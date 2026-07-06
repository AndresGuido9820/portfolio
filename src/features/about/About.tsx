import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '../../shared/components/SectionTitle'
import { EDUCATION } from '../../data/portfolio.data'
import type { Lang } from '../../shared/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function About({ language }: { language: Lang }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const copy = language === 'es'
    ? {
        label: '01 — Sobre mí',
        title: 'El Jugador',
        subtitle: 'Ingeniero. Constructor. Nube, IA e IoT.',
        paragraph: 'Disfruto el proceso tanto como el resultado: entender el problema, armar la jugada y ejecutarla con calma. Fuera del código, el fútbol me enseñó lo que aplico en ingeniería — visión de juego, trabajo en equipo y tocar simple.',
        education: 'Educación',
        summary: 'Ingeniero de Sistemas y Computación de la Universidad Nacional de Colombia. En Sento lidero las implementaciones con IA (LLMs, RAG, agentes) y construyo la infraestructura cloud e IoT que las sostiene en producción.',
        degree: 'Ingeniería de Sistemas y Computación',
        period: 'Oct 2021 — Jun 2026',
        stats: [
          { value: 'AI', label: 'Automatización e IA aplicada' },
          { value: 'IoT', label: 'Integraciones y telemetría' },
          { value: 'AWS', label: 'Infraestructura en nube' },
          { value: 'LLM', label: 'RAG, agentes y herramientas' },
          { value: 'OSS', label: 'Contribuciones de código abierto' },
          { value: '∞', label: 'Curiosidad técnica' },
        ],
      }
    : {
        label: '01 — About',
        title: 'The Player',
        subtitle: 'Engineer. Builder. Cloud, AI, and IoT.',
        paragraph: 'I enjoy the process as much as the result: understanding the problem, shaping the play, and executing it calmly. Off the keyboard, football taught me what I apply to engineering — vision, teamwork, and keeping it simple.',
        education: 'Education',
        summary: 'Systems and Computer Engineer from Universidad Nacional de Colombia. At Sento I lead AI implementations (LLMs, RAG, agents) and build the cloud/IoT infrastructure that keeps them running in production.',
        degree: EDUCATION.degree,
        period: EDUCATION.period,
        stats: [
          { value: 'AI', label: 'Applied AI automation' },
          { value: 'IoT', label: 'Integrations and telemetry' },
          { value: 'AWS', label: 'Cloud infrastructure' },
          { value: 'LLM', label: 'RAG, agents and tooling' },
          { value: 'OSS', label: 'Open source contributions' },
          { value: '∞', label: 'Technical curiosity' },
        ],
      }

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.about-reveal'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="relative section-padding">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.03) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={copy.label}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio text */}
          <div className="space-y-6">
            <p className="about-reveal text-base md:text-lg leading-relaxed" style={{ color: 'var(--ucl-silver)' }}>
              {copy.summary}
            </p>

            <p className="about-reveal text-base leading-relaxed" style={{ color: 'var(--ucl-silver)', opacity: 0.7 }}>
              {copy.paragraph}
            </p>

            {/* Education block */}
            <div
              className="about-reveal card-glass p-6 mt-4"
              style={{ borderTop: '1px solid var(--ucl-gold)', background: 'transparent', backdropFilter: 'none' }}
            >
              <div className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--ucl-gold)' }}>
                {copy.education}
              </div>
              <div className="font-display text-xl" style={{ color: 'var(--ucl-white)' }}>
                {copy.degree}
              </div>
              <div className="font-mono text-sm mt-1" style={{ color: 'var(--ucl-silver)' }}>
                {EDUCATION.school}
              </div>
              <div className="font-mono text-xs mt-2" style={{ color: 'var(--ucl-gold-dim)' }}>
                {copy.period}
              </div>
            </div>
          </div>

          {/* Quick facts — info that lives nowhere else (the stack is covered by La Formación) */}
          <div className="flex flex-col gap-3">
            {(language === 'es'
              ? [
                  { k: 'Rol actual', v: 'Líder de Implementaciones con IA · Sento' },
                  { k: 'Idiomas', v: 'Español nativo · Inglés B2' },
                  { k: 'Base', v: 'Medellín, Colombia · Remoto friendly' },
                  { k: 'Foco', v: 'IA aplicada, cloud e IoT en producción' },
                ]
              : [
                  { k: 'Current role', v: 'AI Implementations Lead · Sento' },
                  { k: 'Languages', v: 'Native Spanish · English B2' },
                  { k: 'Based in', v: 'Medellín, Colombia · Remote friendly' },
                  { k: 'Focus', v: 'Applied AI, cloud and IoT in production' },
                ]
            ).map((fact) => (
              <div
                key={fact.k}
                className="about-reveal flex items-baseline justify-between gap-6 rounded-xl px-5 py-4"
                style={{ border: '1px solid var(--line)', background: 'var(--chipbg)' }}
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase shrink-0" style={{ color: 'var(--ucl-gold)' }}>
                  {fact.k}
                </span>
                <span className="text-sm text-right" style={{ color: 'var(--ucl-white)' }}>
                  {fact.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
