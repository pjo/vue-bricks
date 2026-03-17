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

`App.vue` consumes `useGrid` and sets `grid-template-columns`, `grid-auto-rows`, and `--brick-font-size` (in `rem`, converted from the px value via `fontSize / 16`) on the grid container, then renders `Brick.vue` components from the active word list.

### Word Lists & Controls

`src/data/words.ts` exports four named arrays:
- `words` — Star Wars characters and terms
- `dinosaurs` — dinosaur names (longer words)
- `shortWords` — short common English words
- `alphabet` — Swedish QWERTY keyboard layout (single characters including Å, Ö, Ä)

`App.vue` exposes a control bar beneath the grid with:
- **List toggle buttons** — switch between the four word lists; switching reshuffles the list
- **Count slider** — adjusts how many words (1 to full list length) are shown; capped when switching to a shorter list

The active word list is shuffled on selection and sliced to `count` to produce the displayed words.

### Component Hierarchy

```
App.vue           — layout shell (v-app > v-main), owns containerRef and boxRef
  └── Brick.vue   — presentational square card, receives label and square props
```

`Brick.vue` is purely presentational — fixed height via `height: 100%` within a `grid-auto-rows` cell, centered text, no logic.

### Key Files

- `src/composables/useGrid.ts` — grid sizing algorithm, ResizeObserver lifecycle
- `src/App.vue` — wires composable to CSS grid, renders brick list, list/count controls, handles mobile breakpoint
- `src/data/words.ts` — four named word list exports: `words` (Star Wars), `dinosaurs`, `shortWords`, `alphabet`
- `src/main.ts` — creates Vue app, registers all Vuetify components/directives globally
- `vite.config.ts` — Vite + Vue plugin + Vuetify auto-import
- `tsconfig.json` — TypeScript config (strict mode, bundler module resolution)
