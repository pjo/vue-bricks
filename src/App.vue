<template>
  <v-app>
    <v-main style="overflow: hidden;">
      <div class="stage">
        <div ref="boxRef" class="resizable-container" :class="{ 'is-mobile': isMobile }">

          <!-- Grid layout -->
          <div v-if="!isMobile" ref="containerRef" class="grid-wrapper">
            <div
              class="bricks-grid"
              :style="{
                gridTemplateColumns: `repeat(${columns}, ${brickSize}px)`,
                gridAutoRows: `${brickSize}px`,
                gap: gap + 'px',
                '--brick-font-size': (fontSize / 16) + 'rem'
              }"
            >
              <Brick v-for="(word, i) in words" :key="i" :label="word" />
            </div>
          </div>

          <!-- Mobile: vertical scrollable list -->
          <div v-else class="mobile-list">
            <Brick v-for="(word, i) in words" :key="i" :label="word" :square="false" />
          </div>

        </div>

        <div class="controls">
          <div class="list-toggle">
            <button
              v-for="(val, key) in lists"
              :key="key"
              :class="{ active: activeList === key }"
              @click="activeList = key"
            >{{ val.label }}</button>
          </div>
          <input type="range" min="1" :max="shuffledList.length" v-model.number="count" />
          <span>{{ count }}</span>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import Brick from "./components/Brick.vue";
import { words as starWarsWords, alphabet, dinosaurs, shortWords } from "./data/words";
import { useGrid } from "./composables/useGrid";

type ListKey = "starwars" | "alphabet" | "dinosaurs" | "short";

const lists: Record<ListKey, { label: string; items: string[] }> = {
  starwars: { label: "Star Wars", items: starWarsWords },
  alphabet: { label: "Alphabet", items: alphabet },
  dinosaurs: { label: "Dinosaurs", items: dinosaurs },
  short: { label: "Short", items: shortWords },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const activeList = ref<ListKey>("starwars");
const shuffledList = ref<string[]>(shuffle(lists["starwars"].items));

watch(activeList, (key) => {
  shuffledList.value = shuffle(lists[key].items);
  count.value = Math.min(count.value, lists[key].items.length);
});

const count = ref(9);
const words = computed(() => shuffledList.value.slice(0, count.value));
const containerRef = ref<HTMLElement | null>(null);
const { columns, brickSize, fontSize, gap } = useGrid(words, containerRef);

const boxRef = ref<HTMLElement | null>(null);
const boxWidth = ref(Infinity);
const isMobile = computed(() => boxWidth.value < 480);

let boxObserver: ResizeObserver | undefined;

onMounted(() => {
  boxObserver = new ResizeObserver((entries) => {
    boxWidth.value = entries[0].contentRect.width;
  });
  if (boxRef.value) boxObserver.observe(boxRef.value);
});

onBeforeUnmount(() => {
  boxObserver?.disconnect();
});
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: #555;
  font-size: 0.9rem;
}

.list-toggle {
  display: flex;
  gap: 4px;
}

.list-toggle button {
  padding: 3px 10px;
  border: 1px solid #999;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
  color: #555;
}

.list-toggle button.active {
  background: #555;
  color: white;
  border-color: #555;
}

.stage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e0e0e0;
  overflow: hidden;
}

.resizable-container {
  position: relative;
  width: 80vw;
  height: 80vh;
  max-width: 100%;
  max-height: 100%;
  resize: both;
  overflow: hidden;
  border: 2px dashed #999;
  border-radius: 12px;
  background: white;
}

.resizable-container.is-mobile {
  overflow-y: auto;
  overflow-x: hidden;
}

.grid-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.bricks-grid {
  display: grid;
}

.mobile-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  box-sizing: border-box;
}
</style>
