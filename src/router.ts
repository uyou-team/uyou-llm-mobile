import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Settings from './pages/Settings.vue'
import Chat from './pages/Chat.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/chat', component: Chat },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router