# vue-bricks

A Vue 3 app that renders a responsive grid of labeled square "bricks", sized to maximally fill a resizable container. Supports multiple switchable word lists with automatic font scaling.

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

### Font scaling

Font size is derived from the brick size and the longest single token (space-separated word) in the active list:

```
fontScale = min(0.45, 1.3 / maxTokenLength)
fontSize  = brickSize × fontScale
```

The linear relationship ensures the longest token always fits on one line within the brick. The 0.45 cap prevents single-character labels from becoming oversized.

### Word lists

Four built-in lists are included to demonstrate the scaling across different label lengths:

| List | Max token length | Approx. font scale |
|---|---|---|
| Alphabet | 1 | 0.45 |
| Short words | 4 | 0.33 |
| Star Wars | 12 | 0.11 |
| Dinosaurs | 18 | 0.07 |

The active list is selected via toggle buttons in the controls bar. The order of items is randomised on page load and whenever the list is switched. A range slider controls how many items are displayed.

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
| `src/data/words.ts` | Word list exports: Star Wars phrases, alphabet, dinosaur names, short common words |
| `src/main.ts` | Creates Vue app, registers Vuetify globally |
| `vite.config.ts` | Vite + Vue plugin + Vuetify auto-import |
