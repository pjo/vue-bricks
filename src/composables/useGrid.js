import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";

const GAP = 16; // px

export function useGrid(words) {
  const columns = ref(1);
  const brickSize = ref(100);

  function calculateGrid() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
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

  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => nextTick(calculateGrid), 100);
  }

  onMounted(() => {
    nextTick(calculateGrid);
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { columns, brickSize, gap: GAP };
}
