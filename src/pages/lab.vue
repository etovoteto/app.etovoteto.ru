<template lang="pug">
article
  nav
    router-link(to="/lab/cert") cert
    router-link(to="/lab/graph") graph
  router-view(v-slot="{Component}")
    transition(name="fade")
      component(:is="Component")
</template>

<script setup>
</script>

<style lang="stylus" scoped>
nav a
  padding: 2em
</style>