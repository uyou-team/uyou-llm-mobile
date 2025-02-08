<script setup lang="ts">
import TabSideBar from './components/SideBar/TabSideBar.vue';
import { useWindowWidthStore } from './store';

const windowWidthStore = useWindowWidthStore()

window.addEventListener('resize', () => {
  windowWidthStore.setWidth(window.innerWidth)
})
</script>

<template>
  <main class="flex h-full bg-gray-200 dark:bg-gray-900">
    <nav>
      <tab-side-bar/>
    </nav>
    <router-view />
  </main>
</template>
