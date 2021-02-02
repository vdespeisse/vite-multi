<template lang="pug">
div
  Logo
  .text-4xl Switch app
  div {{ hm }} mode: {{ mode }}
  .flex.flex-col
    a(v-for="app in apps" :href="'/' + app.name + '/'" :key="app.name") {{ app.name }}
</template>
<script lang="ts">
// @ts-ignore
import apps from '../_apps.json'
import { ref, defineComponent } from 'vue'
// @ts-ignore
import { getRouteOption } from '../lib/utils'
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN

export default defineComponent({
  test: 'dsqdqs',
  data() {
    return {
      apps,
      hm: null,
      mode: AUTH0_DOMAIN,
    }
  },
  mounted() {
    console.log('Route', this.$route)
    this.hm = getRouteOption(this.$route, 'test')
    console.log('Meta', import.meta.env)
  }
})
</script>
