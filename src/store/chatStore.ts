import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export interface chatListItem {
  msg: string
  me: boolean
}

export interface chatList { 
  id: string
  data: chatListItem[]
}

const useChatStore = defineStore('chat', () =>{
  const { t } = useI18n()

  const chatId = ref('')

  function setChatId(id: string) {
    chatId.value = id
    if (chatList.value.some((item) => item.id === chatId.value)) return
    chatList.value.push({
      id: chatId.value,
      data: [{
        me: false,
        msg: t('hello') + (localStorage.getItem('key') ? '' : `(${t('plzSetApi')})`)
      }]
    })
  }

  const chatList = ref<chatList[]>([])

  function addChat(cate: chatListItem) {
    chatList.value.forEach((item) => {
      if (item.id === chatId.value) {
        item.data.push(cate)
      }
    })
  }

  function setChatMsg(msg: string) {
    chatList.value.forEach((item) => {
      if (item.id === chatId.value) {
        item.data[item.data.length - 1].msg = msg
      }
    })
  }

  function removeChat(id: string) {
    const index = chatList.value.findIndex((item) => item.id === id)
    chatList.value.splice(index, 1)
  }

  return {
    chatList,
    addChat,
    setChatMsg,
    setChatId,
    removeChat
  }
}, { 
  persist: true 
})

export default useChatStore