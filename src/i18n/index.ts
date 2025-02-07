import { createI18n } from 'vue-i18n'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zh from './zh.json'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import en from './en.json'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.substring(0, 2),
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  }
})

export default i18n
