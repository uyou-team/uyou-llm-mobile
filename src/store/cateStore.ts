import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Cate {
  id: string
  name: string
}

const useCateStore = defineStore('cate', () =>{
  const cateList = ref<Cate[]>([])

  function addCate(cate: Cate) {
    cateList.value.push(cate)
  }

  function removeCate(id: string) {
    const index = cateList.value.findIndex((item) => item.id === id)
    cateList.value.splice(index, 1)
  }

  return {
    cateList,
    addCate,
    removeCate
  }
}, { persist: true })

export default useCateStore