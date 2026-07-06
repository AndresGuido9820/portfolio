# 2. React Three Fiber avanzado

Stack de este repo: `@react-three/fiber@9`, `@react-three/drei@10`, `three@0.184`.

## Postprocessing — el salto de calidad "Awwwards"

Efectos aplicados después del render: **Bloom** (brillo), vignette, DOF, chromatic aberration, noise/grain.

```bash
npm i @react-three/postprocessing postprocessing
```

```tsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

<EffectComposer>
  <Bloom
    mipmapBlur
    intensity={0.6}
    luminanceThreshold={0.8}   // solo los píxeles brillantes brillan
    luminanceSmoothing={0.2}
  />
  <Vignette darkness={0.5} offset={0.3} />
</EffectComposer>
```

**Bloom selectivo / emisivo:** solo brillan materiales con color fuera de `[0,1]` y `toneMapped={false}`:

```tsx
<meshStandardMaterial emissive="#35e0c8" emissiveIntensity={3} toneMapped={false} />
// o color HDR directo:
<meshBasicMaterial color={[3, 2, 0]} toneMapped={false} />
```

> Para metales (nuestros trofeos) sube el brillo de los reflejos especulares: con `luminanceThreshold` ~0.8 e `intensity` baja, los highlights del cromo/oro florecen sutil = look premium sin exagerar.

## Materiales que impresionan

- **MeshTransmissionMaterial** (drei): vidrio real, refracción, "frosted glass". Ideal para tarjetas/logos de cristal.
  ```tsx
  <MeshTransmissionMaterial thickness={0.5} roughness={0.1} transmission={1} ior={1.4} chromaticAberration={0.05} />
  ```
- **MeshReflectorMaterial** (drei): piso reflectante tipo showroom (blur + mixStrength). Da esa sensación de vitrina de museo.
- **MeshDistortMaterial / MeshWobbleMaterial**: deformación orgánica animada para blobs/heroes abstractos.

## Instancing y partículas

Miles de objetos con un solo draw call:

```tsx
import { Instances, Instance } from '@react-three/drei'
<Instances limit={5000}>
  <sphereGeometry args={[0.02, 8, 8]} />
  <meshStandardMaterial />
  {points.map((p, i) => <Instance key={i} position={p} />)}
</Instances>
```

Para campos de partículas de puntos: `THREE.Points` + `BufferGeometry` con atributos, animados en un vertex shader (ver [03-shaders](./03-shaders-glsl.md)).

## Helpers de drei imprescindibles

| Helper | Uso |
|---|---|
| `Environment` (con `Lightformer`) | Iluminación IBL / reflejos **sin CDN** (procedural). |
| `ContactShadows` | Sombra suave de contacto, barata. |
| `Float` | Flotación orgánica automática. |
| `Bounds` / `Center` | Encuadre y centrado automático de modelos de tamaño variable. |
| `useGLTF(url, dracoPath)` | Carga glTF; segundo arg = ruta al decoder Draco (¡local!). |
| `ScrollControls` + `useScroll` | Scroll virtual dentro del canvas (alternativa a framer-motion). |
| `AccumulativeShadows` | Sombras suaves horneadas de altísima calidad. |

## Rendimiento en R3F
- `frameloop="demand"` cuando la escena está quieta (renderiza solo al invalidar).
- Muta con refs en `useFrame`, **no** con `setState` por frame.
- `dispose` manual de geometrías/materiales/texturas al desmontar.
- Envuelve el canvas en un **ErrorBoundary** (un fallo WebGL no debe tumbar toda la página).

## Referencias
- [react-postprocessing (docs)](https://react-postprocessing.docs.pmnd.rs/) · [Bloom](https://react-postprocessing.docs.pmnd.rs/effects/bloom)
- [drei (GitHub)](https://github.com/pmndrs/drei)
- [Three.js Journey — Post-processing con R3F](https://threejs-journey.com/lessons/post-processing-with-r3f)
- [Codrops — React Three Fiber](https://tympanus.net/codrops/tag/react-three-fiber/)
