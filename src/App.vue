<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <div class="grid-wrapper">
          <div
            class="bricks-grid"
            :style="{
              gridTemplateColumns: `repeat(${columns}, ${brickSize}px)`,
              gap: gap + 'px'
            }"
          >
            <div v-for="(word, i) in words" :key="i" class="brick">
              {{ word }}
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const words = ref([
  "Jedi",
  "Sith",
  "Lightsaber",
  "Force",
  "Tatooine",
  "Millennium Falcon",
  "Darth Vader",
  "Yoda",
  "Chewbacca",
  "Stormtrooper",
  "Leia",
  "Han Solo",
  "Obi-Wan",
  "Death Star",
  "R2-D2",
]);

const gap = 8; // px
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
    const maxWidth = (vw - (cols - 1) * gap) / cols;
    const maxHeight = (vh - (rows - 1) * gap) / rows;
    const size = Math.floor(Math.min(maxWidth, maxHeight));

    if (size > bestSize) {
      bestSize = size;
      bestCols = cols;
    }
  }

  columns.value = bestCols;
  brickSize.value = bestSize;
}

// Debounced resize
let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    nextTick(() => calculateGrid());
  }, 100);
}

onMounted(() => {
  nextTick(() => calculateGrid());
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.grid-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.bricks-grid {
  display: grid;
}

.brick {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* set by JS gridTemplateColumns */
  aspect-ratio: 1 / 1; /* square */
  background: #f2f2f2;
  border-radius: 8px;
  padding: 0.5rem; /* uses rem for accessibility */
  text-align: center;
  font-size: 1.5rem; /* accessible, scales with browser zoom */
  line-height: 1.2;
  white-space: normal; /* allow wrapping */
  word-break: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
}
</style>
