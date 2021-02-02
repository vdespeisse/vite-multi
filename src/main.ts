import { createApp, App as Application } from 'vue'
import { router } from './router'
import App from './App.vue'
import './index.css'

declare global {
  interface Window {
    // h: HTML5History
    vm: ReturnType<Application['mount']>
  }
}
const app = createApp(App)
app.use(router)
window.vm = app.mount('#app')
