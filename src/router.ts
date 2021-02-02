import { createRouter, createWebHistory } from 'vue-router';
// @ts-ignore TODO: Find a way around writing this
import config from './config.json'

const routerHistory = createWebHistory(config.app ? `/${config.app}/` : '');
// Auto generate pages from /pages folder content
const pages = import.meta.glob('./pages/**/*.vue')
const routes = Object.keys(pages).map(k => {
  return {
    // TODO: better replace
    path: k.replace(/^\.\/pages/,'')
      .replace(/index\.vue$/,'')
      .replace(/_/g,':')
      .replace(/\.vue$/,''),
    component: pages[k],
  }
})
console.log(config.app, routes)

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes,
})