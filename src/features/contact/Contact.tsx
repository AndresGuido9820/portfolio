import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Phone, GitBranch, ExternalLink } from 'lucide-react'
import { PERSONAL } from '../../data/portfolio.data'
import type { Lang } from '../../shared/i18n'

gsap.registerPlugin(ScrollTrigger)

function ContactLink({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-5 card-glass rounded-xl transition-all duration-300 hover:scale-[1.02] group"
      style={{ borderLeft: '2px solid rgba(16,185,129,0.45)' }}
    >
      <div style={{ color: 'var(--ucl-gold)' }}>{icon}</div>
      <div>
        <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--ucl-silver)' }}>
          {label}
        </div>
        <div
          className="font-mono text-sm group-hover:text-[#34D399] transition-colors"
          style={{ color: 'var(--ucl-silver)' }}
        >
          {value}
        </div>
      </div>
      {href && (
        <ExternalLink
          size={14}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--ucl-gold)' }}
        />
      )}
    </Tag>
  )
}

export default function Contact({ language }: { language: Lang }) {
  const ref = useRef<HTMLElement>(null)
  const copy = language === 'es'
    ? {
        label: '— 05 · Contacto',
        titleA: 'Hablemos',
        titleB: '',
        summary: 'Abierto a oportunidades en ingeniería cloud, software, automatización, IA e IoT. ¿Armamos equipo?',
        cta: 'Empezar Conversación',
        location: 'Ubicación',
      }
    : {
        label: '— 05 · Contact',
        titleA: "Let's",
        titleB: 'Connect',
        summary: "Open to opportunities in cloud engineering, software, automation, AI, and IoT. Shall we team up?",
        cta: 'Start the Conversation',
        location: 'Location',
      }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.contact-reveal'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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
    <section
      ref={ref}
      id="contact"
      className="relative section-padding overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.03), transparent)',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center bottom, rgba(16,185,129,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="contact-reveal inline-block font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--ucl-gold)' }}
          >
            {copy.label}
          </span>

          <h2
            className="contact-reveal font-display leading-none tracking-wide uppercase"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--ucl-white)' }}
          >
            {copy.titleA}
            {copy.titleB && (
              <>
                {' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, var(--ucl-gold-light), var(--ucl-gold))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {copy.titleB}
                </span>
              </>
            )}
          </h2>

          <p
            className="contact-reveal mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--ucl-silver)' }}
          >
            {copy.summary}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="contact-reveal">
            <ContactLink
              icon={<Mail size={20} />}
              label="Email"
              value={PERSONAL.email}
              href={`mailto:${PERSONAL.email}`}
            />
          </div>
          <div className="contact-reveal">
            <ContactLink
              icon={<Phone size={20} />}
              label={language === 'es' ? 'Teléfono' : 'Phone'}
              value={PERSONAL.phone}
              href={`tel:${PERSONAL.phone}`}
            />
          </div>
          <div className="contact-reveal">
            <ContactLink
              icon={<GitBranch size={20} />}
              label="GitHub"
              value={PERSONAL.github.replace('https://', '')}
              href={PERSONAL.github}
            />
          </div>
          <div className="contact-reveal">
            <ContactLink
              icon={<ExternalLink size={20} />}
              label="LinkedIn"
              value="linkedin.com/in/andres-felipe-guido"
              href={PERSONAL.linkedin}
            />
          </div>
          <div className="contact-reveal">
            <ContactLink
              icon={<MapPin size={20} />}
              label={copy.location}
              value={PERSONAL.location}
            />
          </div>
        </div>

        {/* Big CTA */}
        <div className="contact-reveal text-center">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="group relative inline-flex items-center gap-3 px-10 py-4 font-mono text-sm md:text-base tracking-[0.22em] uppercase overflow-hidden rounded-full transition-all duration-300"
            style={{
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.55)',
              color: '#34D399',
              boxShadow: '0 0 0 rgba(16,185,129,0)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 10px 34px -10px rgba(16,185,129,0.55)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(16,185,129,0)' }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#06251A]" style={{ fontWeight: 700 }}>
              {copy.cta}
            </span>
            <Mail
              size={18}
              className="relative z-10 transition-colors duration-300 group-hover:text-[#06251A]"
            />
            <div
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
              style={{ background: 'linear-gradient(145deg, #10B981, #059669)' }}
            />
          </a>

          <div className="mt-5 font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--ucl-silver)' }}>
            ↓ {language === 'es' ? 'Descargar CV' : 'Download CV'}:{' '}
            <a href={import.meta.env.BASE_URL + 'cv/Andres-Guido-CV-ES.pdf'} download className="transition-colors duration-300 hover:text-[#34D399]" style={{ color: 'var(--ucl-white)' }}>ES</a>
            {' · '}
            <a href={import.meta.env.BASE_URL + 'cv/Andres-Guido-CV-EN.pdf'} download className="transition-colors duration-300 hover:text-[#34D399]" style={{ color: 'var(--ucl-white)' }}>EN</a>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-reveal mt-20 pt-8 text-center" style={{ borderTop: '1px solid var(--line)' }}>
          <p className="font-mono text-xs tracking-widest" style={{ color: 'var(--ucl-gold-dim)' }}>
            © 2026 Andrés Felipe Guido Montoya · {language === 'es' ? 'Hecho con React + Three.js + GSAP' : 'Built with React + Three.js + GSAP'}
          </p>
          <div
            className="mt-4 mx-auto h-px max-w-xs"
            style={{ background: 'linear-gradient(90deg, transparent, var(--ucl-gold-dim), transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
