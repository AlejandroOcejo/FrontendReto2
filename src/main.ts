import './assets/main.css'
import PrimeVue from 'primevue/config'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  pt: {}
})
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
