<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingsList from '../../components/SettingsList/SettingsList.vue';
import SettingsItem from '../../components/SettingsList/SettingsItem/SettingsItem.vue';
import SettingsItemSpace from '../../components/SettingsList/SettingsItemSpace/SettingsItemSpace.vue';
import { useRouter } from 'vue-router';

const { t } = useI18n()

const router = useRouter()
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:rounded-tl-2xl tablet:border-l-[1px] tablet:border-t-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar 
      :title="t('about')" 
      :left-icon-show="true"
      @left-fn="router.back()"
    />
    <settings-list>
      <settings-item-space>
        <div>{{ t('about') }}</div>
      </settings-item-space>
      <settings-item :title="t('about')" @click="router.push('/setapi')" />
    </settings-list>
  </div>
</template>