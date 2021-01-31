import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import multiApp from './build-plugins/multi-app'
import ViteComponents from 'vite-plugin-components'

const isDev = process.env.MODE === 'dev'
const app = process.env.APP
const project = process.env.PROJECT!
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({dirs: ['components']}),
    multiApp({project, dev: isDev, app }),
  ],
  root: './.build',
})
