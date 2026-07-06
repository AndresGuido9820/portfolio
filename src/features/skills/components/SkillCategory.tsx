import type { ReactElement } from 'react'
import type { IconType } from 'react-icons'

interface Props {
  title: string
  Icon: IconType
  skills: string[]
  color: string
  large?: boolean
}

export default function SkillCategory({ title, Icon, skills, color, large = false }: Props): ReactElement {
  return (
    <div
      className="group relative flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.03]"
      style={{
        background: 'transparent',
        borderRadius: '14px',
        padding: large ? '2.2rem 1.8rem' : '1.6rem 1.2rem',
        boxShadow: `0 0 25px ${color}25, 0 0 60px ${color}10, inset 0 1px 0 ${color}20`,
      }}
    >
      {/* Animated border glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          borderRadius: '14px',
          boxShadow: `0 0 30px ${color}50, 0 0 80px ${color}20, inset 0 0 30px ${color}10`,
          border: `1px solid ${color}`,
        }}
      />

      {/* Icon glow blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: large ? 160 : 120,
          height: large ? 100 : 80,
          background: `radial-gradient(ellipse at center, ${color}35 0%, transparent 70%)`,
          filter: 'blur(8px)',
          top: large ? '20px' : '12px',
        }}
      />

      {/* Icon circle */}
      <div
        className="relative z-10 mb-5 flex items-center justify-center rounded-full"
        style={{
          width: large ? 88 : 68,
          height: large ? 88 : 68,
          background: `radial-gradient(circle at 35% 35%, ${color}25, rgba(0,5,40,0.8))`,
          border: `1.5px solid ${color}90`,
          boxShadow: `0 0 20px ${color}60, 0 0 40px ${color}30, inset 0 0 15px ${color}15`,
        }}
      >
        <Icon size={large ? 40 : 30} style={{ color, filter: `drop-shadow(0 0 8px ${color})` }} />
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-display tracking-widest uppercase mb-5"
        style={{
          color,
          fontSize: large ? '1.55rem' : '1.05rem',
          textShadow: `0 0 15px ${color}90, 0 0 30px ${color}50`,
        }}
      >
        {title}
      </h3>

      {/* Skills pills */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-xs px-3 py-1 transition-all duration-300 hover:scale-105"
            style={{
              border: '1px solid rgba(180,200,255,0.25)',
              color: 'rgba(200,215,255,0.85)',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '999px',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
