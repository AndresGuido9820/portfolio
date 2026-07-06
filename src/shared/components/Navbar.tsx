import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import gsap from 'gsap'
import { PERSONAL } from '../../data/portfolio.data'
import type { Lang } from '../i18n'

const ACCENT = '#10B981'

const NAV_LINKS = [
  { id: 'hero', label: { es: 'Inicio', en: 'Home' } },
  { id: 'formation', label: { es: 'Alineación', en: 'Formation' } },
  { id: 'about', label: { es: 'Perfil', en: 'About' } },
  { id: 'experience', label: { es: 'Trayectoria', en: 'Career' } },
  { id: 'palmares', label: { es: 'Palmarés', en: 'Trophies' } },
  { id: 'projects', label: { es: 'Proyectos', en: 'Projects' } },
  { id: 'contact', label: { es: 'Contacto', en: 'Contact' } },
]

interface Props {
  language: Lang
  onLanguageChange: () => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export default function Navbar({ language, onLanguageChange, theme, onThemeToggle }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.4, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <nav ref={ref} className="fixed top-3 left-0 right-0 z-50 px-4">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between gap-4 rounded-2xl px-3 md:px-4 py-2.5 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--glass-strong)' : 'var(--glass)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid var(--line)',
          boxShadow: scrolled
            ? '0 10px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="w-8 h-8 flex items-center justify-center font-mono text-sm font-bold rounded-lg transition-transform duration-300 group-hover:scale-105"
            style={{
              color: '#0A0B0D',
              background: `linear-gradient(145deg, ${ACCENT}, #059669)`,
              boxShadow: '0 0 16px rgba(16,185,129,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            10
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-tight" style={{ color: 'var(--ucl-white)' }}>Andrés Guido</span>
            <span className="font-mono tracking-[0.28em] uppercase" style={{ color: 'var(--ucl-silver)', fontSize: '8px' }}>
              {language === 'es' ? 'Portafolio' : 'Portfolio'} · 2026
            </span>
          </div>
        </a>

        {/* Desktop nav — pill indicator follows active section */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className="relative block font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-2 rounded-lg transition-colors duration-300"
                  style={{ color: isActive ? 'var(--ucl-white)' : 'var(--ucl-silver)' }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--ucl-white)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--ucl-silver)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg -z-0"
                      style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label[language]}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {/* Theme toggle — estadio nocturno / día de partido */}
          <button
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            title={theme === 'dark' ? 'Día de partido' : 'Estadio nocturno'}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid var(--chipline)', background: 'var(--chipbg)', color: 'var(--ucl-silver)' }}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Segmented ES / EN toggle */}
          <div className="flex items-center p-0.5 rounded-lg" style={{ border: '1px solid var(--chipline)', background: 'var(--chipbg)' }}>
            {(['es', 'en'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => { if (language !== lng) onLanguageChange() }}
                className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md transition-all duration-300"
                style={
                  language === lng
                    ? { background: 'rgba(16,185,129,0.15)', color: ACCENT }
                    : { background: 'transparent', color: 'var(--ucl-silver)' }
                }
              >
                {lng}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href={`mailto:${PERSONAL.email}`}
            className="group font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-300"
            style={{
              color: '#0A0B0D',
              background: `linear-gradient(145deg, ${ACCENT}, #059669)`,
              boxShadow: '0 0 0 rgba(16,185,129,0)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 22px -6px rgba(16,185,129,0.7)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(16,185,129,0)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {language === 'es' ? 'Contáctame' : 'Contact me'}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen((v) => !v)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--ucl-white)', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--ucl-white)', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: 'var(--ucl-white)', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden max-w-6xl mx-auto mt-2 rounded-2xl px-5 py-5 flex flex-col gap-3"
          style={{ background: 'var(--glass-strong)', backdropFilter: 'blur(18px)', border: '1px solid var(--line)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm tracking-widest uppercase transition-colors"
              style={{ color: active === link.id ? ACCENT : 'var(--ucl-silver)' }}
            >
              {link.label[language]}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={onThemeToggle}
              aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              className="flex items-center justify-center w-9 h-9 rounded-md"
              style={{ border: '1px solid var(--chipline)', color: 'var(--ucl-white)' }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            {(['es', 'en'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => { if (language !== lng) onLanguageChange() }}
                className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 rounded-md"
                style={language === lng ? { background: 'rgba(16,185,129,0.15)', color: ACCENT } : { border: '1px solid var(--chipline)', color: 'var(--ucl-white)' }}
              >
                {lng}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
