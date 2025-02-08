import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'highlight.js/styles/atom-one-dark.css'
import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import './tailwind.css'
import i18n from './i18n'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
  storage: localStorage,
}))

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
