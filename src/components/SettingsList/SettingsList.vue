<script lang="ts" setup>
import { platform} from '@tauri-apps/plugin-os'
</script>

<template>
  <div class="flex-1 h-full w-full overflow-scroll">
    <div class="w-full flex flex-col items-center">
      <slot />
      <div v-if="platform() === 'android'" class="h-[36px]"></div>
    </div>
  </div>
</template>