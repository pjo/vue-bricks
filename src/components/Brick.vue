<template>
  <div class="brick">{{ label }}</div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.brick {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f2f2f2;
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  font-size: var(--brick-font-size, 1rem);
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
}
</style>
