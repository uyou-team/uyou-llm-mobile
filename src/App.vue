<script setup lang="ts">
import TabSideBar from './components/SideBar/TabSideBar.vue';
import { useWindowWidthStore } from './store';
import { f7App } from 'framework7-vue'

const windowWidthStore = useWindowWidthStore()

window.addEventListener('resize', () => {
  windowWidthStore.setWidth(window.innerWidth)
})
</script>

<template>
  <f7-app v-bind="{ theme: 'md' }">
    <main class="flex h-full bg-gray-200 dark:bg-gray-900">
      <nav>
        <tab-side-bar/>
      </nav>
      <router-view />
    </main>
  </f7-app>
</template>
