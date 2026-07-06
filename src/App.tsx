import { useEffect, useState } from 'react'
import { useLenis } from './shared/hooks/useLenis'
import ScrollProgress from './shared/components/ScrollProgress'
import Navbar from './shared/components/Navbar'
import TunnelTransition from './features/intro/TunnelTransition'
import Hero from './features/hero/Hero'
import About from './features/about/About'
import Experience from './features/experience/Experience'
import TrophyShowcase from './features/palmares/TrophyShowcase'
import Projects from './features/projects/Projects'
import Formation from './features/formation/Formation'
import Contact from './features/contact/Contact'
import { COMPETITIONS } from './data/competitions'
import type { Lang } from './shared/i18n'
import './styles/globals.css'

const ACTIVE_COMP = 0

type Phase = 'gate' | 'main'

export default function App() {
  // The tunnel gate plays once per browser session — returning visitors land straight on the pitch.
  // Reduced-motion visitors skip the walk entirely (the gate button falls back to skip).
  const [phase, setPhase] = useState<Phase>(() => {
    if (sessionStorage.getItem('introSeen')) return 'main'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'main'
    return 'gate'
  })
  // Main page mounts at the tunnel's flash peak so the hero is ready when the light fades
  const [mainVisible, setMainVisible] = useState(phase === 'main')
  const [language, setLanguage] = useState<Lang>('es')

  // Theme: "estadio nocturno" (default) or "día de partido". 3D night scenes stay dark by design.
  const [uiTheme, setUiTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('uiTheme') === 'light' ? 'light' : 'dark')
  )
  useEffect(() => {
    document.documentElement.dataset.theme = uiTheme
    localStorage.setItem('uiTheme', uiTheme)
  }, [uiTheme])

  const markSeen = () => sessionStorage.setItem('introSeen', '1')

  // "Saltar intro" → straight to the page, no ceremony
  const skipToMain = () => {
    markSeen()
    setMainVisible(true)
    setPhase('main')
  }

  useLenis(mainVisible)

  const theme = COMPETITIONS[ACTIVE_COMP]!

  return (
    <>
      <ScrollProgress />

      {phase === 'gate' && (
        <TunnelTransition
          language={language}
          onReveal={() => { markSeen(); setMainVisible(true) }}
          onDone={() => setPhase('main')}
          onSkip={skipToMain}
        />
      )}

      {mainVisible && (
        <>
          {uiTheme === 'dark' ? (
            <>
              {/* Night stadium: faint field photo + dark scrim with emerald glow */}
              <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${theme.fieldBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.03,
                }}
              />
              <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 70% 10%, rgba(16,185,129,0.06) 0%, transparent 45%), linear-gradient(180deg, rgba(10,11,13,0.55) 0%, rgba(10,11,13,0.82) 100%)',
                }}
              />
            </>
          ) : (
            /* Matchday light: airy gradient with a whisper of grass green */
            <div
              className="fixed inset-0 z-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 70% 8%, rgba(5,150,105,0.07) 0%, transparent 45%), radial-gradient(ellipse at 15% 90%, rgba(5,150,105,0.05) 0%, transparent 40%)',
              }}
            />
          )}

          <Navbar
            language={language}
            onLanguageChange={() => setLanguage((current) => current === 'es' ? 'en' : 'es')}
            theme={uiTheme}
            onThemeToggle={() => setUiTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          />
          <main>
            <Hero language={language} activeComp={ACTIVE_COMP} />
            <About language={language} />
            <Experience language={language} />
            <TrophyShowcase language={language} />
            <Projects language={language} />
            <Formation activeComp={ACTIVE_COMP} language={language} />
            <Contact language={language} />
          </main>
        </>
      )}
    </>
  )
}
