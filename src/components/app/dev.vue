<template lang="pug">
router-link(to="/lab")
  i.iconify(data-icon="la:flask")
</template>

<script setup>
</script>

<style lang="stylus" scoped>
a
  position: fixed
  padding: 0.5em
  font-size: 2em
  right: 0
  bottom: 0px
  margin: 1em
  background-color: var(--background-alt)
  border-radius: 100%

  &.router-link-active
    background-color: var(--top-bar)
</style>