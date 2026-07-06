# 1. Scroll y suavidad

El scroll es la línea de tiempo de un sitio moderno. Dos capas: **suavizado** (Lenis) + **orquestación** (GSAP ScrollTrigger o Framer Motion).

## Lenis — smooth scroll físico (~3 kB)

Reemplaza el scroll "saltón" del navegador por momentum con inercia. Es el estándar de los sitios premiados (Darkroom Engineering).

```bash
npm i lenis
```

```ts
import Lenis from 'lenis'

const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.2, smoothWheel: true })
function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

**Integración con GSAP ScrollTrigger** (para que las animaciones sigan el scroll suavizado):

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```

> ⚠️ En React, inicializa Lenis en un `useEffect` del layout raíz y destrúyelo en el cleanup. Con secciones "pinned" que usan `position: sticky` + `framer-motion useScroll`, prueba que el `scrollYProgress` siga fluido (Lenis actualiza `window.scrollY`, así que suele funcionar).

## GSAP ScrollTrigger — orquestación por scroll

- **Reveal escalonado:** dispara timelines cuando un elemento entra en viewport.
- **Pin:** fija una sección mientras el scroll avanza (`pin: true`).
- **Scrub:** liga el progreso de una animación al scroll (`scrub: 1` = con inercia).

```ts
gsap.to('.panel', {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    pin: true,
    scrub: 1,
    end: () => '+=' + document.querySelector('.container').offsetWidth,
  },
})
```

## Scroll horizontal (lo que usamos en La Vitrina)

Patrón pro: **scroll vertical que se traduce en movimiento horizontal** en una sección fijada. Dos formas:

- **DOM/GSAP:** pinear y animar `xPercent` de un track (arriba).
- **3D/R3F (nuestro caso):** sección alta + `sticky`, `framer-motion useScroll` da `scrollYProgress` (0→1), y en `useFrame` movemos el grupo en X con **damping**:

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
useFrame((_, delta) => {
  const target = -progress.get() * (N - 1) * GAP
  group.position.x = THREE.MathUtils.damp(group.position.x, target, 4, delta)
})
```

## Storytelling por scroll

Cada "página" (100vh) revela un capítulo. Marca el índice activo con `useMotionValueEvent` y anima el texto con `AnimatePresence`. Mantén **una pieza protagonista** a la vez.

## Referencias
- [Codrops — Infinite scroll con GSAP + Lenis (2026)](https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/)
- [Codrops — Sticky Grid Scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/)
- [lenis (GitHub)](https://github.com/darkroomengineering/lenis)
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
