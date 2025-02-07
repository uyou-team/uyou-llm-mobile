<script setup lang="ts">
import TabBar from './components/TabBar/TabBar.vue'
import ChatItem from './components/ChatItem/ChatItem.vue'
import { reactive, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { Ollama } from 'ollama/browser'

const { t } = useI18n()

const body = ref()

interface chatListItem {
  msg: string
  me: boolean
}

const text = ref('')
const oldList = reactive([])
const inputDisabled = ref(false)

const chatList: Array<chatListItem> = reactive([
  {
    me: false,
    msg: t('hello') + (localStorage.getItem('key') ? '' : `(${t('plzSetApi')})`)
  }
])

let systemPro = localStorage.getItem('sysPro')

const chat = async (): void => {
  chatList.push({
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
  const ollama = new Ollama({ host: apiLink.value })

  const oldMeText = text.value

  await nextTick(() => {
    inputDisabled.value = true
    text.value = t('getting')
  })

  const model = localStorage.getItem('model')
  systemPro = localStorage.getItem('sysPro')
  const useMsg = ref('')

  const response = await ollama.chat({
    model: model,
    messages: [
      { role: 'system', content: systemPro ? systemPro : '' },
      ...oldList,
      { role: 'user', content: oldMeText }
    ],
    stream: true
  })
  oldList.push({ role: 'user', content: oldMeText })
  chatList.push({
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
    chatList[chatList.length - 1].msg = useMsg.value
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
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-200 dark:bg-gray-900">
    <tab-bar />
    <div ref="body" class="overflow-scroll flex-1 scroll-smooth pb-1">
      <chat-item v-if="systemPro" :is-sys="true" :msg="systemPro" />
      <chat-item v-for="(item, index) in chatList" :key="index" :msg="item.msg" :is-me="item.me" />
    </div>
    <div
      class="w-screen flex items-center px-4 py-3 bg-white/50 dark:bg-gray-500/50 border-t-[1px] border-solid border-black/10 dark:border-gray-400/30"
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
</template>
