<template lang="pug">
app-header
user-change
router-view(v-slot="{Component}")
  transition(name="fade")
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
