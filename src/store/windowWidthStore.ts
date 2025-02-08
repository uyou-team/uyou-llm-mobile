import { defineStore } from 'pinia'
import { ref } from 'vue'

const useWindowWidthStore = defineStore('windowSize', () =>{
  const width = ref(window.innerWidth)

  function setWidth(useWidth: number) {
    width.value = useWidth
  }

  return {
    width,
    setWidth
  }
})

export default useWindowWidthStore