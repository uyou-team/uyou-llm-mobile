import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Settings from './pages/Settings/Settings.vue'
import Chat from './pages/Chat.vue'
import SetApi from './pages/Settings/SetApi.vue'
import About from './pages/Settings/About.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/chat', component: Chat },
  { path: '/settings', component: Settings, name: 'settings' },
  { path: '/setapi', component: SetApi },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router