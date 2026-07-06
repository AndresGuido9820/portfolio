import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function seededNoise(index: number) {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/* ── Floating football ─────────────────────────────────────────────── */
function UCLFootball() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.38
    groupRef.current.rotation.x = t * 0.14
    groupRef.current.position.y = 12 + Math.sin(t * 0.7) * 1.8
  })

  return (
    <group ref={groupRef} position={[32, 12, 0]}>
      {/* White sphere base */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color="#e8e8ff" transparent opacity={0.12} />
      </mesh>

      {/* Dodecahedron wireframe — pentagon seam lines */}
      <mesh>
        <dodecahedronGeometry args={[4.6, 0]} />
        <meshBasicMaterial color="#111133" wireframe transparent opacity={0.55} />
      </mesh>

      {/* UCL lime wireframe accent */}
      <mesh>
        <icosahedronGeometry args={[4.7, 0]} />
        <meshBasicMaterial color="#C8FF00" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Soft glow halo */}
      <mesh>
        <sphereGeometry args={[5.8, 16, 16]} />
        <meshBasicMaterial color="#C8FF00" transparent opacity={0.025} />
      </mesh>
    </group>
  )
}

/* ── UCL Starball — central 3-D focal point ────────────────────────── */
function UCLStarball() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.05
    groupRef.current.rotation.x = t * 0.019
    groupRef.current.rotation.z = t * 0.009
  })

  return (
    <group ref={groupRef}>
      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#0a2bff" transparent opacity={0.38} />
      </mesh>

      {/* Mid atmosphere */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color="#1240cc" transparent opacity={0.13} />
      </mesh>

      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[6.5, 32, 32]} />
        <meshBasicMaterial color="#0a1cff" transparent opacity={0.04} />
      </mesh>

      {/* Icosahedron wireframe level 1 — lime (football-like geodesic) */}
      <mesh>
        <icosahedronGeometry args={[7, 1]} />
        <meshBasicMaterial color="#C8FF00" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Outer icosahedron cage — blue */}
      <mesh>
        <icosahedronGeometry args={[9.5, 0]} />
        <meshBasicMaterial color="#4488ff" wireframe transparent opacity={0.07} />
      </mesh>

      {/* Equatorial torus — lime */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7.8, 0.08, 2, 128]} />
        <meshBasicMaterial color="#C8FF00" transparent opacity={0.30} />
      </mesh>

      {/* Polar torus — blue */}
      <mesh>
        <torusGeometry args={[7.8, 0.05, 2, 128]} />
        <meshBasicMaterial color="#3a6fd4" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

/* ── Star field ─────────────────────────────────────────────────────── */
function Stars({ count = 2500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const white = new THREE.Color('#ffffff')
    const lime  = new THREE.Color('#C8FF00')
    const cyan  = new THREE.Color('#3a6fd4')
    const pink  = new THREE.Color('#E8007E')
    const gold  = new THREE.Color('#FFD700')

    for (let i = 0; i < count; i++) {
      const r     = 80 + seededNoise(i) * 120
      const theta = seededNoise(i + 1000) * Math.PI * 2
      const phi   = Math.acos(2 * seededNoise(i + 2000) - 1)

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const rand = seededNoise(i + 3000)
      const c = rand < 0.06 ? lime
              : rand < 0.10 ? cyan
              : rand < 0.13 ? pink
              : rand < 0.17 ? gold
              : white
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.012
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.004) * 0.04
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.38} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  )
}

/* ── Orbiting rings ─────────────────────────────────────────────────── */
function LimeRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.07
      ref.current.rotation.x = Math.PI / 3 + Math.sin(clock.getElapsedTime() * 0.09) * 0.04
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[30, 0.09, 2, 180]} />
      <meshBasicMaterial color="#C8FF00" transparent opacity={0.18} />
    </mesh>
  )
}

function PinkRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = -clock.getElapsedTime() * 0.045
      ref.current.rotation.x = -Math.PI / 5 + Math.cos(clock.getElapsedTime() * 0.07) * 0.03
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[42, 0.07, 2, 180]} />
      <meshBasicMaterial color="#E8007E" transparent opacity={0.12} />
    </mesh>
  )
}

function CyanRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.06
      ref.current.rotation.z = Math.PI / 6
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[20, 0.06, 2, 120]} />
      <meshBasicMaterial color="#3a6fd4" transparent opacity={0.10} />
    </mesh>
  )
}

/* ── Canvas ─────────────────────────────────────────────────────────── */
export default function ParticleUniverse() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 60], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <UCLFootball />
        <UCLStarball />
        <Stars count={2500} />
        <LimeRing />
        <PinkRing />
        <CyanRing />
      </Canvas>
    </div>
  )
}
