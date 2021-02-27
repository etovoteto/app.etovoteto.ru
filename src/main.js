import { createApp } from 'vue'
import app from './app.vue'
import { router } from './router'
import './index.css'
import 'windi.css'

import '@iconify/iconify'
import '@purge-icons/generated'

const projectApp = createApp(app)
projectApp.use(router)
projectApp.mount('#app')
