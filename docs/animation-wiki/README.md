# 🎬 Wiki de Animación Web & 3D

Base de conocimiento para llevar este portafolio (React 19 + Vite + Tailwind 4 + R3F + GSAP + Framer Motion) a nivel **Awwwards / FWA**. Recopila técnicas, patrones y código de ejemplo de los mejores estudios (Codrops, Osmo, Bruno Simon, pmndrs, Maxime Heckel).

> Filosofía: **la calidad no está en el modelo, está en el movimiento y la puesta en escena.** Espacio generoso, timing con easing, una idea por sección, y rendimiento por encima de todo.

## Índice

1. [Scroll y suavidad](./01-scroll-and-smoothness.md) — Lenis, GSAP ScrollTrigger, pinning, scroll horizontal, storytelling.
2. [React Three Fiber avanzado](./02-react-three-fiber.md) — drei, postprocessing/Bloom, materiales (transmission/reflector), instancing, partículas, rendimiento.
3. [Shaders / GLSL](./03-shaders-glsl.md) — vertex/fragment, noise, fresnel, displacement, transiciones, TSL/WebGPU.
4. [Microinteracciones y texto](./04-microinteractions-and-text.md) — SplitText, masked reveals, botones magnéticos, cursor, transiciones de página.
5. [Rendimiento](./05-performance.md) — 60fps, Draco/KTX2, `transform`/`opacity`, `frameloop`, LOD, lazy.
6. [Referencias](./06-references.md) — links curados a estudios, docs, repos y cursos.
7. [Este portafolio](./07-this-portfolio.md) — qué se aplicó aquí y hoja de ruta.
8. [Loop de trabajo](./08-work-loop.md) — cómo se auto-mejora el producto (ver también [`/AGENTS.md`](../../AGENTS.md)).

## Reglas de oro (resumen)

- **Anima solo `transform` y `opacity`** (GPU). Nunca `width`, `top`, `margin` (reflow → jank, mata el CLS).
- **Easing siempre.** Nada lineal. `power3.out`, `expo.out`, o cubic-bezier `[0.22, 1, 0.36, 1]`.
- **Damping en 3D.** En `useFrame` usa `THREE.MathUtils.damp(actual, objetivo, lambda, delta)` en vez de saltar al valor.
- **Una idea por pantalla.** Revelar de a poco; el aire vende más que el relleno.
- **Respeta `prefers-reduced-motion`.** Accesibilidad y buen gusto.
- **Presupuesto:** <200k triángulos, texturas 2K en WebP/KTX2, geometría con Draco, carga <8s en 4G.
