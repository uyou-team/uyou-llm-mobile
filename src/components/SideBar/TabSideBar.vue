<script lang="ts" setup>
import SideBar from './SideBar.vue';
import { useWindowWidthStore } from '../../store';

const windowWidthStore = useWindowWidthStore()
</script>

<template>
  <div 
    v-if="windowWidthStore.width > 900"
    class="w-[400px] h-screen"
  >
    <side-bar />
  </div>
</template>