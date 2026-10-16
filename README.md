# Serpens

A public room that teaches Python. The first page runs from the top of a script through names, shared objects, and exceptions. `/further` continues with modules, threads, and async. Checks are graded in the browser. Try it opens Python Tutor with that program.

The product name is Serpens.

## Layout

- `src/app` — the short lessons, `/further`, the language, vision, architecture, releases
- `content/lessons.ts` — the first page
- `content/further.ts` — duck typing through async
- `docs` — vision and architecture, rendered in summary on those pages
- `public/hero-bg.jpg` — a python

## Local checks

```sh
npm install
npm run dev
```

`npm run build` writes a static site to `out/`.

## Deploy

`npm run build` writes a static site to `out/`. GitHub Pages can serve that export from `main` through `.github/workflows/pages.yml`. The build does not set `BASE_PATH`, so styles and the photograph load from the site root. A local build does not set it either.

## Docs

A change under `src/` or `content/` also updates `docs/VISION_AND_REQUIREMENTS.md`, `docs/ARCHITECTURE_AND_DESIGN.md`, and `CHANGELOG.md`. The vision and architecture pages render the Summary of those files. The releases page renders the changelog. The architecture pictures and the Mermaid diagrams change together.
