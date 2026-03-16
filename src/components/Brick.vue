<template>
  <div class="brick" :class="{ 'brick--square': square }">{{ label }}</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string;
  square?: boolean;
}>(), {
  square: true,
});
</script>

<style scoped>
.brick {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: max(4px, 8%);
  background: #f2f2f2;
  border-radius: 8px;
  text-align: center;
  font-size: var(--brick-font-size, 1rem);
  line-height: 1.2;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
  box-sizing: border-box;
  min-height: 3.5rem;
}

.brick--square {
  height: 100%;
  min-height: unset;
  overflow: hidden;
}
</style>
