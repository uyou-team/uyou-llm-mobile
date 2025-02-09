<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingsList from '../../components/SettingsList/SettingsList.vue';
import { useRouter } from 'vue-router';
import SettingsItemText from '../../components/SettingsList/SettingsItemText/SettingsItemText.vue';
import SettingsItemSpace from '../../components/SettingsList/SettingsItemSpace/SettingsItemSpace.vue';
import SettingsItemButton from '../../components/SettingsList/SettingsItemButton/SettingsItemButton.vue';
import SettingsItemBox from '../../components/SettingsList/SettingsItemBox/SettingsItemBox.vue';
import SettingsItem from '../../components/SettingsList/SettingsItem/SettingsItem.vue';
import { ref } from 'vue';
import { watchTriggerable } from '@vueuse/core';

interface Model {
  model: string
}

const { t } = useI18n()
const router = useRouter()

const model = ref(localStorage.getItem('model') ? localStorage.getItem('model') : '')
const systemPrompt = ref(localStorage.getItem('sysPro') ? localStorage.getItem('sysPro') : '')

const key = ref(localStorage.getItem('key') ? localStorage.getItem('key') : '')

const models = ref<Model[]>([])

function setModel(useModel: string) {
  model.value = useModel
  localStorage.setItem('model', useModel)
}

function save() {
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
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:rounded-tl-2xl tablet:border-l-[1px] tablet:border-t-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar 
      :title="t('setapi')" 
      :left-icon-show="true"
      @left-fn="router.back()"
    />
    <settings-list>
      <settings-item-text title="set api" />
      <settings-item-space>
        <input 
          type="text" 
          class="w-full outline-cyan-500 p-2 bg-gray-100/50 rounded-md"
          v-model="key"
        >
      </settings-item-space>
      <template v-if="models.length > 0">
        <settings-item-text title="choose model" />
        <settings-item-box>
          <settings-item 
            v-for="(item, index) in models" 
            :key="index" 
            custom-arrow="check"
            :title="item.model"
            :show-arrow="item.model === model"
            @click="setModel(item.model)"
          />
        </settings-item-box>
      </template>
      <settings-item-text title="system promat" />
      <settings-item-space>
        <textarea v-model="systemPrompt" type="text" class="border-none w-full p-2 outline-cyan-500 bg-gray-100/50 h-[200px]" />
      </settings-item-space>
      <settings-item-button type="parmary" @click="save">
        <div>{{ t('save') }}</div>
      </settings-item-button>
    </settings-list>
  </div>
</template>