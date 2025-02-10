<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingsList from '../../components/SettingsList/SettingsList.vue';
import SettingsItemSpace from '../../components/SettingsList/SettingsItemSpace/SettingsItemSpace.vue';
import { useRouter } from 'vue-router';
import { open } from '@tauri-apps/plugin-shell'

const { t } = useI18n()

const router = useRouter()
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:border-l-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar 
      title="Sponsor" 
      :left-icon-show="true"
      @left-fn="router.back()"
    />
    <settings-list>
      <settings-item-space>
        <div class="flex items-center flex-col overflow-hidden rounded-xl">
          <img class="w-[350px]" src="../../assets/afd.png" alt="">
          <div 
            class="font-bold bg-[hsl(260,70%,60%)] py-4 w-full text-center text-white active:bg-[hsl(260,70%,54%)]"
            @click="open('https://afdian.com/a/tonylu')"
          >
            {{ t('sponsor.toafd') }}
          </div>
        </div>
      </settings-item-space>
    </settings-list>
  </div>
</template>