import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";

const GAP = 16; // px

export function useGrid(words, containerRef) {
  const columns = ref(1);
  const brickSize = ref(100);

  function calculateGrid() {
    const el = containerRef.value;
    if (!el) return;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    const N = words.value.length;

    let bestSize = 0;
    let bestCols = 1;

    for (let rows = 1; rows <= N; rows++) {
      const cols = Math.ceil(N / rows);
      const maxWidth = (vw - (cols - 1) * GAP) / cols;
      const maxHeight = (vh - (rows - 1) * GAP) / rows;
      const size = Math.floor(Math.min(maxWidth, maxHeight));

      if (size > bestSize) {
        bestSize = size;
        bestCols = cols;
      }
    }

    columns.value = bestCols;
    brickSize.value = bestSize;
  }

  let observer;

  onMounted(() => {
    nextTick(() => {
      calculateGrid();
      observer = new ResizeObserver(() => nextTick(calculateGrid));
      if (containerRef.value) observer.observe(containerRef.value);
    });
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { columns, brickSize, gap: GAP };
}
