import { defineStore } from "pinia";
import { ref } from "vue";

const useDeviceStore = defineStore('devices', () => {
  const isTablet = ref(window.innerWidth > 900)
  
  window.addEventListener('resize', () => {
    isTablet.value = window.innerWidth > 900
  })

  return {
    isTablet
  }
})

export default useDeviceStore