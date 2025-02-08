<script lang="ts" setup>
import TabBar from '../components/TabBar/TabBar.vue'
import ChatItem from '../components/ChatItem/ChatItem.vue'
import { reactive, ref, nextTick, watchEffect, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchTriggerable } from '@vueuse/core'
import { Ollama } from 'ollama/browser'
import { useRoute } from 'vue-router'
import { useChatStore, useWindowWidthStore } from '../store'
import PhoneSideBar from '../components/SideBar/PhoneSideBar.vue'

const { t } = useI18n()
const route = useRoute()

const body = ref()

const text = ref('')
const oldList = reactive([])
const inputDisabled = ref(false)

const chatStore = useChatStore()
const checkedList = computed(() => chatStore.chatList.filter((item) => item.id === route.query.id)[0].data)
chatStore.setChatId(`${route.query.id}`)
watchEffect(() => {
  chatStore.setChatId(`${route.query.id}`)
})

let systemPro = localStorage.getItem('sysPro')

const chat = async () => {
  if (!text.value) return
  
  chatStore.addChat({
    me: true,
    msg: text.value
  })
  
  await nextTick(() => {
    body.value.scrollTo({
      top: body.value.scrollHeight,
      behavior: 'smooth'
    })
  })

  const apiLink = ref(localStorage.getItem('key'))
  const ollama = new Ollama({ host: apiLink.value! })

  const oldMeText = text.value

  await nextTick(() => {
    inputDisabled.value = true
    text.value = t('getting')
  })

  const model = localStorage.getItem('model')
  systemPro = localStorage.getItem('sysPro')
  const useMsg = ref('')

  const response = await ollama.chat({
    model: model!,
    messages: [
      { role: 'system', content: systemPro ? systemPro : '' },
      ...oldList,
      { role: 'user', content: oldMeText }
    ],
    stream: true
  })
  oldList.push({ role: 'user', content: oldMeText })
  chatStore.addChat({
    me: false,
    msg: ''
  })
  
  await nextTick(() => {
    body.value.scrollTo({
      top: body.value.scrollHeight,
      behavior: 'smooth'
    })
  })

  for await (const part of response) {
    useMsg.value += part.message.content
    chatStore.setChatMsg(useMsg.value)
    await nextTick(() => {
      body.value.scrollTo({
        top: body.value.scrollHeight,
        behavior: 'smooth'
      })
    })
  }
  oldList.push({ role: 'assistant', content: useMsg.value })
  text.value = ''
  inputDisabled.value = false
}

if (route.query.first === 'true') {
  text.value = `${route.query.msg}`
  chat()
}

const model = ref(localStorage.getItem('model') ? localStorage.getItem('model') : '')

const key = ref(localStorage.getItem('key') ? localStorage.getItem('key') : '')

const models = ref([])

function setModel(useModel: string): void {
  model.value = useModel
  localStorage.setItem('model', useModel)
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
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:rounded-tl-2xl tablet:border-l-[1px] tablet:border-t-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar :title="`uyou llm - ${model}`" :use-title-menu="windowWidthStore.width <= 900" :menu-list="models" :left-icon-show="windowWidthStore.width <= 900" left-icon="menu" @left-fn="open = true" @menu-fn="(item) => setModel(item.model)" />
    <div ref="body" class="overflow-scroll flex-1 scroll-smooth pb-1 max-w-[800px] m-auto w-full">
      <div class="w-full">
        <chat-item v-if="systemPro" :is-sys="true" :msg="systemPro" />
        <chat-item v-for="(item, index) in checkedList" :key="index" :msg="item.msg" :is-me="item.me" />
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
  </div>
  <phone-side-bar :open @open-fn="open = false" />
</template>