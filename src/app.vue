<template lang="pug">
app-header
app-users
router-view(v-slot="{Component}")
  transition(name="fade")
    keep-alive
      component(:is="Component")
</template>

<script setup >
</script>

<style lang="stylus">
main
  display: flex
  flex-flow: column
  justify-content: center
  background-color: var(--background)
</style>
