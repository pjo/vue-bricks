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

This is a Vue 3 + Vite app that renders a responsive grid of labeled "bricks". It uses Vuetify 3 for layout primitives and TypeScript throughout. All `.vue` files use `<script setup lang="ts">`.

### Responsive Grid Logic

The core of the app is `src/composables/useGrid.ts`. It:
- Takes a `ComputedRef<string[]>` and a container `Ref<HTMLElement | null>` as inputs
- Iterates through all possible row/column combinations to find the layout that maximizes brick size, scored as `size × lastRowFill` to balance size against balanced rows
- Sets up a `ResizeObserver` to recalculate on container resize
- Exposes `columns`, `brickSize`, `fontSize`, and `gap` (hardcoded 16px) as reactive values

`App.vue` consumes `useGrid` and sets `grid-template-columns`, `grid-auto-rows`, and `--brick-font-size` on the grid container, then renders `Brick.vue` components from the word list in `src/data/words.ts`.

### Component Hierarchy

```
App.vue           — layout shell (v-app > v-main), owns containerRef and boxRef
  └── Brick.vue   — presentational square card, receives label and square props
```

`Brick.vue` is purely presentational — fixed height via `height: 100%` within a `grid-auto-rows` cell, centered text, no logic.

### Key Files

- `src/composables/useGrid.ts` — grid sizing algorithm, ResizeObserver lifecycle
- `src/App.vue` — wires composable to CSS grid, renders brick list, handles mobile breakpoint
- `src/data/words.ts` — static array of Star Wars words/phrases
- `src/main.ts` — creates Vue app, registers all Vuetify components/directives globally
- `vite.config.ts` — Vite + Vue plugin + Vuetify auto-import
- `tsconfig.json` — TypeScript config (strict mode, bundler module resolution)
