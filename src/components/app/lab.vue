<template lang="pug">
router-link(to="/lab")
  i.iconify(data-icon="la:flask")
</template>

<script setup>
</script>

<style lang="stylus" scoped>
a
  position: absolute
  padding: 0.25em 0.5em
  font-size: 2em
  right: calc(50% - 1em)
  top: 0
  border-radius: 2em
  opacity: 0.15

  &.router-link-active
    background-color: var(--background-alt)
</style>