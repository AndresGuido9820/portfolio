import type { Experience } from '../../../data/portfolio.data'

interface Props {
  experience: Experience
  index: number
}

const TYPE_COLORS: Record<Experience['type'], string> = {
  'full-time': 'var(--ucl-gold)',
  'part-time': '#6bb5ff',
  'research': '#a78bfa',
}

const TYPE_LABELS: Record<Experience['type'], string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  'research': 'Research',
}

export default function ExperienceCard({ experience, index }: Props) {
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex gap-0 ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start`}>
      {/* Content card */}
      <div
        className={`timeline-card card-glass p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] group ${
          isEven ? 'mr-8 md:mr-16' : 'ml-8 md:ml-16'
        }`}
        style={{ flex: '1', maxWidth: 'calc(50% - 2rem)', background: 'transparent', backdropFilter: 'none' }}
      >
        {/* Period badge */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span
            className="font-mono text-xs tracking-widest px-3 py-1"
            style={{
              color: TYPE_COLORS[experience.type],
              border: `1px solid ${TYPE_COLORS[experience.type]}40`,
              background: `${TYPE_COLORS[experience.type]}10`,
            }}
          >
            {TYPE_LABELS[experience.type]}
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--ucl-gold-dim)' }}>
            {experience.period}
          </span>
        </div>

        {/* Role & Company */}
        <h3
          className="font-display text-2xl md:text-3xl leading-tight uppercase"
          style={{ color: 'var(--ucl-white)' }}
        >
          {experience.role}
        </h3>
        <div
          className="font-mono text-sm mt-1 mb-5"
          style={{ color: 'var(--ucl-gold)' }}
        >
          {experience.company} · {experience.location}
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--ucl-silver)' }}>
              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--ucl-gold)' }} />
              {highlight}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {experience.tech.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2 py-1 tracking-wide transition-all duration-300 group-hover:border-yellow-400/40"
              style={{
                border: '1px solid rgba(201,162,39,0.2)',
                color: 'var(--ucl-silver)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div style={{ flex: '1' }} />
    </div>
  )
}
