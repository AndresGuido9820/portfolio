# 5. Rendimiento

Una animación a 30fps con tirones se ve peor que ninguna. El objetivo es **60fps** constantes y carga rápida.

## Regla #1: anima en la GPU
Solo `transform` (translate/scale/rotate) y `opacity`. Estas no disparan *layout/paint*.

❌ `width`, `height`, `top`, `left`, `margin`, `box-shadow` en loop → *reflow* → jank + destroza el CLS.
✅ Usa `transform: translate()` en vez de `top/left`; escala en vez de `width`.

## CSS
- `will-change: transform` en elementos que van a animar (con moderación; quítalo al terminar).
- `content-visibility: auto` para secciones fuera de pantalla.
- Evita `backdrop-filter` en superficies grandes que animan (caro).

## 3D / WebGL
- **Presupuesto:** < 200k triángulos en escena, texturas **2K**, geometría con **Draco**, texturas en **WebP/KTX2**.
- **Draco local** (no CDN): copia `node_modules/three/examples/jsm/libs/draco/gltf/` a `public/draco/` y usa `useGLTF(url, '/draco/')`.
- `frameloop="demand"` si la escena está quieta; invalida al interactuar.
- **Instancing** para objetos repetidos; **LOD** para lejanos; **merge** de mallas estáticas para bajar draw calls.
- **Baking:** hornea luz/detalle a texturas y usa `MeshBasicMaterial` → parece 50k polys, renderiza como 800.
- Muta con `ref` en `useFrame`, nunca `setState` por frame.
- Libera recursos: `geometry.dispose()`, `material.dispose()`, `texture.dispose()` al desmontar (R3F lo hace en mucho, pero clones manuales no).

## Optimizar los .glb (este repo)
Los modelos pesados (Mundial ~6.7MB por texturas) se comprimen con **gltf-transform**:
```bash
npm i -g @gltf-transform/cli
gltf-transform optimize in.glb out.glb --texture-compress webp
# o KTX2: gltf-transform uastc in.glb out.glb
```
Draco baja geometría ~90%; WebP/KTX2 baja texturas 50–70%.

## Carga y percepción
- **Suspense + loader** (drei `<Loader/>`) para no mostrar pantalla vacía.
- **Preload** (`useGLTF.preload`) de lo que viene.
- **Lazy** de secciones 3D pesadas con `React.lazy` + `Suspense`.
- Meta de carga: **< 8s en 4G**.

## Medir
- DevTools → Performance (busca *long tasks* y *layout shift*).
- `stats.js` / drei `<Perf/>` (paquete `r3f-perf`) para FPS y draw calls en dev.

## Referencias
- [Three.js Roadmap — Guía de post-processing 2026](https://threejsroadmap.com/blog/the-complete-guide-to-threejs-post-processing-in-2026)
- [web.dev — Animations guide](https://web.dev/articles/animations-guide)
- [gltf-transform](https://gltf-transform.dev/)
