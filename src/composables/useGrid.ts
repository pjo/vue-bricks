import { ref, watch, onBeforeUnmount } from "vue";
import type { ComputedRef, Ref } from "vue";

const GAP = 16; // px

export function useGrid(
  words: ComputedRef<string[]>,
  containerRef: Ref<HTMLElement | null>
) {
  const columns = ref(1);
  const brickSize = ref(100);
  const fontSize = ref(14);

  function calculateGrid(vw?: number, vh?: number) {
    const el = containerRef.value;
    if (!el) return;
    if (vw === undefined) vw = el.clientWidth;
    if (vh === undefined) vh = el.clientHeight;
    const N = words.value.length;

    let bestScore = 0;
    let bestSize = 0;
    let bestCols = 1;

    for (let rows = 1; rows <= N; rows++) {
      const cols = Math.ceil(N / rows);
      const maxWidth = (vw - (cols - 1) * GAP) / cols;
      const maxHeight = (vh - (rows - 1) * GAP) / rows;
      const size = Math.floor(Math.min(maxWidth, maxHeight));

      const lastRowFill = N % cols === 0 ? 1 : (N % cols) / cols;
      const score = size * lastRowFill;

      if (score > bestScore) {
        bestScore = score;
        bestSize = size;
        bestCols = cols;
      }
    }

    columns.value = bestCols;
    brickSize.value = bestSize;
    const singleChar = words.value.every(w => w.length === 1);
    const fontScale = singleChar ? 0.45 : 0.13;
    fontSize.value = Math.max(10, Math.floor(bestSize * fontScale));
  }

  let observer: ResizeObserver | undefined;

  watch(() => words.value, () => calculateGrid(), { deep: false });

  watch(containerRef, (el) => {
    observer?.disconnect();
    if (!el) return;
    calculateGrid();
    observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      calculateGrid(width, height);
    });
    observer.observe(el);
  }, { flush: "post" });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { columns, brickSize, fontSize, gap: GAP };
}
