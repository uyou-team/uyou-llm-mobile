<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useCateStore, useChatStore, useDeviceStore } from '../../store';
import { platform } from '@tauri-apps/plugin-os'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const cateStore = useCateStore()
const chatStore = useChatStore()
const deviceStore = useDeviceStore()

function removeCate(id: string) {
  cateStore.removeCate(id)
  chatStore.removeChat(id)
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div v-if="platform() === 'android' && deviceStore.isTablet" class="h-[36px]"></div>
    <div class="flex-1 p-2 overflow-y-scroll">
      <div>
        <div 
          :class="`flex p-4 items-center w-full ${route.name === 'home' ? 'bg-black/20' : ''} active:bg-black/20 dark:active:bg-white/20 rounded-lg`"
          @click="router.push('/')"
        >
          <span class="material-icons dark:text-white/70 mr-4"> add_comment </span>
          <span class="font-bold dark:text-white/70">{{ t('addChat') }}</span>
        </div>
        <div 
          v-for="cate in cateStore.cateList" 
          :key="cate.id"
          @click="router.push(`/chat?id=${cate.id}`)"
          :class="`flex justify-between p-4 items-center w-full ${route.query.id === cate.id ? 'bg-black/20' : ''} active:bg-black/20 dark:active:bg-white/20 rounded-lg`"
        >
          <div class="flex items-center">
            <span class="material-icons dark:text-white/70 mr-4"> message </span>
            <span class="font-bold dark:text-white/70">{{ cate.name }}</span>
          </div>
          <div class="flex items-center justify-center" @click.stop="removeCate(cate.id)">
            <span class="material-icons dark:text-white/70 mr-4"> delete </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-6 px-2">
      <div 
        :class="`flex p-4 items-center w-full ${route.name === 'settings' || route.query.from === 'settings' ? 'bg-black/20' : ''} active:bg-black/20 dark:active:bg-white/20 rounded-lg`"
        @click="router.push('/settings')"
      >
        <span class="material-icons dark:text-white/70 mr-4"> settings </span>
        <span class="font-bold dark:text-white/70">{{ t('settings') }}</span>
      </div>
    </div>
    <div v-if="platform() === 'android'" class="h-[26px]"></div>
  </div>
</template>