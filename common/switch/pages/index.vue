<template lang="pug">
div
  Logo
  h1.title Switch app
  .flex.flex-col
    a(v-for="app in apps" :href="'/' + app.name + '/'" :key="app.name") {{ app.name }}
</template>
<script>
// @ts-ignore
import apps from '../_apps.json'
export default {
  data() {
    return {
      apps,
    }
  },
}
</script>
