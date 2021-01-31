<template>
<div>
  <Logo />
  <h1 class="title">
    HM
  </h1>
</div>
</template>
<script>
export default {
  middleware: 'auth',
  test: 'ok',
}
</script>
