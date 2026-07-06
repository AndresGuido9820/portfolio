# 7. Este portafolio — aplicado y hoja de ruta

Cómo se aplican las técnicas de la wiki en **este** repo (React 19 + Vite 8 + Tailwind 4 + R3F 9 + drei 10 + GSAP + Framer Motion).

## Ya aplicado

### La Vitrina / Palmarés — `src/features/palmares/TrophyShowcase.tsx`
Sección de **scroll-storytelling horizontal** con los trofeos reales (Sketchfab).
- **Scroll horizontal:** sección alta (`(N+1)*100vh`) + contenedor `sticky`; `framer-motion useScroll` da el progreso y en `useFrame` el track se desliza en X.
- **Movimiento natural:** `THREE.MathUtils.damp` (amortiguación con delta) en vez de saltos; flotación sutil con `sin(t)`; sin rotación sobre su eje (decisión de diseño).
- **Escala tipo reel:** el trofeo central va a escala 1, los laterales se achican (`lerp`).
- **Iluminación sin CDN:** `Environment` **procedural** con `Lightformer` → reflejos en el metal sin descargar HDRI.
- **Postprocessing:** `EffectComposer` + **Bloom** (`luminanceThreshold` 0.85 → solo florecen los highlights del cromo/oro) + **Vignette** → look premium.
- **Robustez:** `ErrorBoundary` (un fallo del canvas nunca deja la página en blanco) + **Draco local** (`public/draco/`, sin CDN) + `Suspense`.
- **Temática:** usa las variables `--ucl-*` → cambia con la competición activa.

### Assets (Blender → glTF)
- 12 `.glb` en `public/models/` con **Draco** (procedurales <100KB; reales de Sketchfab).
- Correcciones: Champions con **plata cromada** real (los materiales venían mate); Mundial **sin el suelo** que traía el modelo.
- Pipeline documentado en la carpeta de assets del proyecto de Blender.

## Hoja de ruta (siguiente nivel, por orden de impacto/seguridad)

1. **Lenis smooth scroll** (global) — el mayor salto de "sensación premium". Integrar en el layout raíz + sincronizar con GSAP ScrollTrigger. Probar que la sección `sticky` de La Vitrina siga fluida. Ver [01](./01-scroll-and-smoothness.md).
2. **Masked text reveal (SplitText)** en los títulos de sección del hero/secciones — entradas de texto cinematográficas. Ver [04](./04-microinteractions-and-text.md).
3. **Botones magnéticos** en CTAs de contacto + mejorar el `CustomCursor` (crecer sobre interactivos). Ver [04](./04-microinteractions-and-text.md).
4. **Piso reflectante** (`MeshReflectorMaterial`) bajo los trofeos → sensación de vitrina de museo. Ver [02](./02-react-three-fiber.md).
5. **Optimizar glb pesados** (Mundial 6.7MB, estantería 2.5MB) con `gltf-transform` a WebP → carga más rápida. Ver [05](./05-performance.md).
6. **Transiciones entre secciones** (máscara/cortina en scroll) para un recorrido más narrativo. Ver [04](./04-microinteractions-and-text.md).
7. **`prefers-reduced-motion`** — pasada de accesibilidad en todas las animaciones.

## Deudas técnicas detectadas
- `src/features/skills/Skills.tsx`: 3 errores de TypeScript preexistentes (2 variables sin usar + 1 propiedad duplicada) que **rompen `npm run build`**. Pendiente de arreglar.
- El repo **no tiene git** localmente → considerar `git init` para tener control de versiones y poder revertir con seguridad.
