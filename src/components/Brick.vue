<template>
  <div class="brick" :class="{ 'brick--square': square }">{{ label }}</div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  square: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.brick {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: #f2f2f2;
  border-radius: 8px;
  text-align: center;
  font-size: var(--brick-font-size, 1rem);
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
  min-height: 3.5rem;
}

.brick--square {
  aspect-ratio: 1 / 1;
  min-height: unset;
}
</style>
