<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import TabBar from '../../components/TabBar/TabBar.vue';
import SettingsList from '../../components/SettingsList/SettingsList.vue';
import SettingsItemSpace from '../../components/SettingsList/SettingsItemSpace/SettingsItemSpace.vue';
import SettingsItem from '../../components/SettingsList/SettingsItem/SettingsItem.vue';
import SettingsItemText from '../../components/SettingsList/SettingsItemText/SettingsItemText.vue';
import SettingsItemBox from '../../components/SettingsList/SettingsItemBox/SettingsItemBox.vue';
import SettingsItemButton from '../../components/SettingsList/SettingsItemButton/SettingsItemButton.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const { t } = useI18n()

const router = useRouter()

const showSystemPrompt = ref(true)

const showFirstChat = ref(true)
</script>

<template>
  <div class="flex flex-col h-screen bg-white/30 dark:bg-white/10 w-full tablet:border-l-[1px] tablet:border-black/10 dark:tablet:border-white/10 tablet:border-solid">
    <tab-bar 
     :title="t('otherChatSet')" 
      :left-icon-show="true"
      @left-fn="router.back()"
    />
    <settings-list>
      <settings-item title="Show system prompt in chats list" v-model="showSystemPrompt" :show-toggle="true" />
      <settings-item-text title="Set first Assistent chat" />
      <settings-item-box>
        <settings-item title="Use first Assistent chat" v-model="showFirstChat" :show-toggle="true" />
        <settings-item-space v-if="showFirstChat">
          <textarea class="w-full p-2 bg-black/5 h-[100px]" placeholder="first Assistent chat" type="text"/>
        </settings-item-space>
      </settings-item-box>
      <settings-item-button type="parmary">
        <div>{{ t('save') }}</div>
      </settings-item-button>
    </settings-list>
  </div>
</template>