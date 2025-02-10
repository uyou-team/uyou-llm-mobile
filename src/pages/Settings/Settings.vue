<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingsList from '../../components/SettingsList/SettingsList.vue';
import SettingsItem from '../../components/SettingsList/SettingsItem/SettingsItem.vue';
import { useDeviceStore } from '../../store';
import { useRouter } from 'vue-router';

const { t } = useI18n()

const deviceStore = useDeviceStore()
const router = useRouter()
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:border-l-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar 
      :title="t('settings')" 
      :left-icon-show="!deviceStore.isTablet"
      @left-fn="router.back()"
    />
    <settings-list>
      <settings-item :title="t('setapi')" @click="router.push('/setapi?from=settings')" />
      <settings-item :title="t('about')" @click="router.push('/about?from=settings')" />
    </settings-list>
  </div>
</template>