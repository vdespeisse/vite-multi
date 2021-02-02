<template lang="pug">
div
  Logo
  .text-4xl Switch app ?
  div mode: {{ mode }}
  .flex.flex-col
    a(v-for="app in apps" :href="'/' + app.name + '/'" :key="app.name") {{ app.name }}
</template>
<script lang="ts">
// @ts-ignore
import apps from '../_apps.json'
import { defineComponent } from 'vue'
// @ts-ignore
// import { getRouteOption } from '../lib/utils'
// const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN

export default defineComponent({
  test: 'dsqdqs',
  data() {
    return {
      apps,
      mode: import.meta.env.MODE,
    }
  },
  mounted() {
  }
})
</script>
