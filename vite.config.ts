import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import multiApp from './build-plugins/multi-app'
const isDev = process.env.MODE === 'dev'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    multiApp({project: 'test', dev: isDev, app: 'fxh' }),
  ],
  root: './.build',
})
