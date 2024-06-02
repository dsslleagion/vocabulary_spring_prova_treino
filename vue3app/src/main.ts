import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import axios from 'axios';

axios.defaults.baseURL = 'https://8080-dsslleagion-vocabularys-irxg1f80m98.ws-us114.gitpod.io';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
