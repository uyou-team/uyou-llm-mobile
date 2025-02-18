<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingsList from '../../components/SettingsList/SettingsList.vue';
import SettingsItem from '../../components/SettingsList/SettingsItem/SettingsItem.vue';
import SettingsItemSpace from '../../components/SettingsList/SettingsItemSpace/SettingsItemSpace.vue';
import SettingsItemBox from '../../components/SettingsList/SettingsItemBox/SettingsItemBox.vue';
import { useRouter } from 'vue-router';
import { app } from '@tauri-apps/api'
import { ref } from 'vue';
import { open } from '@tauri-apps/plugin-shell'

const { t } = useI18n()

const router = useRouter()

const appVersion = ref('')

app.getVersion().then((version) => {
  appVersion.value = version
})
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:border-l-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar 
      :title="t('about')" 
      :left-icon-show="true"
      @left-fn="router.back()"
    />
    <settings-list>
      <settings-item-space>
        <img class="w-[150px] h-[150px] mb-2" src="../../assets/icon.png" alt="" srcset="">
        <div class="font-bold text-[1.2rem]">uyou llm v{{ appVersion }}</div>
      </settings-item-space>
      <settings-item-box>
        <settings-item title="GitHub" @click="open('https://github.com/uyou-team/uyou-llm-mobile')" />
        <settings-item title="release" @click="open('https://github.com/uyou-team/uyou-llm-mobile/releases')" />
      </settings-item-box>
      <settings-item title="Sponsor" @click="router.push('/sponsor?from=settings')" />
    </settings-list>
  </div>
</template>