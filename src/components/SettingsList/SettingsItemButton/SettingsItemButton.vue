<script lang="ts" setup>
import { computed } from 'vue';
import { useDeviceStore } from '../../../store';

type Type = 'default' | 'parmary' | 'danger' | 'success' | 'warning'

const { type = 'default' } = defineProps<{
  type?: Type
}>()

function getColor() {
  switch (type) {
    case 'parmary':
      return 'bg-blue-500 text-white active:bg-blue-600 dark:bg-blue-600 dark:text-white dark:active:bg-blue-700'
    case 'danger':
      return 'bg-red-500 text-white active:bg-red-600 dark:bg-red-600 dark:text-white dark:active:bg-red-700'
    case 'success':
      return 'bg-green-500 text-white active:bg-green-600 dark:bg-green-600 dark:text-white dark:active:bg-green-700'
    case 'warning':
      return 'bg-yellow-500 text-white active:bg-yellow-600 dark:bg-yellow-600 dark:text-white dark:active:bg-yellow-700'
    default:
      return 'bg-white text-black active:bg-gray-200 dark:bg-gray-600 dark:text-white dark:active:bg-gray-700'
  }
}

const deviceStore = useDeviceStore()
const maxWidth = computed(() => {
  if (deviceStore.isTablet) return '700px'
  return '100%'
})
</script>

<template>
  <div :class="`item-button flex-col ${getColor()} p-4`">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.item-button {
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