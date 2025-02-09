<script lang="ts" setup>
import { computed } from 'vue';
import { useDeviceStore } from '../../../store';

const { title = 'title' } = defineProps<{
  title?: string
}>()

const deviceStore = useDeviceStore()
const maxWidth = computed(() => {
  if (deviceStore.isTablet) return '700px'
  return '100%'
})
</script>

<template>
  <div class="item-box flex-col dark:text-white font-bold">
    <span>{{ title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.item-box {
  max-width: v-bind(maxWidth);
  padding-left: 1rem;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  cursor: pointer;
}
</style>