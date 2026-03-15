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
                gap: gap + 'px',
                '--brick-font-size': fontSize + 'px'
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
          <input type="range" min="1" :max="wordList.length" v-model.number="count" />
          <span>{{ count }}</span>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Brick from "./components/Brick.vue";
import { words as wordList } from "./data/words";
import { useGrid } from "./composables/useGrid";

const count = ref(wordList.length);
const words = computed(() => wordList.slice(0, count.value));
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
