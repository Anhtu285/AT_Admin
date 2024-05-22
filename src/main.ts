import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/style.less'
import 'ant-design-vue/dist/reset.css'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
app.use(axios)
