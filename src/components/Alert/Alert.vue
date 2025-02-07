<template>
  <dialog ref="dialog" :class="`alert ${dialogShow ? '' : 'hide'}`">
    <div class="title">
      {{ title }}
    </div>
    <div class="body" :style="{ alignItems: title === $t('alert.hint') ? 'center' : '' }">
      <slot />
    </div>
    <div class="buttons">
      <div v-if="cancelButtonShow" class="cancel button" @click="emits('cancel')">
        {{ $t('alert.cancel') }}
      </div>
      <div
        class="return button"
        :style="{ width: cancelButtonShow ? '' : '100%' }"
        @click="emits('return')"
      >
        {{ $t('alert.return') }}
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    body?: Array<string>
    cancelButtonShow?: boolean
    dialogShow?: boolean
  }>(),
  {
    title: 'title',
    body: () => ['1', '2'],
    cancelButtonShow: true,
    dialogShow: false
  }
)

const dialog = ref(null) as unknown as Ref<HTMLDialogElement>

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'return'): void
}>()

onMounted(() => {
  const closeAlert = (): void => {
    dialog.value.close()
  }

  watchEffect(() => {
    if (props.dialogShow) {
      dialog.value.removeEventListener('animationend', closeAlert)
      dialog.value.showModal()
    } else {
      dialog.value.addEventListener('animationend', closeAlert)
    }
  })
})

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0
})

onMounted(() => {
  dialog.value.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    showContextMenu.value = true

    contextMenu.value = {
      top: e.pageY,
      left: e.pageX
    }
  })

  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})
</script>

<style scoped>
@import url('dialogAnimation.css');

.alert[open]::backdrop {
  @apply bg-transparent;
}

.alert {
  @apply dark:bg-gray-500/90 dark:border-gray-700 p-0 z-10 bg-white/90 w-[300px] rounded-lg shadow-2xl border-[1px] border-solid border-gray-400 overflow-hidden select-none text-black/70 backdrop-blur-sm;
}

.title {
  @apply dark:text-white/70 border-b-[1px] border-solid border-black/10 p-[10px] flex bg-black/5 justify-center items-center font-bold;
}

.body {
  @apply p-[18px] text-[14px] flex flex-col border-b-[1px] border-solid border-black/10 min-h-[6rem] justify-center;
}

.body:deep(span) {
  @apply block whitespace-pre-wrap select-text dark:text-white/70;
}

.buttons {
  @apply flex items-center bg-black/10;
}

.button {
  @apply dark:border-gray-700/30 flex-1 h-[100%] flex justify-center items-center text-[15px] font-bold cursor-pointer py-1 m-2 rounded bg-black/5 border-[1px] border-solid border-white/40;
}

.cancel {
  @apply mr-0 active:bg-black/10 dark:text-white/70;
}

.return {
  @apply text-cyan-500 bg-cyan-500/70 text-white dark:bg-cyan-700/50 active:bg-cyan-600/70 active:dark:bg-cyan-900/50;
}
</style>
