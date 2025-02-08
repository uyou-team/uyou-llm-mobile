<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../components/TabBar/TabBar.vue';

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:rounded-tl-2xl tablet:border-l-[1px] tablet:border-t-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar :title="t('settings')" />
    <div>
        settings
    </div>
  </div>
</template>