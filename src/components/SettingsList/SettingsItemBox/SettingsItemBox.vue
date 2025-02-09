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
  <div class="item-box flex-col bg-white dark:bg-gray-600 dark:text-white">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.item-box {
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .75rem;
  max-width: v-bind(maxWidth);
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  cursor: pointer;
  overflow: hidden;

  &:deep(.item) {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
  }

  &:deep(.item):last-child {
    border-bottom: none;
  }
}
</style>