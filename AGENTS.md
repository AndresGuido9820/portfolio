# AGENTS.md — Guía operativa del portafolio

Instrucciones para cualquier agente de IA (Claude Code u otro) que trabaje en este repo. Define **cómo trabajar**, el **loop de auto-mejora**, las **herramientas** disponibles y las **reglas** que no se rompen.

> Objetivo del producto: portafolio personal de **Andrés Felipe Guido Montoya** (Cloud & Software Engineer, Medellín) con **temática de fútbol** (Champions/Libertadores/Premier), nivel **Awwwards**. La temática deportiva es la capa visual; el contenido vende experiencia técnica real.

---

## 0. Stack y arranque

- **React 19 + TypeScript + Vite 8 + Tailwind 4**, `@react-three/fiber@9`, `@react-three/drei@10`, `@react-three/postprocessing`, `three`, `gsap`, `framer-motion`, `lucide-react`.
- Dev: `npm run dev` → http://localhost:5173
- Build: `npm run build` (corre `tsc -b` + `vite build`)
- Idioma del sitio: ES/EN (prop `language`), arranca en **español**.

## 1. Reglas de oro (NO romper)

1. **No hay git local.** Antes de editar un archivo curado, hacer copia `.bak` (`cp X X.bak`). Considerar `git init` como mejora.
2. **Nunca dejar el build roto.** Tras cada cambio: `npx vite build` debe pasar. Type-check con `npx tsc --noEmit -p tsconfig.app.json`.
3. **Cambios aditivos y pequeños.** Preferir componentes nuevos a reescribir los de Andrés. Un cambio → una verificación.
4. **Mantener los assets.** Los `.glb` de `public/models/` son trabajo hecho; no borrarlos sin pedirlo.
5. **No puedo ver el navegador.** La verificación visual la hace Andrés con capturas. Tras cambios visuales, **pedir screenshot** y ajustar. El build/tsc solo prueban que compila, no que se ve bien.
6. **Robustez 3D:** todo canvas con `ErrorBoundary`, `Suspense`, Draco **local** (`/public/draco/`), entorno **procedural** (sin CDN). Un fallo WebGL nunca debe dejar la página en blanco.
7. **Rendimiento primero:** montar solo lo visible, animar `transform`/`opacity`, `damp` en `useFrame`. Ver [wiki/05](./docs/animation-wiki/05-performance.md).
8. **Responder en español.** Confirmar antes de acciones difíciles de revertir.

## 2. El LOOP de auto-mejora

Ciclo corto e iterativo. Cada vuelta entrega **una** mejora verificable:

```
┌─ 1. OBSERVAR ──────────────────────────────────────────────┐
│   Leer AGENTS.md + backlog. Pedir/mirar screenshot actual.  │
│   Identificar el item de mayor impacto/seguridad.           │
├─ 2. INVESTIGAR (si aplica) ────────────────────────────────┤
│   WebSearch/WebFetch de técnicas + código (Codrops, Osmo,   │
│   pmndrs). Volcar aprendizaje en docs/animation-wiki/.      │
├─ 3. RESPALDAR ─────────────────────────────────────────────┤
│   cp archivo.tsx archivo.tsx.bak (no hay git).              │
├─ 4. IMPLEMENTAR ───────────────────────────────────────────┤
│   Cambio pequeño y aditivo. Seguir convenciones del repo.   │
├─ 5. VERIFICAR ─────────────────────────────────────────────┤
│   npx vite build  +  npx tsc --noEmit -p tsconfig.app.json  │
│   Assets 3D: revisar en Blender (MCP) y/o screenshot user.  │
├─ 6. MEDIR/AJUSTAR ─────────────────────────────────────────┤
│   Pedir screenshot a Andrés. Afinar timing/tamaño/espacio.  │
├─ 7. REGISTRAR ─────────────────────────────────────────────┤
│   Actualizar backlog (§5) y CHANGELOG (§6). Volver a 1.     │
└────────────────────────────────────────────────────────────┘
```

**Definición de "hecho" por iteración:** compila (build+tsc verdes) · robusto (ErrorBoundary/Suspense) · sin regресión de peso · validado visualmente por Andrés · registrado en el CHANGELOG.

## 3. Herramientas disponibles

| Herramienta | Para qué | Cómo |
|---|---|---|
| **Blender MCP** | Crear/editar/exportar assets 3D | Blender abierto + panel BlenderMCP conectado (puerto 9876). `execute_blender_code`, `get_viewport_screenshot`, PolyHaven, Sketchfab, Hyper3D. |
| **gltf-transform** | Optimizar `.glb` (WebP, resize, draco, simplify) | `npx --yes @gltf-transform/cli <cmd>` (ver §4). |
| **Vite build** | Verificar bundle | `npx vite build` |
| **tsc** | Type-check | `npx tsc --noEmit -p tsconfig.app.json` |
| **WebSearch / WebFetch** | Investigar técnicas y leer código de ejemplo | Codrops, Awwwards, Osmo, pmndrs docs. |
| **Wiki** | Conocimiento de animación | `docs/animation-wiki/` (7+ páginas). |
| **Draco local** | Decodificar `.glb` sin CDN | `public/draco/` + `useGLTF(url, '/draco/')`. |

## 4. Recetas de comandos

```bash
# Verificar
npx vite build
npx tsc --noEmit -p tsconfig.app.json | grep -v Skills.tsx   # (errores nuevos = los tuyos)

# Optimizar un .glb pesado (texturas): resize 1K → webp → re-draco
npx --yes @gltf-transform/cli resize in.glb /tmp/a.glb --width 1024 --height 1024
npx --yes @gltf-transform/cli webp  /tmp/a.glb /tmp/b.glb --quality 75
npx --yes @gltf-transform/cli draco /tmp/b.glb out.glb        # re-comprimir geometría
npx --yes @gltf-transform/cli inspect out.glb                 # ver texturas/polys

# Copiar Draco decoder local (una vez)
cp node_modules/three/examples/jsm/libs/draco/gltf/* public/draco/
```

Assets en Blender: geometría pesada → `Decimate`; re-export con `export_draco_mesh_compression_enable=True`, `export_yup=True`. Photoscans traen suelo/ruido → borrar mallas planas y cortar verts de baja altura.

## 5. Backlog (prioridad: impacto × seguridad)

- [x] La Vitrina: carrusel horizontal + texto con peso + solo activo montado + Bloom.
- [x] Fix Copa del Mundo (CG limpia, 9.7MB→~1MB).
- [x] Renumeración de secciones + Palmarés en el navbar.
- [ ] **Lenis** smooth scroll global (sincronizar con la sección sticky/carrusel). Mayor salto de "premium".
- [ ] **SplitText** masked reveal en títulos de sección (hero incluido).
- [ ] **Botones magnéticos** en CTAs de contacto + mejorar `CustomCursor`.
- [ ] **MeshReflectorMaterial** (piso reflectante) bajo los trofeos.
- [ ] Optimizar `estanteria.glb` (2.5MB) si se usa en pantalla.
- [ ] Pasada `prefers-reduced-motion` en todas las animaciones.
- [ ] Arreglar 3 errores TS preexistentes en `src/features/skills/Skills.tsx` (rompen `npm run build`).
- [ ] `git init` para control de versiones.
- [ ] Revisión responsive/mobile sección por sección.

## 6. CHANGELOG

- **2026-07-01** — Sección Palmarés (carrusel 3D horizontal) + Bloom/Vignette; Copa del Mundo reemplazada por modelo CG y optimizada; renumeración de secciones y link "Vitrina" en navbar; wiki de animación creada.

## 7. Mapa de archivos

- `src/App.tsx` — orquesta secciones, idioma, competición activa, audio.
- `src/features/<seccion>/` — hero, about, experience, **palmares** (vitrina 3D), projects, formation, skills, contact.
- `src/shared/components/Navbar.tsx` — navegación (NAV_LINKS), idioma, audio, competición.
- `src/data/portfolio.data.ts` — datos personales/experiencia/proyectos/skills.
- `src/data/competitions.ts` — temas por competición (variables `--ucl-*`).
- `public/models/*.glb` — assets 3D (Draco). `public/draco/` — decoder local.
- `docs/animation-wiki/` — base de conocimiento.
