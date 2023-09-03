import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store/questions'

import VueCodeHighlight from 'vue-code-highlight'

import VueConfetti from 'vue-confetti'

const app = createApp(App)

app.use(VueCodeHighlight)
app.use(VueConfetti)
app.use(router)
app.use(store, key)

app.mount('#app')
