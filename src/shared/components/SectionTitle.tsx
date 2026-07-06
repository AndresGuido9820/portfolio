import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTitleProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ label, title, subtitle, align = 'left' }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Broadcast line draws left → right first
      tl.fromTo(
        el.querySelector('.broadcast-line-inner'),
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }
      )

      // Masked title reveal — the headline slides up from behind a clipping line
      tl.fromTo(
        el.querySelector('.title-mask-inner'),
        { yPercent: 108 },
        { yPercent: 0, duration: 0.9, ease: 'power4.out' },
        '-=0.2'
      )

      // Then label / subtitle / underline reveal
      tl.fromTo(
        el.querySelectorAll('.reveal-item'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.6'
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const isCenter = align === 'center'

  return (
    <div ref={ref} className={`mb-16 ${isCenter ? 'text-center' : ''}`}>

      {/* Broadcast line — draws before content reveals */}
      <div
        style={{
          height: '1px',
          marginBottom: '0.85rem',
          overflow: 'hidden',
          width: isCenter ? '50%' : '38%',
          marginLeft: isCenter ? 'auto' : undefined,
          marginRight: isCenter ? 'auto' : undefined,
        }}
      >
        <div
          className="broadcast-line-inner"
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, #10B981 0%, rgba(16,185,129,0.4) 70%, transparent 100%)',
          }}
        />
      </div>

      <span
        className="reveal-item inline-block font-mono text-xs tracking-[0.3em] uppercase mb-3"
        style={{ color: 'var(--ucl-gold)' }}
      >
        — {label}
      </span>

      <div style={{ overflow: 'hidden' }}>
        <h2
          className="title-mask-inner font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight uppercase"
          style={{ color: 'var(--ucl-white)', fontWeight: 700 }}
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <p
          className="reveal-item mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{
            color: 'var(--ucl-silver)',
            marginLeft: isCenter ? 'auto' : undefined,
            marginRight: isCenter ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Gold underline */}
      <div
        className="reveal-item mt-6 h-px"
        style={{
          background: 'linear-gradient(90deg, var(--ucl-gold) 0%, transparent 60%)',
          width: isCenter ? '50%' : '40%',
          marginLeft: isCenter ? 'auto' : undefined,
          marginRight: isCenter ? 'auto' : undefined,
        }}
      />
    </div>
  )
}
