import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '../../shared/components/SectionTitle'
import ProjectCard from './components/ProjectCard'
import { PROJECTS } from '../../data/portfolio.data'
import type { Project } from '../../data/portfolio.data'
import type { Lang } from '../../shared/i18n'

gsap.registerPlugin(ScrollTrigger)

const FILTERS: Array<{ value: Project['category'] | 'All'; label: Record<Lang, string> }> = [
  { value: 'All', label: { es: 'Todo', en: 'All' } },
  { value: 'AI', label: { es: 'IA', en: 'AI' } },
  { value: 'IoT', label: { es: 'IoT', en: 'IoT' } },
  { value: 'Cloud', label: { es: 'Nube', en: 'Cloud' } },
  { value: 'Web', label: { es: 'Web', en: 'Web' } },
]

export default function Projects({ language }: { language: Lang }) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<Project['category'] | 'All'>('All')
  const [highlightedProject, setHighlightedProject] = useState<string | null>(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.children,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, grid)

    return () => ctx.revert()
  }, [activeFilter])

  // Highlight a related project by name
  const handleRelatedClick = (name: string) => {
    setHighlightedProject(name)
    // Scroll to that project if filter is not matching
    const project = PROJECTS.find((p) => p.name === name)
    if (project && activeFilter !== 'All' && activeFilter !== project.category) {
      setActiveFilter('All')
    }
    setTimeout(() => setHighlightedProject(null), 2000)
  }

  return (
    <section id="projects" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={language === 'es' ? '04 — Proyectos' : '04 — Projects'}
          title={language === 'es' ? 'Jugadas Destacadas' : 'Highlights'}
          subtitle={language === 'es'
            ? 'Trabajo seleccionado: herramientas públicas, IoT, IA, cloud y automatización.'
            : 'Selected work: public tools, IoT, AI, cloud, and automation.'}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className="font-mono text-xs tracking-widest uppercase px-4 py-2 border rounded-lg transition-all duration-300"
              style={{
                borderColor: activeFilter === filter.value ? 'rgba(16,185,129,0.6)' : 'var(--chipline)',
                color: activeFilter === filter.value ? '#34D399' : 'var(--ucl-silver)',
                background: activeFilter === filter.value ? 'rgba(16,185,129,0.1)' : 'var(--chipbg)',
              }}
            >
              {filter.label[language]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.name}
              style={{
                outline: highlightedProject === project.name ? '1px solid var(--ucl-gold)' : 'none',
                transition: 'outline 0.3s',
              }}
            >
              <ProjectCard project={project} onRelatedClick={handleRelatedClick} language={language} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
