<script lang="ts" setup>
import SideBar from './SideBar.vue';
import { useWindowWidthStore } from '../../store';
import { platform } from '@tauri-apps/plugin-os'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  openFn: []
}>()

const windowWidthStore = useWindowWidthStore()
</script>

<template>
  <div 
    v-if="windowWidthStore.width <= 900"
    :class="`fixed h-screen w-screen ${open ? 'left-0' : 'left-[-100%]'} transition-all duration-300`"
    @click.stop="emit('openFn')"
  >
    <div class="h-full w-[70vw] backdrop-blur-md bg-gray-300/70 dark:bg-gray-800/70 shadow-xl rounded-tr-2xl rounded-br-2xl">
      <div v-if="platform() === 'android'" class="h-[36px]"></div>
      <div class="pl-6 pt-4" @click.stop="emit('openFn')">
        <span class="material-icons dark:text-white/70 mr-4"> menu </span>
      </div>
      <side-bar :class="`${platform() === 'android' ? '!h-[calc(100vh-2.5rem-24px)]' : '!h-[calc(100vh-2.5rem)]'}`" />
    </div>
  </div>
</template>