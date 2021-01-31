import { createApp } from 'vue'
import { router } from './router';
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
