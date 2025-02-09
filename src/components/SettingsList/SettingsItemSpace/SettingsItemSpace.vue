<script lang="ts" setup>
import { computed } from 'vue';
import { useDeviceStore } from '../../../store';

const deviceStore = useDeviceStore()
const maxWidth = computed(() => {
  if (deviceStore.isTablet) return '700px'
  return '100%'
})
</script>

<template>
  <div class="item-box flex-col bg-white p-4 dark:bg-gray-600 dark:text-white">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.item-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .75rem;
  max-width: v-bind(maxWidth);
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  cursor: pointer;
  overflow: hidden;
}
</style>