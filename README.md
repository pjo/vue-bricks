# vue-bricks

A Vue 3 app that renders a responsive grid of labeled square "bricks", sized to maximally fill a resizable container.

## Stack

- **Vue 3** (Composition API, `<script setup lang="ts">`)
- **Vite** — dev server and build tool
- **Vuetify 3** — layout primitives (`v-app`, `v-main`, `v-container`)
- **TypeScript**

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## How it works

### Grid sizing algorithm (`src/composables/useGrid.ts`)

For a given word count and container size, the composable iterates every possible row count (1 → N) and for each computes:

```
cols     = ceil(N / rows)
size     = min(availableWidth / cols, availableHeight / rows)
fill     = last-row brick count / cols   (1.0 if last row is complete)
score    = size × fill
```

The layout with the highest score wins. Multiplying by `fill` means a perfectly-filled grid scores at full value, while an incomplete last row is penalised proportionally — balancing maximum brick size against visual balance.

A `ResizeObserver` re-runs the algorithm whenever the container is resized. The composable exposes `columns`, `brickSize`, `fontSize`, and `gap`.

### Responsive behaviour

- **Desktop** (`>= 480 px wide`): CSS grid with `grid-template-columns: repeat(N, Xpx)` and `grid-auto-rows: Xpx`, keeping bricks square.
- **Mobile** (`< 480 px`): vertical scrollable list of non-square bricks.

The breakpoint is tracked by a `ResizeObserver` on the outer container, not the viewport, so it responds to the resizable demo box as well.

### Key files

| Path | Purpose |
|---|---|
| `src/composables/useGrid.ts` | Grid sizing algorithm, ResizeObserver lifecycle |
| `src/App.vue` | Wires composable to CSS grid, renders brick list |
| `src/components/Brick.vue` | Presentational square card, receives a `label` prop |
| `src/data/words.ts` | Static array of Star Wars words/phrases |
| `src/main.ts` | Creates Vue app, registers Vuetify globally |
| `vite.config.ts` | Vite + Vue plugin + Vuetify auto-import |
