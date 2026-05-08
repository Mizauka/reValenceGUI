import { createApp } from 'vue'
import 'mdui/mdui.css'
import 'mdui'
import 'material-icons'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

