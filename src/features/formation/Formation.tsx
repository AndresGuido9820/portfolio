import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COMPETITIONS, type CompetitionTheme } from '../../data/competitions'
import type { Lang } from '../../shared/i18n'

gsap.registerPlugin(ScrollTrigger)

interface PlayerStats { impacto: number; integracion: number; flexibilidad: number; velocidad: number }
interface Player {
  id: number; initials: string; name: string; category: string; color: string
  position: string; description: Record<Lang, string>
  modules: string[]; stats: PlayerStats; useCases: Record<Lang, string[]>
}

interface FormationLayout {
  name: string
  label: string
  positions: Array<{ x: number; y: number }>
}

const PLAYERS: Player[] = [
  { id: 1, initials: 'PY', name: 'Python', category: 'Language', color: '#3776ab', position: 'GK',
    description: {
      es: 'Base confiable para automatización, APIs, procesamiento de datos y scripts operativos. Lo uso para convertir problemas ambiguos en herramientas simples y mantenibles.',
      en: 'Reliable base for automation, APIs, data processing, and operational scripts. I use it to turn ambiguous problems into simple, maintainable tools.',
    },
    modules: ['FastAPI', 'boto3', 'Pandas', 'asyncio', 'Pytest', 'OpenCV'],
    stats: { impacto: 9.5, integracion: 9.8, flexibilidad: 9.2, velocidad: 8.5 },
    useCases: {
      es: ['APIs internas', 'Automatización', 'Procesamiento de datos', 'Herramientas CLI'],
      en: ['Internal APIs', 'Automation', 'Data processing', 'CLI tooling'],
    } },
  { id: 2, initials: 'AWS', name: 'AWS', category: 'Cloud', color: '#FF9900', position: 'RB',
    description: {
      es: 'Cloud para sistemas event-driven, serverless e integraciones IoT. Lo presento desde capacidades generales, sin exponer infraestructura privada de empresas.',
      en: 'Cloud platform for event-driven, serverless, and IoT integrations. I describe capabilities at a high level without exposing private company infrastructure.',
    },
    modules: ['Lambda', 'IoT Core', 'S3', 'DynamoDB', 'CloudWatch', 'CloudFormation'],
    stats: { impacto: 9.2, integracion: 8.8, flexibilidad: 8.5, velocidad: 8.0 },
    useCases: {
      es: ['Serverless', 'Telemetría IoT', 'Observabilidad', 'Infraestructura como código'],
      en: ['Serverless', 'IoT telemetry', 'Observability', 'Infrastructure as code'],
    } },
  { id: 3, initials: 'DK', name: 'Docker', category: 'DevOps', color: '#2496ED', position: 'CB',
    description: {
      es: 'Estandariza entornos de desarrollo, pruebas y despliegue. Útil para que servicios backend, workers y herramientas se ejecuten igual en distintas máquinas.',
      en: 'Standardizes development, test, and deployment environments. Useful for running backend services, workers, and tools consistently across machines.',
    },
    modules: ['Dockerfile', 'Compose', 'Multi-stage', 'BuildKit', 'Volumes', 'Registry'],
    stats: { impacto: 8.5, integracion: 9.0, flexibilidad: 8.8, velocidad: 9.0 },
    useCases: {
      es: ['Entornos reproducibles', 'Microservicios', 'CI/CD', 'Workers locales'],
      en: ['Reproducible envs', 'Microservices', 'CI/CD', 'Local workers'],
    } },
  { id: 4, initials: 'TS', name: 'TypeScript', category: 'Language', color: '#3178c6', position: 'CB',
    description: {
      es: 'Tipado fuerte para interfaces, APIs y tooling. Me ayuda a construir frontends y servicios Node con contratos claros y menos bugs silenciosos.',
      en: 'Strong typing for interfaces, APIs, and tooling. It helps me build frontends and Node services with clearer contracts and fewer silent bugs.',
    },
    modules: ['Types', 'Interfaces', 'Zod', 'ESM', 'React', 'Node.js'],
    stats: { impacto: 8.8, integracion: 9.5, flexibilidad: 8.0, velocidad: 8.5 },
    useCases: {
      es: ['Frontends robustos', 'APIs Node', 'Validación', 'DX'],
      en: ['Robust frontends', 'Node APIs', 'Validation', 'DX'],
    } },
  { id: 5, initials: 'FA', name: 'FastAPI', category: 'Backend', color: '#009688', position: 'LB',
    description: {
      es: 'Framework backend para APIs limpias, validación de datos y servicios Python rápidos. Ideal para exponer automatizaciones, modelos o integraciones internas.',
      en: 'Backend framework for clean APIs, data validation, and fast Python services. Ideal for exposing automation, models, or internal integrations.',
    },
    modules: ['Routers', 'Pydantic', 'Async', 'OpenAPI', 'Auth', 'Testing'],
    stats: { impacto: 9.0, integracion: 9.2, flexibilidad: 8.5, velocidad: 9.8 },
    useCases: {
      es: ['REST APIs', 'Servicios AI', 'Backends internos', 'Integraciones'],
      en: ['REST APIs', 'AI services', 'Internal backends', 'Integrations'],
    } },
  { id: 6, initials: 'RC', name: 'React', category: 'Frontend', color: '#61DAFB', position: 'CM',
    description: {
      es: 'Capa visual para dashboards, herramientas internas y experiencias interactivas. Lo uso con foco en claridad, estado manejable y buena respuesta visual.',
      en: 'Visual layer for dashboards, internal tools, and interactive experiences. I use it with a focus on clarity, manageable state, and responsive UI.',
    },
    modules: ['Hooks', 'Vite', 'Tailwind', 'GSAP', 'R3F', 'Framer Motion'],
    stats: { impacto: 8.5, integracion: 8.8, flexibilidad: 9.0, velocidad: 8.8 },
    useCases: {
      es: ['Dashboards', 'Portafolios', 'Herramientas internas', 'Visualización'],
      en: ['Dashboards', 'Portfolios', 'Internal tools', 'Visualization'],
    } },
  { id: 7, initials: 'MCP', name: 'MCP', category: 'AI', color: '#a78bfa', position: 'CM',
    description: {
      es: 'Model Context Protocol: el estándar para conectar agentes de IA con herramientas y datos reales. Construyo servidores MCP que exponen sistemas internos a asistentes de forma segura.',
      en: 'Model Context Protocol: the standard for wiring AI agents to real tools and data. I build MCP servers that safely expose internal systems to assistants.',
    },
    modules: ['Servers', 'Tools', 'Resources', 'Prompts', 'stdio/HTTP', 'OAuth'],
    stats: { impacto: 9.4, integracion: 9.6, flexibilidad: 9.2, velocidad: 8.8 },
    useCases: {
      es: ['Agentes con herramientas', 'Integraciones IA', 'Automatización', 'Asistentes internos'],
      en: ['Tool-using agents', 'AI integrations', 'Automation', 'Internal assistants'],
    } },
  { id: 8, initials: 'NJ', name: 'Node.js', category: 'Backend', color: '#339933', position: 'CM',
    description: {
      es: 'Runtime práctico para APIs, webhooks, CLIs y servicios event-driven. Encaja bien cuando el sistema necesita reaccionar rápido a eventos externos.',
      en: 'Practical runtime for APIs, webhooks, CLIs, and event-driven services. It fits well when a system needs to react quickly to external events.',
    },
    modules: ['Express', 'NestJS', 'Streams', 'Events', 'Webhooks', 'Lambda'],
    stats: { impacto: 8.8, integracion: 9.5, flexibilidad: 8.5, velocidad: 9.2 },
    useCases: {
      es: ['Webhooks', 'APIs', 'Serverless', 'CLI tools'],
      en: ['Webhooks', 'APIs', 'Serverless', 'CLI tools'],
    } },
  { id: 9, initials: 'CL', name: 'Claude API', category: 'AI', color: '#D97757', position: 'ST',
    description: {
      es: 'API para construir asistentes, agentes con herramientas y automatizaciones de análisis. La presento desde casos genéricos, sin datos ni flujos privados.',
      en: 'API for building assistants, tool-using agents, and analysis automation. I present it through generic use cases, without private data or workflows.',
    },
    modules: ['Messages', 'Tool Use', 'Vision', 'Streaming', 'MCP', 'Batching'],
    stats: { impacto: 9.8, integracion: 9.0, flexibilidad: 9.5, velocidad: 8.8 },
    useCases: {
      es: ['Agentes', 'Análisis documental', 'Automatización', 'Tool use'],
      en: ['Agents', 'Document analysis', 'Automation', 'Tool use'],
    } },
  { id: 10, initials: 'RAG', name: 'RAG Systems', category: 'AI', color: '#E8007E', position: 'ST',
    description: {
      es: 'Patrón para responder con contexto verificable usando recuperación, chunking y evaluación. Bueno para documentación, soporte y conocimiento técnico.',
      en: 'Pattern for answering with verifiable context through retrieval, chunking, and evaluation. Strong for documentation, support, and technical knowledge.',
    },
    modules: ['Embeddings', 'Vector DB', 'Retrieval', 'Chunking', 'Reranking', 'Eval'],
    stats: { impacto: 9.5, integracion: 8.5, flexibilidad: 8.8, velocidad: 8.0 },
    useCases: {
      es: ['Bases de conocimiento', 'Búsqueda semántica', 'Q&A', 'Soporte técnico'],
      en: ['Knowledge bases', 'Semantic search', 'Q&A', 'Technical support'],
    } },
  { id: 11, initials: 'CV', name: 'Comp. Vision', category: 'AI', color: '#a78bfa', position: 'ST',
    description: {
      es: 'Procesamiento visual aplicado a datasets, segmentación y flujos de revisión. Lo muestro como capacidad técnica, no como producto privado.',
      en: 'Visual processing applied to datasets, segmentation, and review workflows. I show it as a technical capability, not as a private product.',
    },
    modules: ['OpenCV', 'TensorFlow', 'YOLO', 'Datasets', 'Segmentation', 'Review UI'],
    stats: { impacto: 9.0, integracion: 8.0, flexibilidad: 8.5, velocidad: 8.2 },
    useCases: {
      es: ['Segmentación', 'Clasificación', 'Datasets', 'Revisión asistida'],
      en: ['Segmentation', 'Classification', 'Datasets', 'Assisted review'],
    } },
]

const FORMATIONS: FormationLayout[] = [
  {
    name: '4-3-3', label: '4-3-3',
    positions: [
      { x: 8,  y: 50 }, { x: 26, y: 18 }, { x: 26, y: 38 }, { x: 26, y: 62 }, { x: 26, y: 82 },
      { x: 48, y: 25 }, { x: 48, y: 50 }, { x: 48, y: 75 }, { x: 72, y: 18 }, { x: 75, y: 50 }, { x: 72, y: 82 },
    ],
  },
  {
    name: '4-4-2', label: '4-4-2',
    positions: [
      { x: 8,  y: 50 }, { x: 26, y: 15 }, { x: 26, y: 38 }, { x: 26, y: 62 }, { x: 26, y: 85 },
      { x: 50, y: 15 }, { x: 50, y: 38 }, { x: 50, y: 62 }, { x: 50, y: 85 }, { x: 74, y: 33 }, { x: 74, y: 67 },
    ],
  },
  {
    name: '3-5-2', label: '3-5-2',
    positions: [
      { x: 8,  y: 50 }, { x: 26, y: 25 }, { x: 26, y: 50 }, { x: 26, y: 75 },
      { x: 50, y: 10 }, { x: 50, y: 30 }, { x: 50, y: 50 }, { x: 50, y: 70 }, { x: 50, y: 90 },
      { x: 74, y: 33 }, { x: 74, y: 67 },
    ],
  },
]

const STAT_LABELS: Record<Lang, Record<keyof PlayerStats, string>> = {
  es: {
    impacto: 'IMPACTO',
    integracion: 'INTEGRACIÓN',
    flexibilidad: 'FLEXIBILIDAD',
    velocidad: 'VELOCIDAD',
  },
  en: {
    impacto: 'IMPACT',
    integracion: 'INTEGRATION',
    flexibilidad: 'FLEXIBILITY',
    velocidad: 'SPEED',
  },
}

const COPY = {
  es: {
    eyebrow: 'Alineación Titular',
    title: 'La Formación',
    subtitle: 'Mi stack como un once titular. Haz click en un jugador para ver su ficha técnica.',
    description: 'Descripción',
    modules: 'Tecnologías',
    stats: 'Estadísticas',
    useCases: 'Casos de uso',
    viewPlays: 'Ver jugadas →',
    viewStack: 'Ver stack',
    next: 'Sig →',
    position: 'POS',
    specialty: 'ESP',
    language: 'EN',
    categories: {
      Language: 'Lenguaje',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Cloud: 'Nube',
      DevOps: 'DevOps',
      AI: 'IA',
    },
  },
  en: {
    eyebrow: 'Starting Lineup',
    title: 'The Formation',
    subtitle: 'My stack as a starting eleven. Click a player to inspect the technical card.',
    description: 'Description',
    modules: 'Technologies',
    stats: 'Stats',
    useCases: 'Use cases',
    viewPlays: 'View plays →',
    viewStack: 'View stack',
    next: 'Next →',
    position: 'POS',
    specialty: 'ROLE',
    language: 'ES',
    categories: {
      Language: 'Language',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Cloud: 'Cloud',
      DevOps: 'DevOps',
      AI: 'AI',
    },
  },
} satisfies Record<
  Lang,
  {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    modules: string
    stats: string
    useCases: string
    viewPlays: string
    viewStack: string
    next: string
    position: string
    specialty: string
    language: string
    categories: Record<string, string>
  }
>

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono uppercase tracking-widest" style={{ fontSize: '8px', color: 'rgba(180,210,255,0.55)' }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', flex: '1 1 0', minWidth: 0 }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${(value / 10) * 100}%`,
              background: `linear-gradient(90deg, ${color}70, ${color})`,
              boxShadow: `0 0 6px ${color}90`,
            }}
          />
        </div>
        <span className="font-mono font-bold shrink-0" style={{ fontSize: '10px', color, minWidth: '36px' }}>
          {value.toFixed(1)}<span style={{ color: 'rgba(180,210,255,0.4)', fontWeight: 400 }}>/10</span>
        </span>
      </div>
    </div>
  )
}

function PlayerCard({
  player,
  theme,
  language,
  onClose,
  onNext,
}: {
  player: Player
  theme: CompetitionTheme
  language: Lang
  onClose: () => void
  onNext: () => void
}) {
  const isLibertadores = theme.id === 'libertadores'
  const accentColor = '#34D399'
  const copy = COPY[language]
  const cardBackground = isLibertadores
    ? `
      radial-gradient(circle at 18% 10%, rgba(255, 211, 92, 0.36), transparent 30%),
      radial-gradient(circle at 85% 88%, rgba(180, 106, 12, 0.32), transparent 34%),
      linear-gradient(145deg, rgba(74, 48, 4, 0.98) 0%, rgba(31, 21, 3, 0.99) 48%, rgba(8, 6, 1, 0.99) 100%)
    `
    : `
      radial-gradient(circle at 18% 10%, rgba(97, 218, 251, 0.34), transparent 30%),
      radial-gradient(circle at 85% 88%, rgba(18, 80, 214, 0.38), transparent 36%),
      linear-gradient(145deg, rgba(8, 39, 128, 0.98) 0%, rgba(5, 18, 82, 0.99) 48%, rgba(2, 6, 36, 0.99) 100%)
    `

  return (
    <div
      className="relative flex flex-col"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: cardBackground,
        border: `1.8px solid ${accentColor}`,
        boxShadow: `0 0 10px ${accentColor}, 0 0 30px ${accentColor}66, 0 0 60px ${accentColor}26, inset 0 0 30px rgba(0,0,0,0.3)`,
        borderRadius: '12px',
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)` }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div
            className="relative flex items-center justify-center rounded-full font-display shrink-0"
            style={{
              width: '68px', height: '68px',
              background: `radial-gradient(circle at 35% 30%, ${accentColor}35, rgba(2,8,40,0.95))`,
              border: `2.5px solid ${accentColor}`,
              boxShadow: `0 0 0 1px ${accentColor}30, 0 0 18px ${accentColor}70`,
              color: '#fff',
              fontSize: player.initials.length > 2 ? '13px' : '20px',
              fontWeight: 800,
            }}
          >
            {player.initials}
            <div
              className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-mono font-bold"
              style={{
                width: '20px', height: '20px', fontSize: '9px',
                background: isLibertadores ? 'rgba(20,14,0,0.97)' : 'rgba(2,6,35,0.97)',
                border: `1.5px solid ${theme.gold}`,
                color: theme.gold,
              }}
            >
              {player.id}
            </div>
          </div>
          {/* Name block */}
          <div className="flex flex-col min-w-0">
            <span className="font-mono tracking-[0.3em] uppercase" style={{ fontSize: '9px', color: `${accentColor}cc` }}>
              {player.category} • #{player.id}
            </span>
            <h3
              className="font-display uppercase leading-none mt-0.5"
              style={{
                fontSize: player.name.length > 10 ? '13px' : player.name.length > 7 ? '16px' : '20px',
                color: '#fff',
                textShadow: `0 0 14px ${accentColor}70`,
              }}
            >
              {player.name}
            </h3>
          </div>
        </div>
        {/* Logo + close */}
        <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
          <button onClick={onClose} className="font-mono opacity-40 hover:opacity-100 transition-opacity" style={{ color: '#fff', fontSize: '14px' }}>✕</button>
          <img src={theme.logo} alt="" style={{ width: '30px', height: '30px', objectFit: 'contain', opacity: 0.8 }} />
        </div>
      </div>

      {/* POSICIÓN / ESPECIALIDAD */}
      <div className="grid grid-cols-2 gap-2 pb-2" style={{ padding: '0 16px 8px' }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono shrink-0" style={{ fontSize: '8px', color: 'rgba(180,210,255,0.5)' }}>{copy.position}</span>
          <span
            className="font-mono text-xs px-2 py-0.5 tracking-wider uppercase truncate"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}70`, color: accentColor, borderRadius: '4px' }}
          >
            {player.position}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono shrink-0" style={{ fontSize: '8px', color: 'rgba(180,210,255,0.5)' }}>{copy.specialty}</span>
          <span
            className="font-mono text-xs px-2 py-0.5 tracking-wider uppercase truncate"
            style={{ background: `rgba(${theme.glowRgb},0.12)`, border: `1px solid rgba(${theme.glowRgb},0.4)`, color: theme.gold, borderRadius: '4px' }}
          >
            {player.category}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-2" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }} />

      {/* Scrollable content */}
      <div className="overflow-y-auto" style={{ scrollbarWidth: 'none', minHeight: 0, flex: '1 1 0', padding: '0 16px' }}>

        {/* DESCRIPCIÓN */}
        <div className="pb-2">
          <div className="font-mono uppercase tracking-[0.25em] mb-1" style={{ fontSize: '8px', color: theme.gold }}>{copy.description}</div>
          <p className="font-body leading-relaxed" style={{ fontSize: '11px', color: 'rgba(200,220,255,0.82)', wordBreak: 'break-word' }}>
            {player.description[language]}
          </p>
        </div>

        {/* MÓDULOS CLAVE */}
        <div className="pb-2">
          <div className="font-mono uppercase tracking-[0.25em] mb-1.5" style={{ fontSize: '8px', color: theme.gold }}>{copy.modules}</div>
          <div className="grid grid-cols-3 gap-1.5">
            {player.modules.map((mod) => (
              <div
                key={mod}
                className="flex items-center justify-center text-center font-mono"
                style={{
                  fontSize: '9px', padding: '5px 4px',
                  background: `${accentColor}10`,
                  border: `1px solid ${accentColor}40`,
                  color: 'rgba(210,230,255,0.9)',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                {mod}
              </div>
            ))}
          </div>
        </div>

        {/* ESTADÍSTICAS — 2 cols */}
        <div className="pb-2">
          <div className="font-mono uppercase tracking-[0.25em] mb-1.5" style={{ fontSize: '8px', color: theme.gold }}>{copy.stats}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {(Object.keys(player.stats) as Array<keyof PlayerStats>).map((key) => (
              <StatBar key={key} label={STAT_LABELS[language][key]} value={player.stats[key]} color={accentColor} />
            ))}
          </div>
        </div>

        {/* USE CASES */}
        <div className="pb-3">
          <div className="font-mono uppercase tracking-[0.25em] mb-1.5" style={{ fontSize: '8px', color: theme.gold }}>{copy.useCases}</div>
          <div className="flex flex-wrap gap-1.5">
            {player.useCases[language].map((uc) => (
              <span
                key={uc}
                className="font-mono"
                style={{
                  fontSize: '9px', padding: '3px 10px',
                  background: `rgba(${theme.glowRgb},0.08)`,
                  border: `1px solid rgba(${theme.glowRgb},0.35)`,
                  color: theme.goldLight,
                  borderRadius: '999px',
                }}
              >
                {uc}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-2 px-4 py-3" style={{ borderTop: `1px solid rgba(${theme.glowRgb},0.15)` }}>
        <button
          className="flex items-center gap-1 font-mono text-xs tracking-widest uppercase px-3 py-2 transition-all duration-200 hover:opacity-90"
          style={{
            flex: 2,
            border: `1.5px solid ${accentColor}`,
            color: '#fff',
            background: `${accentColor}20`,
            borderRadius: '6px',
            boxShadow: `0 0 12px ${accentColor}40`,
          }}
        >
          {copy.viewPlays}
        </button>
        <button
          className="font-mono text-xs tracking-widest uppercase px-3 py-2 transition-all duration-200 hover:opacity-80"
          style={{
            flex: 2,
            border: `1px solid rgba(${theme.glowRgb},0.3)`,
            color: 'rgba(180,210,255,0.7)',
            background: 'transparent',
            borderRadius: '6px',
            fontSize: '8px',
          }}
        >
          {copy.viewStack}
        </button>
        <button
          onClick={onNext}
          className="font-mono text-xs tracking-widest uppercase px-3 py-2 transition-all duration-200 hover:opacity-80"
          style={{
            flex: 1,
            border: `1px solid rgba(${theme.glowRgb},0.25)`,
            color: 'rgba(180,210,255,0.7)',
            background: 'transparent',
            borderRadius: '6px',
            fontSize: '9px',
          }}
        >
          {copy.next}
        </button>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.gold}80, transparent)` }}
      />
    </div>
  )
}

function PlayerBubble({ player, pos, index, onClick, isSelected, themeColor }: {
  player: Player; pos: { x: number; y: number }; index: number; onClick: () => void; isSelected: boolean; themeColor: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-player={player.id}
      className="absolute flex flex-col items-center"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.6s cubic-bezier(0.34,1.56,0.64,1), top 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        transitionDelay: `${index * 0.04}s`,
        zIndex: hovered || isSelected ? 20 : 10,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          width: hovered || isSelected ? '80px' : '70px',
          height: hovered || isSelected ? '80px' : '70px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeColor}${(hovered || isSelected) ? '4d' : '1f'} 0%, transparent 70%)`,
          filter: 'blur(4px)',
          transition: 'all 0.3s ease',
        }}
      />

      {/* Player circle */}
      <div
        className="relative flex items-center justify-center rounded-full font-display select-none"
        style={{
          width: '64px',
          height: '64px',
          background: (hovered || isSelected)
            ? `radial-gradient(circle at 35% 30%, ${themeColor}4d, rgba(18,20,24,0.95))`
            : `radial-gradient(circle at 35% 30%, ${themeColor}26, rgba(13,15,18,0.9))`,
          border: `1.5px solid ${(hovered || isSelected) ? themeColor : themeColor + '73'}`,
          boxShadow: isSelected
            ? `0 0 0 2px ${themeColor}99, 0 0 20px ${themeColor}b3, inset 0 1px 0 rgba(255,255,255,0.2)`
            : (hovered
              ? `0 0 0 1px ${themeColor}80, 0 0 16px ${themeColor}b3, inset 0 1px 0 rgba(255,255,255,0.2)`
              : `0 0 8px ${themeColor}4d, inset 0 1px 0 rgba(255,255,255,0.15)`),
          color: '#ffffff',
          transform: (hovered || isSelected) ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 0.25s ease',
          fontSize: player.initials.length > 2 ? '13px' : '17px',
          letterSpacing: '0.03em',
          fontWeight: 700,
        }}
      >
        {player.initials}

        <div
          className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-mono text-white font-bold"
          style={{
            width: '22px', height: '22px', fontSize: '11px',
            background: 'rgba(13,15,18,0.95)',
            border: `1.5px solid ${themeColor}b3`,
            boxShadow: `0 0 6px ${themeColor}80`,
          }}
        >
          {player.id}
        </div>
      </div>

      {/* Tech name label */}
      <div
        className="mt-1.5 font-mono uppercase tracking-widest text-center whitespace-nowrap rounded"
        style={{
          fontSize: '10px',
          background: 'rgba(10,11,13,0.85)',
          color: (hovered || isSelected) ? '#ffffff' : 'rgba(200,205,210,0.85)',
          padding: '3px 9px',
          border: `1px solid ${themeColor}${(hovered || isSelected) ? 'b3' : '4d'}`,
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(4px)',
        }}
      >
        {player.name}
      </div>

      {/* Category tooltip */}
      {hovered && !isSelected && (
        <div
          className="absolute -top-8 font-mono text-xs"
          style={{
            color: themeColor,
            background: 'rgba(10,11,13,0.92)',
            padding: '2px 8px',
            border: `1px solid ${themeColor}99`,
            whiteSpace: 'nowrap',
            fontSize: '9px',
            letterSpacing: '0.1em',
          }}
        >
          {player.category.toUpperCase()}
        </div>
      )}
    </div>
  )
}

function CoachBubble() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ right: '2%', bottom: '8%', zIndex: hovered ? 20 : 10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'absolute',
          width: hovered ? '78px' : '68px',
          height: hovered ? '78px' : '68px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${hovered ? 'rgba(201,162,39,0.45)' : 'rgba(201,162,39,0.2)'} 0%, transparent 70%)`,
          filter: 'blur(6px)',
          transition: 'all 0.3s ease',
        }}
      />
      <div
        className="relative flex items-center justify-center rounded-full font-display select-none"
        style={{
          width: '62px', height: '62px',
          background: hovered
            ? 'radial-gradient(circle at 35% 30%, rgba(201,162,39,0.45), rgba(13,15,18,0.97))'
            : 'radial-gradient(circle at 35% 30%, rgba(201,162,39,0.3), rgba(13,15,18,0.95))',
          border: hovered ? '2px solid rgba(201,162,39,0.95)' : '2px solid rgba(201,162,39,0.6)',
          boxShadow: hovered
            ? '0 0 0 2px rgba(201,162,39,0.3), 0 0 20px rgba(201,162,39,0.7), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 0 14px rgba(201,162,39,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          color: '#f5c842',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 0.25s ease',
          fontSize: '11px', letterSpacing: '0.04em', fontWeight: 800,
        }}
      >
        AG
        <div
          className="absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-mono text-white font-bold"
          style={{
            width: '20px', height: '20px', fontSize: '10px',
            background: 'rgba(13,15,18,0.97)',
            border: '1.5px solid rgba(201,162,39,0.7)',
            boxShadow: '0 0 8px rgba(201,162,39,0.5)',
          }}
        >
          🧠
        </div>
      </div>
      <div
        className="mt-1.5 font-mono uppercase tracking-widest text-center whitespace-nowrap rounded"
        style={{
          fontSize: '10px',
          background: 'rgba(10,11,13,0.88)',
          color: hovered ? '#f5c842' : 'rgba(240,210,120,0.85)',
          padding: '2px 7px',
          border: hovered ? '1px solid rgba(201,162,39,0.7)' : '1px solid rgba(201,162,39,0.3)',
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(4px)',
        }}
      >
        Andrés
      </div>
      {hovered && (
        <div
          className="absolute -top-8 font-mono"
          style={{
            color: '#f5c842',
            background: 'rgba(10,11,13,0.92)',
            padding: '2px 8px',
            border: '1px solid rgba(201,162,39,0.6)',
            whiteSpace: 'nowrap',
            fontSize: '9px',
            letterSpacing: '0.1em',
          }}
        >
          HEAD COACH
        </div>
      )}
    </div>
  )
}

function FootballPitch({ children, theme, spotlightPos }: {
  children: React.ReactNode
  theme: CompetitionTheme
  spotlightPos?: { x: number; y: number } | null
}) {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!spotRef.current) return
    if (spotlightPos) {
      gsap.to(spotRef.current, {
        left: `${spotlightPos.x}%`,
        top: `${spotlightPos.y}%`,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
      })
    } else {
      gsap.to(spotRef.current, { opacity: 0, duration: 0.4 })
    }
  }, [spotlightPos])

  return (
    <div
      data-field=""
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '16/9',
        maxHeight: '480px',
        borderRadius: '14px',
        border: '1px solid rgba(16,185,129,0.35)',
        boxShadow: `0 0 0 1px rgba(${theme.glowRgb},0.12), 0 0 28px rgba(${theme.glowRgb},0.18), 0 26px 60px -24px rgba(0,0,0,0.65), inset 0 0 60px rgba(0,0,0,0.30)`,
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
      }}
    >
      {/* Grass alternating mowing stripes */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full"
            style={{ background: i % 2 === 0 ? 'var(--pitch-grass-a)' : 'var(--pitch-grass-b)', transition: 'background 0.45s ease' }}
          />
        ))}
      </div>

      {/* Cross-mow pattern + stadium lighting falloff (broadcast look) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.016) 0px, rgba(255,255,255,0.016) 34px, transparent 34px, transparent 68px)',
            'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 26%, transparent 70%, rgba(0,0,0,0.28) 100%)',
          ].join(', '),
          zIndex: 1,
        }}
      />

      {/* Pitch line markings */}
      <svg viewBox="0 0 1600 900" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect x="40" y="40" width="1520" height="820" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <line x1="800" y1="40" x2="800" y2="860" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <circle cx="800" cy="450" r="135" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <circle cx="800" cy="450" r="6" fill="var(--pitch-chalk)" />
        <rect x="40" y="250" width="245" height="400" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <rect x="40" y="365" width="80" height="170" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2" />
        <circle cx="230" cy="450" r="5" fill="var(--pitch-chalk)" />
        <path d="M 285 310 A 135 135 0 0 1 285 590" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <rect x="0" y="380" width="40" height="140" fill="rgba(255,255,255,0.10)" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <rect x="1315" y="250" width="245" height="400" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <rect x="1480" y="365" width="80" height="170" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2" />
        <circle cx="1370" cy="450" r="5" fill="var(--pitch-chalk)" />
        <path d="M 1315 310 A 135 135 0 0 0 1315 590" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <rect x="1560" y="380" width="40" height="140" fill="rgba(255,255,255,0.10)" stroke="var(--pitch-chalk)" strokeWidth="2.4" />
        <path d="M 40 75 A 35 35 0 0 1 75 40" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2" />
        <path d="M 1525 40 A 35 35 0 0 1 1560 75" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2" />
        <path d="M 40 825 A 35 35 0 0 0 75 860" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2" />
        <path d="M 1525 860 A 35 35 0 0 0 1560 825" fill="none" stroke="var(--pitch-chalk)" strokeWidth="2" />
      </svg>

      {/* Central ambient stadium light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 58% 48% at 50% 50%, rgba(255,255,255,0.045) 0%, transparent 65%)',
          zIndex: 2,
        }}
      />

      {/* Competition badge watermark */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '115px', height: '115px',
          opacity: 0.055,
          backgroundImage: `url(${theme.logo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: 'brightness(10)',
          zIndex: 2,
        }}
      />

      {/* Animated ball at centre spot */}
      <div
        className="absolute pointer-events-none"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}
      >
        <img
          src={import.meta.env.BASE_URL + 'ucl-ball.png'}
          alt=""
          style={{
            width: '22px', height: '22px',
            opacity: 0.78,
            animation: 'float-star 3.2s ease-in-out infinite',
            filter: `drop-shadow(0 0 6px rgba(${theme.glowRgb},0.8))`,
          }}
        />
      </div>

      {/* Pitch dimmer — activates when a player is selected */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--pitch-dimmer)',
          opacity: spotlightPos ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: 4,
        }}
      />

      {/* Dynamic spotlight — smoothly follows selected player */}
      <div
        ref={spotRef}
        className="absolute pointer-events-none"
        style={{
          width: '210px', height: '210px',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(${theme.glowRgb},0.28) 0%, rgba(${theme.glowRgb},0.10) 40%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: 0,
          zIndex: 5,
          borderRadius: '50%',
        }}
      />

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 82% at 50% 44%, transparent 48%, var(--pitch-vignette) 100%)',
          zIndex: 6,
        }}
      />

      {children}
    </div>
  )
}

interface LineCoords { x1: number; y1: number; x2: number; y2: number }

interface FormationProps {
  activeComp?: number
  language: Lang
}

export default function Formation({ activeComp = 0, language }: FormationProps) {
  const [activeFormation, setActiveFormation] = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [lineCoords, setLineCoords] = useState<LineCoords | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const current = FORMATIONS[activeFormation]!
  const theme = COMPETITIONS[activeComp] ?? COMPETITIONS[0]!
  const lineColor = '#34D399'
  const copy = COPY[language]

  // Derived: pitch coords of the selected player for the spotlight
  const spotlightPos = selectedPlayer
    ? (current.positions[PLAYERS.findIndex(p => p.id === selectedPlayer.id)] ?? null)
    : null

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(prev => prev?.id === player.id ? null : player)
  }

  const handleNext = () => {
    if (!selectedPlayer) return
    const idx = PLAYERS.findIndex(p => p.id === selectedPlayer.id)
    setSelectedPlayer(PLAYERS[(idx + 1) % PLAYERS.length]!)
  }

  // Players enter the pitch with a staggered bounce animation on scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-player]',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, container)
    return () => ctx.revert()
  }, [])

  // Measure positions for connector line using field element + player percentage
  useEffect(() => {
    if (!selectedPlayer || !containerRef.current) { setLineCoords(null); return }
    const measure = () => {
      const cont = containerRef.current
      if (!cont) return
      const field = cont.querySelector('[data-field]') as HTMLElement | null
      const card = cont.querySelector('[data-card]') as HTMLElement | null
      if (!field || !card) return

      const playerIndex = PLAYERS.findIndex(p => p.id === selectedPlayer.id)
      const pos = current.positions[playerIndex]
      if (!pos) return

      const cr = cont.getBoundingClientRect()
      const fr = field.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()

      setLineCoords({
        x1: fr.left - cr.left + (pos.x / 100) * fr.width,
        y1: fr.top - cr.top + (pos.y / 100) * fr.height,
        x2: cardRect.left - cr.left,
        y2: cardRect.top - cr.top + 72,
      })
    }
    const t = setTimeout(measure, 80)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayer, activeFormation])

  return (
    <section id="formation" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-10" style={{ background: `${theme.gold}99` }} />
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: theme.gold }}>
            {copy.eyebrow}
          </span>
          <div className="h-px w-10" style={{ background: `${theme.gold}99` }} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-6xl lg:text-8xl mb-4" style={{ color: 'var(--ucl-white)' }}>
              {copy.title}
            </h2>
            <p className="font-body text-lg max-w-xl" style={{ color: 'var(--ucl-silver)' }}>
              {copy.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FORMATIONS.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setActiveFormation(i)}
                className="font-mono text-sm tracking-widest px-5 py-2 transition-all duration-300"
                style={{
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: activeFormation === i ? `${theme.gold}cc` : 'rgba(180,210,255,0.2)',
                  color: activeFormation === i ? '#ffffff' : 'rgba(180,210,255,0.5)',
                  background: activeFormation === i ? `${theme.gold}25` : 'transparent',
                  boxShadow: activeFormation === i ? `0 0 16px ${theme.gold}40` : 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main area: pitch + card panel */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className={`relative flex gap-4 transition-all duration-500 ${selectedPlayer ? 'items-stretch' : ''}`}
        >
          {/* SVG connector line */}
          {lineCoords && selectedPlayer && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 5, overflow: 'visible' }}
            >
              <defs>
                <filter id="glow-wide" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="b1" />
                </filter>
                <filter id="glow-mid" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b2" />
                </filter>
              </defs>
              {/* Wide outer glow */}
              <path
                d={`M ${lineCoords.x1} ${lineCoords.y1} L ${lineCoords.x2} ${lineCoords.y2}`}
                fill="none" stroke={lineColor} strokeWidth="10" strokeOpacity="0.18" filter="url(#glow-wide)"
              />
              {/* Mid glow */}
              <path
                d={`M ${lineCoords.x1} ${lineCoords.y1} L ${lineCoords.x2} ${lineCoords.y2}`}
                fill="none" stroke={lineColor} strokeWidth="5" strokeOpacity="0.35" filter="url(#glow-mid)"
              />
              {/* Core solid line */}
              <path
                d={`M ${lineCoords.x1} ${lineCoords.y1} L ${lineCoords.x2} ${lineCoords.y2}`}
                fill="none" stroke={lineColor} strokeWidth="1.8" strokeOpacity="0.95"
              />
              {/* Dot at player */}
              <circle cx={lineCoords.x1} cy={lineCoords.y1} r="5" fill={lineColor} opacity="0.9" filter="url(#glow-mid)" />
              <circle cx={lineCoords.x1} cy={lineCoords.y1} r="3" fill="#fff" opacity="0.9" />
              {/* Dot at card */}
              <circle cx={lineCoords.x2} cy={lineCoords.y2} r="5" fill={lineColor} opacity="0.9" filter="url(#glow-mid)" />
              <circle cx={lineCoords.x2} cy={lineCoords.y2} r="3" fill="#fff" opacity="0.9" />
            </svg>
          )}
          {/* Pitch */}
          <div
            className="transition-all duration-500"
            style={{ flex: '1 1 0', minWidth: 0 }}
          >
            <FootballPitch theme={theme} spotlightPos={spotlightPos}>
              {PLAYERS.map((player, i) => (
                <PlayerBubble
                  key={player.id}
                  player={player}
                  pos={current.positions[i]!}
                  index={i}
                  onClick={() => handleSelectPlayer(player)}
                  isSelected={selectedPlayer?.id === player.id}
                  themeColor={lineColor}
                />
              ))}
              <CoachBubble />
            </FootballPitch>
          </div>

          {/* Player card side panel */}
          {selectedPlayer && (
            <div
              data-card=""
              className="transition-all duration-500"
              style={{ flex: '0 0 340px', width: '340px', minHeight: '480px' }}
            >
              <PlayerCard
                player={selectedPlayer}
                theme={theme}
                language={language}
                onClose={() => setSelectedPlayer(null)}
                onNext={handleNext}
              />
            </div>
          )}
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-3 mt-6 justify-center px-6 py-4"
          style={{
            borderTop: '1px solid var(--line)',
            background: 'var(--glass)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {(['Language', 'Frontend', 'Backend', 'Cloud', 'DevOps', 'AI'] as const).map((cat) => {
            const player = PLAYERS.find((p) => p.category === cat)
            return (
              <div
                key={cat}
                className="flex items-center gap-2 px-4 py-1.5"
                style={{
                  border: '1px solid var(--chipline)',
                  borderRadius: '999px',
                  background: 'var(--chipbg)',
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: player?.color ?? '#fff', boxShadow: `0 0 6px ${player?.color ?? '#fff'}` }}
                />
                <span className="font-mono text-xs tracking-wider uppercase" style={{ color: 'var(--ucl-silver)' }}>
                  {copy.categories[cat] ?? cat}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
