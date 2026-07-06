import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as THREE from 'three'
import type { Lang } from '../../shared/i18n'

const url = (f: string) => `${import.meta.env.BASE_URL}models/${f}`
const DRACO = `${import.meta.env.BASE_URL}draco/`

type TItem = {
  f: string
  name: string
  tagEs: string
  tagEn: string
  es: string
  en: string
  stackEs: string
  stackEn: string
}

const TROPHIES: TItem[] = [
  {
    f: 'trofeo_champions_league.glb',
    name: 'Champions League',
    tagEs: 'Élite · Cloud & IA', tagEn: 'Elite · Cloud & AI',
    es: 'La élite europea. Arquitecturas serverless e integraciones de IA llevadas a producción, con foco en fiabilidad y escala.',
    en: 'The European elite. Serverless architectures and AI integrations shipped to production, focused on reliability and scale.',
    stackEs: 'AWS · Lambda · Serverless · LLMs', stackEn: 'AWS · Lambda · Serverless · LLMs',
  },
  {
    f: 'trofeo_mundial.glb',
    name: 'Copa del Mundo',
    tagEs: 'Cumbre · IA aplicada', tagEn: 'Summit · Applied AI',
    es: 'El gran torneo. Sistemas end-to-end con LLMs, RAG y agentes autónomos que automatizan procesos reales del negocio.',
    en: 'The big tournament. End-to-end systems with LLMs, RAG and autonomous agents that automate real business processes.',
    stackEs: 'LLMs · RAG · Agentes · Python', stackEn: 'LLMs · RAG · Agents · Python',
  },
  {
    f: 'trofeo_libertadores.glb',
    name: 'Libertadores',
    tagEs: 'Escala · IoT & Datos', tagEn: 'Scale · IoT & Data',
    es: 'Garra y fondo. Pipelines de datos IoT en AWS funcionando a escala, desde telemetría hasta datasets listos para ML.',
    en: 'Grit and depth. IoT data pipelines on AWS running at scale, from telemetry to ML-ready datasets.',
    stackEs: 'IoT Core · MQTT · S3 · Pipelines', stackEn: 'IoT Core · MQTT · S3 · Pipelines',
  },
  {
    f: 'balon_de_oro.glb',
    name: 'Balón de Oro',
    tagEs: 'Individual · Open source', tagEn: 'Individual · Open source',
    es: 'Reconocimiento individual. Herramientas open source como awscope y git-health: útiles, con tests, CI y buena documentación.',
    en: 'Individual recognition. Open-source tools like awscope and git-health: useful, with tests, CI and solid docs.',
    stackEs: 'Python · CLI · Pytest · CI', stackEn: 'Python · CLI · Pytest · CI',
  },
  {
    f: 'fifa_club_world_cup.glb',
    name: 'Mundial de Clubes',
    tagEs: 'Cima · Full-stack', tagEn: 'Top · Full-stack',
    es: 'Competir en la cima. Full-stack sólido y microservicios: del backend al frontend con arquitectura limpia.',
    en: 'Competing at the top. Solid full-stack and microservices: from backend to frontend with clean architecture.',
    stackEs: 'NestJS · React · Docker · SQL', stackEn: 'NestJS · React · Docker · SQL',
  },
  {
    f: 'fifa_the_best.glb',
    name: 'FIFA The Best',
    tagEs: 'Regularidad · DevTooling', tagEn: 'Consistency · DevTooling',
    es: 'Rendimiento constante. Automatización y tooling que quita trabajo manual repetitivo del equipo.',
    en: 'Consistent performance. Automation and tooling that removes the team’s repetitive manual work.',
    stackEs: 'Automatización · Scripts · GitHub Actions', stackEn: 'Automation · Scripts · GitHub Actions',
  },
  {
    f: 'trofeo_el_10.glb',
    name: 'El 10',
    tagEs: 'El que nadie entrega', tagEn: 'The one nobody hands out',
    es: 'Este trofeo no existe en ninguna vitrina: lo modelé yo, pieza por pieza. Un 10 de oro con el balón en el corazón del cero — visión, toque simple y oficio. El verdadero premio es jugar así todos los días.',
    en: 'This trophy exists in no cabinet: I modeled it myself, piece by piece. A golden 10 with the ball at the heart of the zero — vision, simple touch, craft. The real prize is playing like that every day.',
    stackEs: 'Blender · glTF · Draco · Three.js', stackEn: 'Blender · glTF · Draco · Three.js',
  },
]

const AUTOPLAY_MS = 4800

const textVariants = {
  enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -60 : 60 }),
}

// ---- 3D: solo el trofeo activo (montado uno a la vez) ----
function ActiveTrophy({ file, dir }: { file: string; dir: number }) {
  const { scene } = useGLTF(url(file), DRACO) as unknown as { scene: THREE.Object3D }
  const data = useMemo(() => {
    const obj = scene.clone(true)
    const box = new THREE.Box3().setFromObject(obj)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    return { obj, center, s: 2.6 / (size.y || 1) }
  }, [scene])

  const outer = useRef<THREE.Group>(null)
  useLayoutEffect(() => {
    if (outer.current) {
      outer.current.position.x = dir >= 0 ? 3.2 : -3.2 // entra deslizando de lado
      outer.current.scale.setScalar(0.6)
    }
  }, [dir])

  useFrame((state, delta) => {
    const g = outer.current
    if (!g) return
    g.position.x = THREE.MathUtils.damp(g.position.x, 0, 6, delta)
    const s = THREE.MathUtils.damp(g.scale.x, 1, 6, delta)
    g.scale.setScalar(s)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05 // flotación sutil, sin girar
  })

  return (
    <group ref={outer}>
      <group scale={data.s}>
        <primitive object={data.obj} position={[-data.center.x, -data.center.y, -data.center.z]} />
      </group>
    </group>
  )
}

function StudioEnv() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 0]}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -2]} scale={[12, 6, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-6, 1, 2]} scale={[6, 8, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[6, 1, 2]} scale={[6, 8, 1]} />
        <Lightformer form="ring" color="#8fb2ff" intensity={0.7} position={[0, 2, 4]} scale={3} />
      </group>
    </Environment>
  )
}

class Guard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return <div className="w-full h-full flex items-center justify-center"><span className="text-6xl">🏆</span></div>
    }
    return this.props.children
  }
}

export default function TrophyShowcase({ language }: { language: Lang }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  // Lazy 3D: mount the Canvas (and fetch the GLBs) only when the section approaches
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          TROPHIES.forEach((t) => useGLTF.preload(url(t.f), DRACO))
          obs.disconnect()
        }
      },
      { rootMargin: '700px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const paginate = useCallback((d: number) => {
    setDir(d)
    setIndex((i) => (i + d + TROPHIES.length) % TROPHIES.length)
  }, [])

  // auto-avance horizontal (se pausa al interactuar / hover)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, index, paginate])

  const t = TROPHIES[index]

  return (
    <section
      ref={sectionRef}
      id="palmares"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Encabezado */}
      <div className="absolute top-10 left-6 md:left-16 z-20 pointer-events-none">
        <p className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: 'var(--ucl-gold)' }}>
          {language === 'es' ? '03 — Sala de trofeos' : '03 — Trophy room'}
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-semibold uppercase mt-1" style={{ color: 'var(--ucl-white)' }}>
          {language === 'es' ? 'Palmarés' : 'Honours'}
        </h2>
      </div>

      <div className="relative grid md:grid-cols-2 items-center max-w-7xl mx-auto w-full px-6 md:px-16 gap-10 md:gap-20">
        {/* TEXTO — con mucho peso */}
        <div className="relative z-20 order-2 md:order-1 pointer-events-none md:pl-10 lg:pl-20">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eyebrow: número + categoría */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm tracking-widest" style={{ color: 'var(--ucl-gold)' }}>
                  {String(index + 1).padStart(2, '0')} / {String(TROPHIES.length).padStart(2, '0')}
                </span>
                <span className="h-px w-8" style={{ background: 'var(--ucl-gold-dim)' }} />
                <span
                  className="font-mono text-[11px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                  style={{ color: 'var(--ucl-gold)', border: '1px solid var(--ucl-gold-dim)' }}
                >
                  {language === 'es' ? t.tagEs : t.tagEn}
                </span>
              </div>

              <h3
                className="font-display uppercase leading-[0.95] tracking-tight"
                style={{ color: 'var(--ucl-white)', fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
              >
                {t.name}
              </h3>

              <p className="mt-6 text-base md:text-xl leading-relaxed max-w-md" style={{ color: 'var(--ucl-silver)' }}>
                {language === 'es' ? t.es : t.en}
              </p>

              {/* línea de stack */}
              <div className="mt-6 flex flex-wrap gap-2 max-w-md">
                {(language === 'es' ? t.stackEs : t.stackEn).split(' · ').map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[11px] tracking-wide px-2 py-1"
                    style={{ color: 'var(--ucl-silver)', border: '1px solid var(--chipline)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D — solo el trofeo activo */}
        <motion.div
          className="relative order-1 md:order-2 h-[42vh] md:h-[74vh] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) paginate(1)
            else if (info.offset.x > 80) paginate(-1)
          }}
        >
          <Guard>
            {inView && (
            <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 42 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[4, 6, 4]} intensity={2.2} />
              <directionalLight position={[-5, 3, -3]} intensity={0.9} color="#8fb2ff" />
              <Suspense fallback={null}>
                <ActiveTrophy key={index} file={t.f} dir={dir} />
                <StudioEnv />
              </Suspense>
              <ContactShadows position={[0, -1.35, 0]} opacity={0.4} scale={10} blur={2.8} far={3} />
              <EffectComposer>
                <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
                <Vignette darkness={0.4} offset={0.4} />
              </EffectComposer>
            </Canvas>
            )}
          </Guard>
        </motion.div>
      </div>

      {/* Controles: flechas + dots */}
      <div className="relative z-20 flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => paginate(-1)}
          aria-label="Anterior"
          className="p-2 rounded-full border transition hover:scale-110"
          style={{ borderColor: 'var(--ucl-gold-dim)', color: 'var(--ucl-gold)' }}
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2">
          {TROPHIES.map((tr, i) => (
            <button
              key={tr.f}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
              aria-label={tr.name}
              className="rounded-full transition-all duration-300"
              style={{
                height: 4,
                width: i === index ? 28 : 12,
                background: i === index ? 'var(--ucl-gold)' : 'var(--chipline)',
                boxShadow: i === index ? '0 0 12px var(--ucl-gold)' : 'none',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => paginate(1)}
          aria-label="Siguiente"
          className="p-2 rounded-full border transition hover:scale-110"
          style={{ borderColor: 'var(--ucl-gold-dim)', color: 'var(--ucl-gold)' }}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  )
}

// La precarga de los GLB ocurre al acercarse la sección (ver IntersectionObserver arriba)
