<script lang="ts" setup>
import TabBar from '../components/TabBar/TabBar.vue'
import ChatItem from '../components/ChatItem/ChatItem.vue'
import Alert from '../components/Alert/Alert.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchTriggerable } from '@vueuse/core'
import { useCateStore, useWindowWidthStore } from '../store'
import { useRouter } from 'vue-router'
import PhoneSideBar from '../components/SideBar/PhoneSideBar.vue'
import { platform } from '@tauri-apps/plugin-os'

const { t } = useI18n()
const router = useRouter()

const body = ref()

interface chatListItem {
  msg: string
  me: boolean
}

const text = ref('')
const inputDisabled = ref(false)

const chatList: Array<chatListItem> = reactive([
  {
    me: false,
    msg: t('hello') + (localStorage.getItem('key') ? '' : `(${t('plzSetApi')})`)
  }
])

let systemPro = localStorage.getItem('sysPro')

const chat = () => {
  if (!text.value) return
  const cateStore = useCateStore()

  const id = `${new Date().getTime()}`
  console.log(cateStore);
  
  cateStore.addCate({
    name: text.value,
    id
  })
  router.push(`/chat?id=${id}&first=true&msg=${text.value}`)
}

const alertShow = ref(!localStorage.getItem('key'))

const model = ref(localStorage.getItem('model') ? localStorage.getItem('model') : '')
const systemPrompt = ref(localStorage.getItem('sysPro') ? localStorage.getItem('sysPro') : '')

const key = ref(localStorage.getItem('key') ? localStorage.getItem('key') : '')

const models = ref([])

function setModel(useModel: string): void {
  model.value = useModel
  localStorage.setItem('model', useModel)
}

const returnClick = (): void => {
  alertShow.value = false
  localStorage.setItem('key', key.value!)
  localStorage.setItem('model', model.value!)
  localStorage.setItem('sysPro', systemPrompt.value!)
}

watchTriggerable(
  key,
  (newValue) => {
    if (newValue !== '') {
      fetch(`${newValue}/api/tags`)
        .then((res) => res.json())
        .then((data) => {
          models.value = data.models
        })
    }
  },
  { immediate: true }
)

const windowWidthStore = useWindowWidthStore()
const open = ref(false)
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:border-l-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar :title="`uyou llm - ${model}`" :use-title-menu="true" :menu-list="models" :left-icon-show="windowWidthStore.width <= 900" left-icon="menu" @menu-fn="(item) => setModel(item.model)" @left-fn="open = true"  />
    <div ref="body" class="overflow-scroll flex-1 scroll-smooth pb-1 max-w-[800px] m-auto w-full">
      <div class="w-full">
        <chat-item v-if="systemPro" :is-sys="true" :msg="systemPro" />
        <chat-item v-for="(item, index) in chatList" :key="index" :msg="item.msg" :is-me="item.me" />
      </div>
    </div>
    <div
      class="w-full flex items-center px-4 py-3 bg-white/50 dark:bg-gray-500/50 border-t-[1px] border-solid border-black/10 dark:border-gray-400/30"
    >
      <input
        v-model="text"
        :disabled="inputDisabled"
        class="flex-1 p-3 rounded-lg dark:bg-gray-500/50 dark:text-white outline-cyan-500 text-6"
        @keydown.enter="chat"
      />
      <div
        class="flex items-center justify-center p-3 bg-cyan-500/50 ml-2 rounded-lg active:bg-cyan-500 text-6"
        @click="chat"
      >
        <span class="material-icons dark:text-white"> send </span>
      </div>
    </div>
    <div v-if="platform() === 'android'" class="h-[36px] bg-white/50 dark:bg-gray-500/50"></div>
  </div>
  <phone-side-bar :open @open-fn="open=false" />
  <Alert
    :title="t('plzSetApi')"
    :dialog-show="alertShow"
    @cancel="alertShow = !alertShow"
    @return="returnClick"
  >
    <div class="flex items-center w-max mb-2">
      <span class="mr-2">Api Link:</span>
      <input
        v-model="key"
        class="border-2 rounded dark:bg-gray-500/50 dark:text-white dark:border-gray-700/30 p-1 outline-cyan-500"
      />
    </div>
    <div class="flex items-center w-max mb-2">
      <span class="mr-2">Model:</span>
      <select
        v-model="model"
        name="model"
        class="border-2 rounded dark:bg-gray-500/50 dark:text-white dark:border-gray-700/30 p-1 outline-cyan-500"
      >
        <option v-for="m in models" :key="m.model" :value="m.model">{{ m.name }}</option>
      </select>
    </div>
    <div class="flex items-center w-max">
      <span class="mr-2">system prompt:</span>
      <input
        v-model="systemPrompt"
        class="border-2 rounded dark:bg-gray-500/50 dark:text-white dark:border-gray-700/30 p-1 outline-cyan-500"
      />
    </div>
  </Alert>
</template>