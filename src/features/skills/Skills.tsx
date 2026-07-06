import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '../../shared/components/SectionTitle'
import { SKILLS } from '../../data/portfolio.data'
import type { Lang } from '../../shared/i18n'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   TROPHY TIERS
   Tier 1 → UCL gold  (largest)
   Tier 2 → League gold (medium)
   Tier 3 → Silver cup (small)
───────────────────────────────────────────────────────────── */
const TIER1 = new Set(['Python','TypeScript','React','AWS Lambda','Claude API','Docker','LangChain','MQTT'])
const TIER2 = new Set(['FastAPI','Node.js','RAG Systems','CloudFormation','ESP32','GitHub Actions','TensorFlow','Computer Vision','LLMs'])

/* ─────────────────────────────────────────────────────────────
   SKILL ABBREVIATIONS (nameplate)
───────────────────────────────────────────────────────────── */
const AB: Record<string,string> = {
  'Python':'PY','TypeScript':'TS','JavaScript':'JS','Go':'GO','Scala':'SC','SQL':'SQL',
  'React':'RC','Tailwind CSS':'TW','Framer Motion':'FM','GSAP':'GSAP','Vite':'VT',
  'Node.js':'NJ','NestJS':'NS','Express':'EX','FastAPI':'FA','PostgreSQL':'PG',
  'MongoDB':'MG','DynamoDB':'DY','REST API':'REST','Microservices':'MS',
  'AWS Lambda':'AWS','AWS IoT Core':'IoT','CloudFormation':'CF','ECS Fargate':'ECS',
  'S3':'S3','Azure':'AZ','LLMs':'LLM','RAG Systems':'RAG','LangChain':'LC',
  'Claude API':'CL','OpenAI':'OAI','TensorFlow':'TF','Scikit-learn':'SK',
  'Computer Vision':'CV','MQTT':'MQTT','Ubidots':'UB','Raspberry Pi':'RPI',
  'Arduino':'ARD','ESP32':'ESP','Docker':'DK','CI/CD':'CI','GitHub Actions':'GH',
  'Git':'GIT','Redis':'RD',
}

/* ─────────────────────────────────────────────────────────────
   SVG GRADIENT DEFS (reused across all trophies)
───────────────────────────────────────────────────────────── */
const DEFS_ID = 'trophy-defs'

function TrophyGradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Gold tier 1 */}
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FFFDE7" />
          <stop offset="18%"  stopColor="#FFD600" />
          <stop offset="42%"  stopColor="#9E6C00" />
          <stop offset="68%"  stopColor="#FFD600" />
          <stop offset="100%" stopColor="#FFF59D" />
        </linearGradient>
        <linearGradient id="g1-shine" x1="20%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Gold tier 2 */}
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FFF8E1" />
          <stop offset="20%"  stopColor="#FFC107" />
          <stop offset="50%"  stopColor="#7B5800" />
          <stop offset="80%"  stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFE082" />
        </linearGradient>
        <linearGradient id="g2-shine" x1="15%" y1="0%" x2="55%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Silver tier 3 */}
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F5F5F5" />
          <stop offset="22%"  stopColor="#BDBDBD" />
          <stop offset="50%"  stopColor="#616161" />
          <stop offset="78%"  stopColor="#BDBDBD" />
          <stop offset="100%" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient id="g3-shine" x1="10%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Shelf glass */}
        <linearGradient id="shelf-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   TROPHY SVG SHAPES
───────────────────────────────────────────────────────────── */

/** Tier 1 — UCL-style tall gold trophy */
function TrophyLarge({ abbr }: { abbr: string }) {
  return (
    <svg viewBox="0 0 110 185" width="88" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M 22 22 Q 20 82 38 102 Q 49 114 55 114 Q 61 114 72 102 Q 90 82 88 22 Z"
        fill="url(#g1)" />
      <path d="M 22 22 Q 20 82 38 102 Q 49 114 55 114 Q 61 114 72 102 Q 90 82 88 22 Z"
        fill="url(#g1-shine)" />
      {/* Lid */}
      <ellipse cx="55" cy="22" rx="33" ry="12" fill="url(#g1)" />
      <ellipse cx="55" cy="22" rx="33" ry="12" fill="url(#g1-shine)" />
      {/* Finial */}
      <path d="M 48 11 Q 52 1 55 -1 Q 58 1 62 11"
        stroke="url(#g1)" strokeWidth="4.5" strokeLinecap="round" />
      {/* Left handle */}
      <path d="M 22 30 Q 1 44 3 66 Q 4 82 22 74"
        stroke="url(#g1)" strokeWidth="8" strokeLinecap="round" />
      {/* Right handle */}
      <path d="M 88 30 Q 109 44 107 66 Q 106 82 88 74"
        stroke="url(#g1)" strokeWidth="8" strokeLinecap="round" />
      {/* Stem */}
      <rect x="47" y="114" width="16" height="22" rx="2" fill="url(#g1)" />
      {/* Base steps */}
      <rect x="34" y="136" width="42" height="9" rx="2" fill="url(#g1)" />
      <rect x="26" y="145" width="58" height="9" rx="2" fill="url(#g1)" />
      <rect x="18" y="154" width="74" height="11" rx="3" fill="url(#g1)" />
      {/* Nameplate on base */}
      <rect x="27" y="156" width="56" height="8" rx="1.5" fill="rgba(0,0,0,0.4)" />
      <text x="55" y="162.5" textAnchor="middle" fontSize="7.5"
        fontFamily="'JetBrains Mono',monospace" fill="rgba(255,230,100,0.9)"
        letterSpacing="1.2">{abbr}</text>
    </svg>
  )
}

/** Tier 2 — League gold cup */
function TrophyMedium({ abbr }: { abbr: string }) {
  return (
    <svg viewBox="0 0 88 145" width="70" height="116" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M 18 18 Q 17 64 32 80 Q 40 88 44 88 Q 48 88 56 80 Q 71 64 70 18 Z"
        fill="url(#g2)" />
      <path d="M 18 18 Q 17 64 32 80 Q 40 88 44 88 Q 48 88 56 80 Q 71 64 70 18 Z"
        fill="url(#g2-shine)" />
      {/* Lid */}
      <ellipse cx="44" cy="18" rx="26" ry="9.5" fill="url(#g2)" />
      <ellipse cx="44" cy="18" rx="26" ry="9.5" fill="url(#g2-shine)" />
      {/* Finial */}
      <path d="M 38 9 Q 42 1 44 -1 Q 46 1 50 9"
        stroke="url(#g2)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Left handle */}
      <path d="M 18 25 Q 2 36 3 54 Q 4 66 18 60"
        stroke="url(#g2)" strokeWidth="6.5" strokeLinecap="round" />
      {/* Right handle */}
      <path d="M 70 25 Q 86 36 85 54 Q 84 66 70 60"
        stroke="url(#g2)" strokeWidth="6.5" strokeLinecap="round" />
      {/* Stem */}
      <rect x="38" y="88" width="12" height="18" rx="1.5" fill="url(#g2)" />
      {/* Base */}
      <rect x="27" y="106" width="34" height="8" rx="2" fill="url(#g2)" />
      <rect x="20" y="114" width="48" height="8" rx="2" fill="url(#g2)" />
      <rect x="14" y="122" width="60" height="9" rx="2.5" fill="url(#g2)" />
      {/* Nameplate */}
      <rect x="21" y="124" width="46" height="7" rx="1" fill="rgba(0,0,0,0.4)" />
      <text x="44" y="129.5" textAnchor="middle" fontSize="6.5"
        fontFamily="'JetBrains Mono',monospace" fill="rgba(255,220,80,0.9)"
        letterSpacing="1">{abbr}</text>
    </svg>
  )
}

/** Tier 3 — Silver victory cup */
function TrophySmall({ abbr }: { abbr: string }) {
  return (
    <svg viewBox="0 0 68 110" width="56" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M 14 15 Q 13 50 25 62 Q 31 68 34 68 Q 37 68 43 62 Q 55 50 54 15 Z"
        fill="url(#g3)" />
      <path d="M 14 15 Q 13 50 25 62 Q 31 68 34 68 Q 37 68 43 62 Q 55 50 54 15 Z"
        fill="url(#g3-shine)" />
      {/* Lid */}
      <ellipse cx="34" cy="15" rx="20" ry="7" fill="url(#g3)" />
      <ellipse cx="34" cy="15" rx="20" ry="7" fill="url(#g3-shine)" />
      {/* Handles */}
      <path d="M 14 21 Q 2 30 3 44 Q 4 53 14 48"
        stroke="url(#g3)" strokeWidth="5" strokeLinecap="round" />
      <path d="M 54 21 Q 66 30 65 44 Q 64 53 54 48"
        stroke="url(#g3)" strokeWidth="5" strokeLinecap="round" />
      {/* Stem */}
      <rect x="29" y="68" width="10" height="13" rx="1" fill="url(#g3)" />
      {/* Base */}
      <rect x="20" y="81" width="28" height="6" rx="1.5" fill="url(#g3)" />
      <rect x="15" y="87" width="38" height="7" rx="2" fill="url(#g3)" />
      {/* Nameplate */}
      <rect x="18" y="89" width="32" height="5" rx="1" fill="rgba(0,0,0,0.4)" />
      <text x="34" y="93.5" textAnchor="middle" fontSize="5.5"
        fontFamily="'JetBrains Mono',monospace" fill="rgba(220,220,220,0.9)"
        letterSpacing="0.8">{abbr}</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   SINGLE TROPHY DISPLAY ITEM
───────────────────────────────────────────────────────────── */
function TrophyItem({ skill, categoryColor }: { skill: string; categoryColor: string }) {
  const abbr = AB[skill] ?? skill.slice(0, 4).toUpperCase()
  const tier = TIER1.has(skill) ? 1 : TIER2.has(skill) ? 2 : 3

  const glowColor = tier === 1 ? '#FFD700' : tier === 2 ? '#FFC107' : '#BDBDBD'
  const spotColor = tier === 1 ? 'rgba(255,214,0,0.35)' : tier === 2 ? 'rgba(255,193,7,0.25)' : 'rgba(180,180,180,0.18)'

  return (
    <div
      data-trophy
      className="group flex flex-col items-center relative"
      style={{ cursor: 'default' }}
      title={skill}
    >
      {/* Individual spotlight from above */}
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: tier === 1 ? '120px' : tier === 2 ? '96px' : '76px',
          height: tier === 1 ? '160px' : tier === 2 ? '130px' : '110px',
          background: `radial-gradient(ellipse at 50% 0%, ${spotColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.3s ease',
        }}
        className="opacity-80 group-hover:opacity-100"
      />

      {/* Trophy — lifts and glows on hover */}
      <div
        className="relative z-10 transition-all duration-350 ease-out group-hover:-translate-y-3"
        style={{
          filter: `drop-shadow(0 8px 16px ${glowColor}55)`,
          transition: 'transform 0.3s ease, filter 0.3s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.filter = `drop-shadow(0 12px 28px ${glowColor}cc) drop-shadow(0 0 8px ${glowColor}99)`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.filter = `drop-shadow(0 8px 16px ${glowColor}55)`
        }}
      >
        {tier === 1 ? <TrophyLarge abbr={abbr} /> :
         tier === 2 ? <TrophyMedium abbr={abbr} /> :
                      <TrophySmall abbr={abbr} />}
      </div>

      {/* Skill name below trophy */}
      <div
        className="relative z-10 font-mono text-center mt-1 leading-tight"
        style={{
          fontSize: tier === 1 ? '9px' : '8px',
          color: tier === 1 ? '#FFD700' : tier === 2 ? '#FFC107' : 'rgba(180,210,255,0.7)',
          letterSpacing: '0.07em',
          maxWidth: tier === 1 ? '90px' : '72px',
          textShadow: tier < 3 ? `0 0 10px ${glowColor}80` : 'none',
        }}
      >
        {skill}
      </div>

      {/* Shadow on shelf */}
      <div
        style={{
          width: tier === 1 ? '70px' : tier === 2 ? '54px' : '42px',
          height: '6px',
          background: 'rgba(0,0,0,0.55)',
          borderRadius: '50%',
          filter: 'blur(4px)',
          marginTop: '3px',
          opacity: 0.7,
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   GLASS SHELF ROW
───────────────────────────────────────────────────────────── */
function ShelfRow({
  label, skills, color, first,
}: {
  label: string; skills: string[]; color: string; first?: boolean
}) {
  return (
    <div className="relative" style={{ marginBottom: '6px' }}>
      {/* Category badge */}
      <div
        className="absolute font-mono uppercase tracking-widest z-20 flex items-center gap-1.5"
        style={{
          top: '12px',
          left: '16px',
          fontSize: '8px',
          color,
          textShadow: `0 0 12px ${color}`,
          background: 'rgba(4,6,30,0.8)',
          padding: '3px 10px 3px 8px',
          border: `1px solid ${color}40`,
          backdropFilter: 'blur(6px)',
        }}
      >
        <span style={{ width: '12px', height: '1px', display: 'inline-block', background: color }} />
        {label}
      </div>

      {/* Shelf container */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(18,14,10,0.85) 0%, rgba(8,6,4,0.92) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderTop: `1px solid ${color}35`,
        }}
      >
        {/* Inner ambient light from ceiling */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
            background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${color}0c 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Trophies */}
        <div
          className="flex items-end gap-6 px-6 overflow-x-auto"
          style={{
            paddingTop: '44px',
            paddingBottom: '0px',
            scrollbarWidth: 'none',
            minHeight: first ? '210px' : '170px',
          }}
        >
          {skills.map((skill) => (
            <TrophyItem key={skill} skill={skill} categoryColor={color} />
          ))}
        </div>

        {/* Glass shelf surface */}
        <div
          style={{
            height: '12px',
            background: 'url(#shelf-glass)',
            borderTop: '1.5px solid rgba(255,255,255,0.18)',
            borderBottom: '1px solid rgba(0,0,0,0.6)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */
const SHELVES = [
  { key: 'ai',      en: 'AI & ML',   es: 'IA & ML',  color: '#a78bfa', skills: SKILLS.ai_ml    },
  { key: 'cloud',   en: 'Cloud',     es: 'Nube',      color: '#38bdf8', skills: SKILLS.cloud    },
  { key: 'iot',     en: 'IoT',       es: 'IoT',       color: '#22d3ee', skills: SKILLS.iot      },
  { key: 'backend', en: 'Backend',   es: 'Backend',   color: '#86efac', skills: SKILLS.backend  },
  { key: 'devops',  en: 'DevOps',    es: 'DevOps',    color: '#60a5fa', skills: SKILLS.devops   },
  { key: 'front',   en: 'Frontend',  es: 'Frontend',  color: '#f97316', skills: SKILLS.frontend },
  { key: 'lang',    en: 'Languages', es: 'Lenguajes', color: '#c8ff00', skills: SKILLS.languages},
]

export default function Skills({ language }: { language: Lang }) {
  const cabinetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cabinetRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      // Shelves slide up one by one
      gsap.fromTo('[data-shelf-row]',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
        }
      )
      // Trophies pop up with stagger inside each shelf
      gsap.fromTo('[data-trophy]',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'back.out(2)',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none none' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      {/* SVG gradient defs (invisible) */}
      <TrophyGradientDefs />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          label={language === 'es' ? '05 — Habilidades' : '05 — Skills'}
          title={language === 'es' ? 'El Arsenal' : 'The Arsenal'}
          subtitle={language === 'es'
            ? 'Mi vitrina de trofeos. Cada tecnología tiene su lugar en el stand.'
            : 'My trophy room. Each technology earns its place on the stand.'}
        />

        {/* Trophy cabinet */}
        <div
          ref={cabinetRef}
          style={{
            background: 'linear-gradient(180deg, #0d0a08 0%, #080605 100%)',
            border: '1.5px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Cabinet top bar */}
          <div
            style={{
              height: '8px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          />

          {/* Shelves */}
          {SHELVES.map((shelf, i) => (
            <div key={shelf.key} data-shelf-row>
              <ShelfRow
                label={language === 'es' ? shelf.es : shelf.en}
                skills={shelf.skills}
                color={shelf.color}
                first={i === 0}
              />
            </div>
          ))}

          {/* Cabinet bottom plinth */}
          <div
            style={{
              height: '20px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.04) 100%)',
              borderTop: '1.5px solid rgba(255,255,255,0.12)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
