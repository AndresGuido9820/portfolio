import { useRef } from 'react'
import gsap from 'gsap'
import { GitBranch } from 'lucide-react'
import type { Project } from '../../../data/portfolio.data'
import type { Lang } from '../../../shared/i18n'

// Single restrained accent — hue variation removed for a sober, unified look
const CATEGORY_COLORS: Record<Project['category'], string> = {
  IoT: '#34D399',
  AI: '#34D399',
  Web: '#34D399',
  Cloud: '#34D399',
  Research: '#34D399',
}

const CATEGORY_LABELS: Record<Lang, Record<Project['category'], string>> = {
  es: {
    IoT: 'IoT',
    AI: 'IA',
    Web: 'Web',
    Cloud: 'Nube',
    Research: 'Investigación',
  },
  en: {
    IoT: 'IoT',
    AI: 'AI',
    Web: 'Web',
    Cloud: 'Cloud',
    Research: 'Research',
  },
}

interface Props {
  project: Project
  language: Lang
  onRelatedClick?: (name: string) => void
}

export default function ProjectCard({ project, language, onRelatedClick }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    gsap.to(card, {
      rotationX: ((y - cy) / cy) * -6,
      rotationY: ((x - cx) / cx) * 6,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    })
    gsap.to(glow, { x: x - cx, y: y - cy, opacity: 0.15, duration: 0.3 })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power3.out' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3 })
  }

  const catColor = CATEGORY_COLORS[project.category]

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col gap-4 transition-all duration-300 overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        minHeight: '300px',
        padding: '1.5rem',
        background: 'var(--glass)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--line)',
        borderLeft: `2px solid ${catColor}70`,
        borderRadius: '16px',
      }}
    >
      {/* Category top accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, ${catColor}70, transparent 60%)` }}
      />

      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full opacity-0"
        style={{
          width: '180px', height: '180px',
          background: `radial-gradient(circle, ${catColor}30 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'translate(-50%, -50%)',
          top: '50%', left: '50%',
        }}
      />

      {/* Category + Featured */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs tracking-widest uppercase px-2 py-1"
            style={{
              color: catColor,
              border: `1px solid ${catColor}40`,
              background: `${catColor}10`,
            }}
          >
            {CATEGORY_LABELS[language][project.category]}
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase px-2 py-1 rounded-md"
            style={{
              color: 'var(--ucl-silver)',
              border: '1px solid var(--chipline)',
              background: 'var(--chipbg)',
            }}
          >
            {project.kind[language]}
          </span>
        </div>
        {project.featured && (
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
            ★ {language === 'es' ? 'Destacado' : 'Featured'}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl md:text-2xl font-semibold leading-tight uppercase group-hover:text-[#34D399] transition-colors duration-300"
        style={{ color: 'var(--ucl-white)' }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--ucl-silver)' }}>
        {project.description[language]}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-0.5 rounded-md"
            style={{
              border: '1px solid var(--chipline)',
              color: 'var(--ucl-silver)',
              background: 'var(--chipbg)',
            }}
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="font-mono text-xs px-2 py-0.5" style={{ color: 'var(--ucl-silver)' }}>
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Related projects */}
      {project.related && project.related.length > 0 && (
        <div>
          <div className="font-mono text-xs mb-1.5" style={{ color: 'var(--ucl-silver)', letterSpacing: '0.15em' }}>
            {language === 'es' ? 'RELACIONADOS' : 'RELATED'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.related.map((rel) => (
              <button
                key={rel}
                onClick={() => onRelatedClick?.(rel)}
                className="font-mono text-xs px-2 py-0.5 rounded-md transition-all duration-200 hover:border-[#34D399] hover:text-[#34D399]"
                style={{
                  border: '1px solid var(--chipline)',
                  color: 'var(--ucl-silver)',
                  background: 'var(--chipbg)',
                }}
              >
                ↗ {rel}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs transition-opacity hover:opacity-70 w-fit"
          style={{ color: 'var(--ucl-gold)' }}
        >
          <GitBranch size={12} />
          {language === 'es' ? 'Código fuente' : 'Source Code'}
        </a>
      )}

      {/* Gold bottom border on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'linear-gradient(90deg, var(--ucl-gold), var(--ucl-gold-light), var(--ucl-gold))' }}
      />
    </div>
  )
}
