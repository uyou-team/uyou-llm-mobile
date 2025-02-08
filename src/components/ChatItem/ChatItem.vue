<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    isMe?: boolean
    isSys?: boolean
    msg: string
  }>(),
  {
    isMe: true
  }
)

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.thinking-hint')) {
    const wrapper = target.closest('.think-wrapper') as HTMLElement
    if (wrapper) {
      const thinkId = wrapper.dataset.thinkId
      if (thinkId) {
        const newState = !wrapper.classList.contains('collapsed')
        if (newState) {
          wrapper.classList.add('collapsed')
        } else {
          wrapper.classList.remove('collapsed')
        }
      }
    }
  }
}

const processedMsg = computed(() => {
  let thinkCount = 0
  let result = ''
  let currentPos = 0
  const msg = props.msg

  const completeThinkRegex = /<think>([\s\S]*?)<\/think>/g
  let match

  const hasIncompleteThink = msg.lastIndexOf('<think>') > msg.lastIndexOf('</think>')
  const lastThinkStart = hasIncompleteThink ? msg.lastIndexOf('<think>') : -1

  while ((match = completeThinkRegex.exec(msg)) !== null) {
    if (match.index > currentPos) {
      result += `<div>${msg.slice(currentPos, match.index)}</div>`
    }

    const content = match[1]
    if (content.trim()) {
      const thinkId = `think-${thinkCount++}`
      result += `<div><div class="normal-text"><span class="think-wrapper collapsed" data-think-id="${thinkId}">
        <div class="thinking-hint">
          ${t('thought')}
          <span class="collapse-icon">›</span>
        </div>
        <span class="think-content">${content}</span>
      </span></div></div>`
    }
    
    currentPos = match.index + match[0].length
  }

  if (hasIncompleteThink) {
    if (lastThinkStart > currentPos) {
      result += `<div>${msg.slice(currentPos, lastThinkStart)}</div>`
    }
    
    const content = msg.slice(lastThinkStart + 7) // +7 跳过 <think>
    if (content.trim()) {
      const thinkId = `think-${thinkCount++}`
      result += `<div><div class="normal-text"><span class="think-wrapper" data-think-id="${thinkId}">
        <div class="thinking-hint">
          ${t('thinking')}
          <span class="collapse-icon">›</span>
        </div>
        <span class="think-content">${content}</span>
      </span></div></div>`
    }
    currentPos = msg.length
  }

  if (currentPos < msg.length) {
    result += `<div>${msg.slice(currentPos)}</div>`
  }

  return result
})
</script>

<template>
  <div v-if="isSys" class="flex w-[calc(100%-56px)] pl-2 py-1">
    <div class="w-10 mr-2 min-w-10">
      <img class="rounded-full" src="../../assets/system.jpg" alt="chatGPT" />
    </div>
    <div
      class="bg-white rounded-xl rounded-tl-md p-3 overflow-auto h-auto dark:bg-gray-500/50 w-auto max-w-[calc(100vw-112px)] shadow-md shadow-black/10"
    >
      <span class="w-10 whitespace-normal break-words text-sm dark:text-white/70">{{ msg }}</span>
    </div>
  </div>
  <div v-else-if="isMe && !isSys" class="flex w-[calc(100%-56px)] pr-2 py-1 justify-end ml-[56px]">
    <div
      class="text-start bg-cyan-500 rounded-xl rounded-tr-md p-3 overflow-auto h-auto dark:bg-cyan-900 dark:text-white/70 w-auto max-w-[calc(100vw-112px)] shadow-md shadow-cyan-700/10"
    >
      <span class="w-10 whitespace-normal break-words text-white text-sm">{{ msg }}</span>
    </div>
    <div class="w-10 min-w-10 ml-2 rounded-lg">
      <img
        class="rounded-full dark:bg-gary-500/50 bg-white/50"
        src="../../assets/user.jpg"
        alt="me"
      />
    </div>
  </div>
  <div v-else class="flex w-[calc(100%-56px)] pl-2 py-1">
    <div class="w-10 mr-2 min-w-10">
      <img class="rounded-full" src="../../assets/logo.png" alt="chatGPT" />
    </div>
    <div
      class="bg-white rounded-xl rounded-tl-md p-3 overflow-auto h-auto dark:bg-gray-500/50 w-auto max-w-[calc(100vw-112px)] shadow-md shadow-black/10"
    >
      <Markdown 
        :source="processedMsg" 
        :html="true"
        class="dark:text-white/70 select-text text-sm markdown-content" 
        @click="handleClick"
      />
    </div>
  </div>
</template>

<style scoped>
.markdown-content :deep(.think-wrapper) {
  display: block;
  margin: 4px 0;
  padding-left: 8px;
  border-left: 2px solid #E5E7EB;
}

.markdown-content :deep(.thinking-hint) {
  font-size: 0.875rem;
  color: #6B7280;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 2px 0;
}

.markdown-content :deep(.collapse-icon) {
  font-size: 1rem;
  margin-left: 4px;
  color: #6B7280;
  transition: transform 0.2s ease;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1;
  transform: rotate(90deg);
}

.markdown-content :deep(.think-wrapper.collapsed .collapse-icon) {
  transform: rotate(0deg);
}

.markdown-content :deep(.think-content) {
  color: #9CA3AF;
  display: block;
  margin-top: 2px;
  padding-left: 2px;
  opacity: 1;
  max-height: 1000px;
  transition: opacity 0.2s ease, max-height 0.2s ease;
  overflow: hidden;
}

.markdown-content :deep(.think-wrapper.collapsed .think-content) {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  transition: opacity 0.2s ease, max-height 0.2s ease, margin-top 0.2s ease;
}

.markdown-content :deep(p) {
  margin-bottom: 0.5em;
  margin-top: 0;
  color: inherit;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(.normal-text) {
  display: block;
  margin: 4px 0;
}
</style>
