import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import type { PerspectiveCamera } from 'three'
import gsap from 'gsap'
import type { Lang } from '../../shared/i18n'

const URL = `${import.meta.env.BASE_URL}models/tunel.glb`
const DRACO = `${import.meta.env.BASE_URL}draco/`
const ACCENT = '#10B981'

interface Props {
  language: Lang
  /** Fired at the flash peak — mount the main page underneath now. */
  onReveal: () => void
  /** Fired when the fade-out ends — unmount the gate. */
  onDone: () => void
  /** Fast exit — skips the walk entirely. */
  onSkip: () => void
}

function Tunnel() {
  const { scene } = useGLTF(URL, DRACO)
  return <primitive object={scene} />
}

/**
 * Camera choreography:
 * - idle: standing at the tunnel mouth, breathing.
 * - walk: steady stride (~2.6s), then breaks into a run toward the light
 *   with a subtle FOV kick — slow build, epic finish.
 */
function Rig({ walking, onArrive }: { walking: boolean; onArrive: () => void }) {
  const { camera } = useThree()
  const prog = useRef({ p: 0 })

  useEffect(() => {
    camera.position.set(0, 1.55, 1.5)
    camera.rotation.set(0, 0, 0)
  }, [camera])

  useEffect(() => {
    if (!walking) return
    const tl = gsap.timeline({ onComplete: onArrive })
    tl.to(prog.current, { p: 0.52, duration: 2.6, ease: 'power1.inOut' })
      .to(prog.current, { p: 1, duration: 1.9, ease: 'power2.in' })
    return () => { tl.kill() }
  }, [walking, onArrive])

  useFrame((state) => {
    const cam = camera as PerspectiveCamera
    const p = prog.current.p
    const t = state.clock.elapsedTime

    if (!walking) {
      // Breathing idle at the tunnel mouth
      cam.position.z = 1.5
      cam.position.x = Math.sin(t * 0.5) * 0.035
      cam.position.y = 1.55 + Math.sin(t * 0.9) * 0.02
      return
    }

    cam.position.z = 1.5 - 34.6 * p
    cam.position.y = 1.55 + Math.sin(p * Math.PI * 9) * 0.055 * (1 - p * 0.55)
    cam.position.x = Math.sin(p * Math.PI * 4.5) * 0.08 * (1 - p * 0.4)
    cam.rotation.z = Math.sin(p * Math.PI * 6) * 0.004

    // FOV kick on the final sprint — the light swallows the frame
    const kick = Math.min(Math.max((p - 0.6) / 0.4, 0), 1)
    const fov = 68 + 13 * kick * kick
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov
      cam.updateProjectionMatrix()
    }
  })
  return null
}

/** If WebGL or the asset fails, hand over to the page — never trap the visitor. */
class Guard extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFail() }
  render() { return this.state.failed ? null : this.props.children }
}

export default function TunnelTransition({ language, onReveal, onDone, onSkip }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const finished = useRef(false)
  const [walking, setWalking] = useState(false)

  const copy = language === 'es'
    ? { kicker: 'Portafolio', role: 'Ingeniero de Software y Nube · Líder de IA', button: 'Salir al campo', skip: 'Saltar intro' }
    : { kicker: 'Portfolio', role: 'Software & Cloud Engineer · AI Lead', button: 'Take the pitch', skip: 'Skip intro' }

  // Overlay entrance
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.gate-item'),
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, delay: 0.5, ease: 'power3.out' }
    )
  }, [])

  const startWalk = () => {
    if (walking || finished.current) return
    setWalking(true)
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.9, ease: 'power2.out' })
  }

  const finish = () => {
    if (finished.current) return
    finished.current = true
    gsap.to(flashRef.current, {
      opacity: 1,
      duration: 0.34,
      ease: 'power2.in',
      onComplete: () => {
        onReveal()
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.1,
          delay: 0.18,
          ease: 'power2.out',
          onComplete: onDone,
        })
      },
    })
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-[95]" style={{ background: '#050607' }}>
      <Guard onFail={finish}>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true }}
          camera={{ fov: 68, near: 0.1, far: 140, position: [0, 1.55, 1.5] }}
        >
          <color attach="background" args={['#050607']} />
          <fog attach="fog" args={['#050607', 6, 95]} />
          <ambientLight intensity={0.18} />
          <Suspense fallback={null}>
            <Tunnel />
          </Suspense>
          <Rig walking={walking} onArrive={finish} />
          <EffectComposer>
            <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.3} />
            <Vignette darkness={0.55} offset={0.3} />
          </EffectComposer>
        </Canvas>
      </Guard>

      {/* Name overlay — the tunnel IS the intro */}
      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="gate-item flex items-center gap-3 mb-5 opacity-0">
          <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.25)' }} />
          <span className="font-mono text-[11px] tracking-[0.45em] uppercase" style={{ color: 'rgba(16,185,129,0.9)' }}>
            {copy.kicker}
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: 'rgba(155,161,166,0.8)' }}>#10</span>
          <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.25)' }} />
        </div>

        <h1
          className="gate-item font-display text-center leading-[0.9] opacity-0"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 40px rgba(0,0,0,0.8)',
          }}
        >
          <span style={{ color: '#E7E9EA' }}>ANDRÉS</span>{' '}
          <span style={{ color: ACCENT }}>GUIDO</span>
        </h1>

        <p
          className="gate-item font-mono text-xs md:text-sm tracking-[0.3em] uppercase mt-4 mb-12 opacity-0"
          style={{ color: 'rgba(200,205,210,0.85)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          {copy.role}
        </p>

        <button
          onClick={startWalk}
          className="gate-item pointer-events-auto group relative font-mono text-sm tracking-[0.35em] uppercase overflow-hidden rounded-full opacity-0"
          style={{
            padding: '16px 44px',
            border: `1px solid ${ACCENT}`,
            color: ACCENT,
            background: 'rgba(5,6,7,0.35)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-[#06251A]" style={{ fontWeight: 700 }}>
            {copy.button}
          </span>
          <div
            className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            style={{ background: `linear-gradient(145deg, ${ACCENT}, #059669)` }}
          />
        </button>
      </div>

      {/* Skip — always available */}
      {!walking && (
        <button
          onClick={onSkip}
          className="absolute top-6 right-10 font-mono text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-white"
          style={{ color: 'rgba(155,161,166,0.6)' }}
        >
          {copy.skip} →
        </button>
      )}

      {/* Reveal flash — warm floodlight swallowing the frame, emerald at the rim */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: 'radial-gradient(circle at 50% 42%, #fffdf5 0%, #ffe9b8 40%, #7fd6b4 95%, #10B981 130%)',
        }}
      />
    </div>
  )
}

useGLTF.preload(URL, DRACO)
