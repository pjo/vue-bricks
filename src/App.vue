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
            <Brick v-for="(word, i) in words" :key="i" :label="word" />
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Brick from "./components/Brick.vue";
import { words as wordList } from "./data/words.js";
import { useGrid } from "./composables/useGrid.js";

const words = ref(wordList);
const { columns, brickSize, gap } = useGrid(words);
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
</style>
