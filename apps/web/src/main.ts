import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { configureClient } from '@repo/api/config'
import { env } from '@repo/config/env/vite'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

configureClient({
  baseUrl: env.VITE_API_URL,
})

app.mount('#app')
