# 8. Loop de trabajo y auto-mejora

Esta página describe **cómo se mejora el portafolio de forma continua**. La guía operativa completa (reglas, herramientas, comandos, backlog) vive en [`/AGENTS.md`](../../AGENTS.md) en la raíz del repo — este documento es el "por qué" y el estándar de calidad.

## El ciclo

Cada iteración entrega **una** mejora verificable y registrada:

1. **Observar** — leer `AGENTS.md` + backlog; pedir/mirar un screenshot del estado actual.
2. **Investigar** — si el item lo requiere, buscar técnica + código (Codrops/Osmo/pmndrs) y volcar el aprendizaje en esta wiki.
3. **Respaldar** — `cp archivo.tsx archivo.tsx.bak` (no hay git).
4. **Implementar** — cambio pequeño y aditivo, respetando convenciones.
5. **Verificar** — `npx vite build` + `npx tsc --noEmit`; assets en Blender.
6. **Ajustar** — screenshot de Andrés → afinar timing/tamaño/espacio.
7. **Registrar** — actualizar backlog + CHANGELOG en `AGENTS.md`.

## Por qué iterativo (y no un gran rewrite)

- El sitio está **curado** por Andrés y **no tiene git** local: un rewrite a ciegas puede destruir trabajo que le gusta.
- El agente **no ve el navegador** → la única verificación visual real es el screenshot de Andrés. Iterar corto = feedback rápido = menos riesgo.
- Cada pieza queda **robusta y medida** antes de pasar a la siguiente.

## Estándar de calidad (la "vara")

Una mejora está lista cuando cumple TODO:

- ✅ **Compila:** `vite build` y `tsc` en verde (sin errores nuevos).
- ✅ **Robusta:** 3D con ErrorBoundary + Suspense + Draco local + entorno procedural.
- ✅ **Rápida:** 60fps; solo se monta lo visible; `.glb` livianos; anima `transform`/`opacity`.
- ✅ **Con intención:** aire generoso, easing (nunca lineal), una idea por pantalla.
- ✅ **Accesible:** respeta `prefers-reduced-motion`.
- ✅ **Validada:** Andrés confirmó con captura.
- ✅ **Registrada:** backlog + CHANGELOG actualizados.

## Métricas objetivo

| Métrica | Meta |
|---|---|
| FPS en interacción | 60 |
| Peso por asset `.glb` | < 1 MB (héroes puntuales hasta ~2 MB) |
| Carga total | < 8 s en 4G |
| Triángulos en escena | < 200k |
| Build | siempre verde |

## Cómo lanzar el loop en una sesión

> "Lee `AGENTS.md`, toma el primer item abierto del backlog de mayor impacto, aplícalo siguiendo el ciclo y pídeme una captura para validar."

El agente repite ese ciclo item por item, registrando cada vuelta.
