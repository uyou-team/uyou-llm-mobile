import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'highlight.js/styles/atom-one-dark.css'
import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import './tailwind.css'
import i18n from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
