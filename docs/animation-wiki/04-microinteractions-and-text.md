# 4. Microinteracciones y texto

Los detalles pequeños son los que hacen sentir un sitio "caro". Referencia obligada: **Osmo** (35+ Awwwards SOTD).

## Text reveal enmascarado (SplitText)

El efecto estrella: el texto sube desde detrás de una máscara, carácter/palabra/línea con stagger.

```ts
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'   // plugin oficial (ahora gratis)
gsap.registerPlugin(SplitText)

const split = new SplitText('.title', { type: 'lines,words', mask: 'lines' })
gsap.from(split.words, {
  yPercent: 120,
  duration: 1,
  ease: 'power4.out',
  stagger: 0.04,
  scrollTrigger: { trigger: '.title', start: 'top 85%' },
})
```

Alternativa sin GSAP: **Framer Motion** con `staggerChildren` y variantes, envolviendo cada palabra en un `<span>` con `overflow:hidden`.

## Botón magnético

El botón "persigue" sutilmente al cursor dentro de un radio.

```ts
el.addEventListener('mousemove', (e) => {
  const r = el.getBoundingClientRect()
  const x = e.clientX - (r.left + r.width / 2)
  const y = e.clientY - (r.top + r.height / 2)
  gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' })
})
el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' }))
```

## Cursor personalizado

Un `div` que sigue al cursor con lerp; crece/cambia sobre elementos interactivos (`mix-blend-mode: difference` para contraste automático). Este repo ya tiene `CustomCursor`.

## Hover en tarjetas (3D tilt)

`transform: rotateX/rotateY` según posición del mouse + `perspective` en el padre. Sutil (≤ 8°) y con `transition` suave. Anima solo `transform`.

## Transiciones de página / sección

- **Máscara SVG / cortina:** un overlay que barre la pantalla entre vistas (Codrops "SVG mask transitions").
- **FLIP (GSAP):** un thumbnail se expande a hero sin jank midiendo estados inicial/final.
- **View Transitions API:** transición nativa del navegador entre estados del DOM (progresiva).

## Accesibilidad
Envuelve todo en:
```ts
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
if (reduce) { /* estados finales sin animación */ }
```

## Referencias
- [Osmo — colección de componentes](https://www.osmo.supply/collection) · [Masked Text Reveal](https://osmo-masked-text-reveal-splittext.webflow.io/)
- [Awwwards — UI Animation & Microinteractions](https://www.awwwards.com/awwwards/collections/animation/)
- [Codrops — SVG Mask Transitions on Scroll](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/)
- [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/)
