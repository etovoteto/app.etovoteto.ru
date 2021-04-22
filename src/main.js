import { createApp } from 'vue'
import app from './app.vue'
import { router } from './router'
import './index.css'
import 'virtual:windi.css'

import '@iconify/iconify'
import '@purge-icons/generated'

import { MotionPlugin } from '@vueuse/motion'

const projectApp = createApp(app)
projectApp.use(router)
projectApp.use(MotionPlugin)
projectApp.mount('#app')
