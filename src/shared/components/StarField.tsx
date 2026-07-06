import { useMemo } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

interface DriftingStar {
  id: number
  x: number
  size: number
  delay: number
  duration: number
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 2,
    opacity: Math.random() * 0.7 + 0.1,
  }))
}

function generateDriftStars(count: number): DriftingStar[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 12,
    duration: Math.random() * 10 + 8,
  }))
}

export default function StarField() {
  const stars = useMemo(() => generateStars(180), [])
  const driftStars = useMemo(() => generateDriftStars(25), [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static twinkling stars */}
      {stars.map((star) => (
        <div
          key={`s-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor:
              star.id % 5 === 0
                ? 'var(--ucl-gold-light)'
                : star.id % 7 === 0
                ? 'var(--ucl-gold)'
                : '#ffffff',
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite, float-star ${star.duration * 2.5}s ${star.delay}s ease-in-out infinite`,
            boxShadow:
              star.id % 5 === 0
                ? `0 0 ${star.size * 3}px var(--ucl-gold-light)`
                : 'none',
          }}
        />
      ))}

      {/* Drifting stars (rising up) */}
      {driftStars.map((star) => (
        <div
          key={`d-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            bottom: 0,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.id % 3 === 0 ? 'var(--ucl-gold)' : '#fff',
            animation: `drift ${star.duration}s ${star.delay}s linear infinite`,
          }}
        />
      ))}

      {/* Top gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 53, 102, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
