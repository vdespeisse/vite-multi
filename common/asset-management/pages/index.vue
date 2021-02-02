<template lang="pug">
div
  Logo
  h1.xl
  .flex.flex-col
    a(v-for="app in apps" :href="'/' + app.name + '/'" :key="app.name") {{ app.name }}
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>
