<script lang="ts" setup>
import { computed } from 'vue';
import { useDeviceStore } from '../../../store';

const { title = 'title', showArrow = true } = defineProps<{
  title?: string
  showArrow?: boolean
  icon?: string
  customArrow?: string
}>()

const deviceStore = useDeviceStore()
const maxWidth = computed(() => {
  if (deviceStore.isTablet) return '700px'
  return '100%'
})
</script>

<template>
  <div class="item bg-white active:!bg-gray-100 dark:bg-gray-600 dark:text-white dark:active:!bg-gray-700">
    <div>
      <span v-if="icon" class="material-icons">{{ icon }}</span>
      <span>{{ title }}</span>
    </div>
    <div v-if="showArrow" class="flex items-center">
      <span v-if="!customArrow" class="material-icons"> chevron_right </span>
      <span v-else class="material-icons"> {{ customArrow }} </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .75rem;
  max-width: v-bind(maxWidth);
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>