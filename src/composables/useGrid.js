import { ref, watch, onBeforeUnmount } from "vue";

const GAP = 16; // px

export function useGrid(words, containerRef) {
  const columns = ref(1);
  const brickSize = ref(100);
  const fontSize = ref(14);

  function calculateGrid(vw, vh) {
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
      const score = size * (0.8 + 0.2 * lastRowFill);

      if (score > bestScore) {
        bestScore = score;
        bestSize = size;
        bestCols = cols;
      }
    }

    columns.value = bestCols;
    brickSize.value = bestSize;
    fontSize.value = Math.max(10, Math.floor(bestSize * 0.13));
  }

  let observer;

  watch(() => words.value.length, () => calculateGrid());

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
