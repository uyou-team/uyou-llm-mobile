import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'framework7/css/bundle'
import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import './tailwind.css'
import i18n from './i18n'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import Framework7 from 'framework7/lite-bundle'
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle'

Framework7.use(Framework7Vue);

const pinia = createPinia()
pinia.use(createPersistedState({
  storage: localStorage,
}))

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)

registerComponents(app);

app.mount('#app')
