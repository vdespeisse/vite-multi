import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import multiApp from './build-plugins/multi-app'
import ViteComponents from 'vite-plugin-components'
import { resolve } from 'path'

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
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '.build/index.html'),
        fxh: resolve(__dirname, '.build/fxh/index.html'),
        'asset-management': resolve(__dirname, '.build/asset-management/index.html')
      }
    },
  },
  root: './.build',
})
