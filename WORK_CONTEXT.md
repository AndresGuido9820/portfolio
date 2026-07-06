# Portfolio Work Context

Ultima sesion: 2026-05-14

## Objetivo del portfolio

Portfolio personal con tematica de futbol, estilo Champions/Libertadores, enfocado en presentar a Andres como ingeniero de nube y software con experiencia en IA, IoT, automatizacion, backend, frontend y herramientas open source.

El sitio debe sentirse visualmente fuerte, pero seguir siendo profesional. La tematica deportiva es la capa visual; el contenido debe vender experiencia tecnica real.

## Decisiones tomadas

- El idioma principal arranca en espanol.
- El boton `EN/ES` debe traducir la pagina completa, no solo el navbar.
- En espanol el titulo principal debe ser `Ingeniero de Nube y Software`.
- La card del hero usa `public/andres-card-clean.png`, no la version con fondo tipo checkerboard.
- La card debe adaptarse visualmente a la competencia activa.
- Se quitaron los experimentos de R3F/frosted glass que no encajaban con la composicion.
- Los proyectos privados/profesionales se presentan como casos de alto nivel, sin link a repo y sin detalles internos.
- Lo especifico se deja solo para repos publicos verificables.
- No incluir juegos en proyectos destacados.

## Proyectos privados/profesionales

Estos se muestran sin GitHub y con lenguaje general:

- `IoT Operations Platform`
- `AI Monitoring System`
- `Data Review Assistant`

Regla para futuros cambios: no mencionar nombres internos, infraestructura exacta, cantidades internas, clientes, datos sensibles ni detalles que parezcan filtracion. Hablar de problema, enfoque general, tipo de impacto y capacidades.

## Repos publicos seleccionados

Repos publicos que si tienen implementacion visible y sirven para portafolio:

- `awscope`: CLI AWS con docs, tests, CI y arquitectura por adaptadores.
- `git-health`: CLI para auditar salud open source de repositorios.
- `VerdeListo`: full stack NestJS + React + MongoDB.
- `Shop-ecomerce`: Next.js + MongoDB + filtros + precios especiales.
- `Microservicios SIA`: microservicios con Docker, PostgreSQL y API Gateway.
- `Optimizacion Metaheuristica`: notebooks, scripts y reporte tecnico.

Repos descartados por ahora:

- `Dbz-game-`: no mostrar juegos.
- `F-tbol-Data`: existe, pero por ahora es menos fuerte que otros repos.
- `GithubMarker`: existe, pero no queda en la seleccion principal.

## Archivos importantes

- `src/data/portfolio.data.ts`: datos personales, experiencia, proyectos y skills.
- `src/App.tsx`: estado global de idioma, competencia activa y audio.
- `src/shared/components/Navbar.tsx`: navbar, selector de idioma, audio y competencia.
- `src/features/hero/*`: hero, card principal y textos iniciales.
- `src/features/about/About.tsx`: bloque sobre mi.
- `src/features/experience/Experience.tsx`: timeline profesional.
- `src/features/projects/*`: grid de proyectos y cards.
- `src/features/formation/Formation.tsx`: alineacion de stack.
- `src/features/contact/Contact.tsx`: contacto.

## Estado tecnico

Comandos verificados:

```bash
npm run build
npm run lint
```

Resultado:

- Build pasa.
- Lint pasa con un warning existente en `src/shared/hooks/useGsapReveal.ts` sobre dependencia `options` en `useEffect`.

## Pendientes recomendados

1. Revisar visualmente seccion por seccion en desktop y mobile.
2. Terminar traducciones de cualquier texto menor que quede mezclado.
3. Ajustar copy de experiencia para que no parezca LinkedIn, sino portfolio tecnico.
4. Mejorar cards de proyectos publicos con una mini metrica visible: `CLI`, `Tests`, `CI`, `Full stack`, etc.
5. Agregar screenshots o preview visual a proyectos publicos fuertes si hay tiempo.
6. Revisar performance y responsive de la card principal.
7. Corregir el warning de `useGsapReveal.ts` si empieza a molestar en CI.

## Como correr

```bash
cd /home/andres/Github/portfolio
npm run dev -- --host 0.0.0.0 --port 5174
```

URL local usada:

```txt
http://localhost:5174/
```
