<template>
  <v-app>
    <v-main style="overflow: hidden;">
      <div class="stage">
        <div class="resizable-container">
          <div ref="containerRef" class="grid-wrapper">
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
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Brick from "./components/Brick.vue";
import { words as wordList } from "./data/words.js";
import { useGrid } from "./composables/useGrid.js";

const words = ref(wordList);
const containerRef = ref(null);
const { columns, brickSize, fontSize, gap } = useGrid(words, containerRef);
</script>

<style scoped>
.stage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e0e0e0;
}

.resizable-container {
  position: relative;
  width: 80vw;
  height: 80vh;
  resize: both;
  overflow: hidden;
  border: 2px dashed #999;
  border-radius: 12px;
  background: white;
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
</style>
