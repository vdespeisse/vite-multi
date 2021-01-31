import { createRouter, createWebHistory } from 'vue-router';

const routerHistory = createWebHistory();
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

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes,
})