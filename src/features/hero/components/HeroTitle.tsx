import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroTitleProps {
  name: string
  title: string
}

function splitChars(text: string) {
  return text.split('').map((char, i) => (
    <span key={i} className="inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

export default function HeroTitle({ name, title }: HeroTitleProps) {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nameEl = nameRef.current
    const titleEl = titleRef.current
    const lineEl = lineRef.current
    if (!nameEl || !titleEl || !lineEl) return

    const chars = nameEl.querySelectorAll('span')
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      chars,
      { y: 120, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.04, ease: 'back.out(1.5)' }
    )
      .fromTo(lineEl, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.8, ease: 'power4.inOut' }, '-=0.3')
      .fromTo(titleEl, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  }, [])

  return (
    <div className="overflow-hidden">
      <h1
        ref={nameRef}
        className="font-display leading-[0.9] uppercase"
        style={{
          fontSize: 'clamp(3rem, 10vw, 9rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--ucl-white)',
          textShadow: '0 0 60px rgba(16,185,129,0.28)',
        }}
      >
        {splitChars(name.split(' ')[0])}
        <br />
        <span style={{ color: '#10B981' }}>
          {splitChars(name.split(' ').slice(1).join(' '))}
        </span>
      </h1>

      {/* Separator */}
      <div
        ref={lineRef}
        className="my-6 h-px"
        style={{
          background: 'linear-gradient(90deg, #10B981 0%, rgba(16,185,129,0.15) 60%, transparent 100%)',
          maxWidth: '520px',
        }}
      />

      {/* Role */}
      <div
        ref={titleRef}
        className="font-mono text-sm md:text-base tracking-[0.25em] uppercase flex items-center gap-3"
        style={{ color: 'var(--ucl-silver)' }}
      >
        {title}
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }}
        />
      </div>
    </div>
  )
}
