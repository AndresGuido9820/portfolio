# 3. Shaders / GLSL

Los shaders son la "magia" de las webs premiadas: distorsiones, partículas vivas, transiciones líquidas, auras. Dos programas en la GPU:

- **Vertex shader:** mueve vértices (deforma geometría, olas, displacement).
- **Fragment shader:** color por píxel (gradientes, ruido, fresnel, glow).

En R3F se conectan con `shaderMaterial` (drei) o `THREE.ShaderMaterial`, pasando datos por **uniforms** (`uTime`, `uMouse`, texturas) y **varyings** (vertex → fragment).

## shaderMaterial de drei (patrón limpio)

```tsx
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

const WaveMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color('#35e0c8') },
  /* glsl vertex */ `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      p.z += sin(p.x * 6.0 + uTime) * 0.15;   // ola
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`,
  /* glsl fragment */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    void main() {
      float g = 0.5 + 0.5 * sin(vUv.x * 10.0 + uTime);
      gl_FragColor = vec4(uColor * g, 1.0);
    }`
)
extend({ WaveMaterial })
// <mesh><planeGeometry/><waveMaterial ref={r}/></mesh>  +  useFrame((_,d)=> r.current.uTime += d)
```

## Recetas clave

- **Noise (Perlin/Simplex):** base de casi todo lo orgánico. Multi-octava = sumar seno a frecuencias 6/10/14 para movimiento no repetitivo. Desplaza vértices con `uTime`.
- **Fresnel (glow en bordes):** `pow(1.0 - dot(normal, viewDir), power)` → aura/energía en los cantos. Ideal para hologramas o resaltar un trofeo.
- **Displacement por textura:** mapa de altura mueve vértices → terreno, tela, banderas.
- **Transiciones de imagen líquidas:** distorsionar `uv` con noise + cubic ease para morphs entre texturas.
- **Chromatic aberration / RGB shift:** muestrear R, G, B con offsets distintos → efecto glitch/lente.

## Bandera / tela ondeando (útil para fútbol)

```glsl
// vertex
float wave = sin(position.x * 8.0 + uTime * 3.0) * 0.1 * position.x;
p.z += wave;
```

## TSL / WebGPU (el futuro, 2026)

**TSL (Three.js Shading Language)**: escribes shaders con nodos en **JavaScript** y compila a GLSL (WebGL) o WGSL (WebGPU) desde una sola fuente. Three r183 introdujo `RenderPipeline` (reemplazo de EffectComposer, pensado para WebGPU con fallback a WebGL2). Migrar cuando drei/R3F soporten el renderer WebGPU de forma estable.

## Referencias
- [Maxime Heckel — The Study of Shaders with R3F](https://blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/)
- [Codrops — WebGL shader techniques for transitions](https://tympanus.net/codrops/2025/01/22/webgl-shader-techniques-for-dynamic-image-transitions/)
- [Frontend Masters — Creative coding con WebGL & Shaders](https://frontendmasters.com/courses/webgl-shaders/)
- [The Book of Shaders](https://thebookofshaders.com/)
