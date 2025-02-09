<script setup lang="ts" generic="T">
import { ref } from 'vue';
import { platform } from '@tauri-apps/plugin-os'

const { title = 'title', leftIcon = 'arrow_back', rightIcon = 'info', useTitleMenu } = defineProps<{
  title: string
  leftIconShow?: boolean
  rightIconShow?: boolean
  leftIcon?: string
  rightIcon?: string
  menuList?: T[]
  useTitleMenu?: boolean
}>()

const emit = defineEmits<{
  leftFn: []
  rightFn: []
  menuFn: [T]
}>()

const showTitleMenuV = ref(false)

function showTitleMenu() {
  if (!useTitleMenu) return
  showTitleMenuV.value = !showTitleMenuV.value  
}
</script>

<template>
  <div v-if="platform() === 'android'" class="h-[36px]"></div>
  <div class="flex justify-between px-3 py-4 items-center drag">
    <template v-if="true">
      <div
        v-if="leftIconShow"
        class="active:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl no-drag"
        @click="emit('leftFn')"
      >
        <span class="material-icons dark:text-white/70"> {{ leftIcon }} </span>
      </div>
      <div v-else class="active:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl no-drag opacity-0">
        <span class="material-icons dark:text-white/70"> {{ leftIcon }} </span>
      </div>
    </template>
    <div class="m-auto flex flex-col items-center" @click="showTitleMenu">
      <span class="dark:text-white/70 font-bold">{{ title }}</span>
      <div v-if="showTitleMenuV" class="absolute top-14 bg-white dark:bg-gray-600 w-auto rounded-xl p-4 shadow-xl">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          class="p-2 active:bg-black/10 dark:text-white"
          @click="emit('menuFn', item)"
        >
          {{ item.model }}
        </div>
      </div>
    </div>
    <template v-if="true">
      <div
        v-if="rightIconShow"
        class="active:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl no-drag"
        @click="emit('rightFn')"
      >
        <span class="material-icons dark:text-white/70"> {{ rightIcon }} </span>
      </div>
      <div v-else class="active:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl no-drag opacity-0">
        <span class="material-icons dark:text-white/70"> {{ rightIcon }} </span>
      </div>
    </template>
  </div>
</template>
