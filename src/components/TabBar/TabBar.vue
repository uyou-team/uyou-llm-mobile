<script setup lang="ts">
import { ref } from 'vue'
import Alert from '../Alert/Alert.vue'
import { watchTriggerable } from '@vueuse/core'

const key = ref(localStorage.getItem('key') ? localStorage.getItem('key') : '')
const model = ref(localStorage.getItem('model') ? localStorage.getItem('model') : '')
const systemPrompt = ref(localStorage.getItem('sysPro') ? localStorage.getItem('sysPro') : '')

const models = ref([])

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

const alertShow = ref(!localStorage.getItem('key'))

const showAlert = (): void => {
  isInfo.value = false
  alertShow.value = true
}

const returnClick = (): void => {
  alertShow.value = false
  if (isInfo.value) {
    return
  }
  isInfo.value = false
  localStorage.setItem('key', key.value)
  localStorage.setItem('model', model.value)
  localStorage.setItem('sysPro', systemPrompt.value)
  window.title = `uyou llm - ${model.value}`
}

const isInfo = ref(false)
const openInfo = (): void => {
  isInfo.value = true
  alertShow.value = true
}
</script>

<template>
  <div class="flex justify-between px-3 py-4 items-center drag">
    <div
      class="hover:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl no-drag"
      @click="showAlert"
    >
      <span class="material-icons dark:text-white/70"> settings </span>
    </div>
    <span class="dark:text-white/70">uyou llm - {{ model }}</span>
    <div
      class="hover:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl no-drag"
      @click="openInfo"
    >
      <span class="material-icons dark:text-white/70"> info </span>
    </div>
  </div>
  <Alert
    :title="isInfo ? $t('alert.hint') : $t('plzSetApi')"
    :dialog-show="alertShow"
    :cancel-button-show="!isInfo"
    @cancel="alertShow = !alertShow"
    @return="returnClick"
  >
    <div v-if="!isInfo" class="flex items-center w-max mb-2">
      <span class="mr-2">Api Link:</span>
      <input
        v-model="key"
        class="border-2 rounded dark:bg-gray-500/50 dark:text-white dark:border-gray-700/30 p-1 outline-cyan-500"
      />
    </div>
    <div v-if="!isInfo" class="flex items-center w-max mb-2">
      <span class="mr-2">Model:</span>
      <select
        v-model="model"
        name="model"
        class="border-2 rounded dark:bg-gray-500/50 dark:text-white dark:border-gray-700/30 p-1 outline-cyan-500"
      >
        <option v-for="m in models" :key="m.model" :value="m.model">{{ m.name }}</option>
      </select>
    </div>
    <div v-if="!isInfo" class="flex items-center w-max">
      <span class="mr-2">system prompt:</span>
      <input
        v-model="systemPrompt"
        class="border-2 rounded dark:bg-gray-500/50 dark:text-white dark:border-gray-700/30 p-1 outline-cyan-500"
      />
    </div>
    <span v-else>create for Ollama</span>
  </Alert>
</template>
