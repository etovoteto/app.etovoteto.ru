<template lang="pug">
transition(name="fade")
  .loader 
</template>

<script setup>
</script>

<style lang="stylus" scoped>
.loader
  margin: 4rem
  width: 100px
  height: 20px
  background-color: var(--background-alt)
  transition: all 300ms ease-in-out
</style>