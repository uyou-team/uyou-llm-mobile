<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useCateStore, useChatStore } from '../../store';

const { t } = useI18n()
const router = useRouter()

const cateStore = useCateStore()
const chatStore = useChatStore()

function removeCate(id: string) {
  cateStore.removeCate(id)
  chatStore.removeChat(id)
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex-1 p-2">
      <div 
        class="flex p-4 items-center w-full active:bg-black/20 dark:active:bg-white/20 rounded-lg"
        @click="router.push('/')"
      >
        <span class="material-icons dark:text-white/70 mr-4"> add_comment </span>
        <span class="font-bold dark:text-white/70">{{ t('addChat') }}</span>
      </div>
      <div 
        v-for="cate in cateStore.cateList" 
        :key="cate.id"
        @click="router.push(`/chat?id=${cate.id}`)"
        class="flex justify-between p-4 items-center w-full active:bg-black/20 dark:active:bg-white/20 rounded-lg"
      >
        <div class="flex items-center">
          <span class="material-icons dark:text-white/70 mr-4"> message </span>
          <span class="font-bold dark:text-white/70">{{ cate.name }}</span>
        </div>
        <div @click.stop="removeCate(cate.id)">
          <span class="material-icons dark:text-white/70 mr-4"> delete </span>
        </div>
      </div>
    </div>
    <div class="mb-6 px-2">
      <div 
        class="flex p-4 items-center w-full active:bg-black/20 dark:active:bg-white/20 rounded-lg"
        @click="router.push('/settings')"
      >
        <span class="material-icons dark:text-white/70 mr-4"> settings </span>
        <span class="font-bold dark:text-white/70">{{ t('settings') }}</span>
      </div>
    </div>
  </div>
</template>