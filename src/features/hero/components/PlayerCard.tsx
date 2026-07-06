import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PlayerCard(_props: { activeComp?: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    gsap.fromTo(
      card,
      { x: 100, opacity: 0, rotationY: -20, scale: 0.9 },
      { x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.4, delay: 1.0, ease: 'power3.out', transformPerspective: 1200 }
    )
  }, [])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    gsap.to(card, { rotationY: x * 10, rotationX: -y * 10, transformPerspective: 1000, duration: 0.35, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotationX: 0, rotationY: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative select-none opacity-0"
      style={{
        transformStyle: 'preserve-3d',
        width: 'fit-content',
        padding: '10px',
        borderRadius: '22px',
        background:
          'radial-gradient(circle at 50% 16%, var(--card-glow), transparent 36%), linear-gradient(145deg, var(--card-frame-a), var(--card-frame-b))',
        border: '1px solid var(--line)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 0 30px rgba(16,185,129,0.12), 0 18px 40px -20px rgba(0,0,0,0.30), inset 0 0 44px rgba(16,185,129,0.03)',
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.06) 50%, transparent 75%)',
          filter: 'blur(12px)',
          zIndex: 0,
        }}
      />

      {/* Bottom glow beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60px',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.4) 0%, transparent 70%)',
          filter: 'blur(10px)',
          zIndex: 0,
        }}
      />

      {/* Card image */}
      <img
        src="/andres-card-clean.png"
        alt="Player Card"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '360px',
          display: 'block',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(16,185,129,0.14))',
        }}
      />

      {/* Holographic shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(105deg, transparent 30%, rgba(220,255,240,0.05) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 4s ease-in-out infinite',
        }}
      />
    </div>
  )
}
