# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

No test runner is configured.

## Architecture

This is a Vue 3 + Vite app that renders a responsive grid of labeled "bricks". It uses Vuetify 3 for layout primitives and vanilla JavaScript (no TypeScript).

### Responsive Grid Logic

The core of the app is `src/composables/useGrid.js`. It:
- Takes a word count and a container `ref` as inputs
- Iterates through all possible row/column combinations to find the layout that maximizes brick size
- Sets up a `ResizeObserver` to recalculate on container resize
- Exposes `columns`, `brickSize`, and `gap` (hardcoded 16px) as reactive values

`App.vue` consumes `useGrid` and binds `columns` and `brickSize` directly to CSS custom properties on the grid container, then renders `Brick.vue` components from the word list in `src/data/words.js`.

### Component Hierarchy

```
App.vue           — layout shell (v-app > v-main > v-container), owns containerRef
  └── Brick.vue   — presentational square card, receives a label prop
```

`Brick.vue` is purely presentational — square aspect ratio, centered text, no logic.

### Key Files

- `src/composables/useGrid.js` — grid sizing algorithm, ResizeObserver lifecycle
- `src/App.vue` — wires composable to CSS grid, renders brick list
- `src/data/words.js` — static array of 20 Star Wars words/phrases
- `src/main.js` — creates Vue app, registers all Vuetify components/directives globally
- `vite.config.js` — Vite + Vue plugin + Vuetify auto-import
