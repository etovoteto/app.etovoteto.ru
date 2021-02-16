<template lang="pug">
main
  section.current
    p {{ current.pub }}

  section.list
    p list
</template>

<script setup>
import { current } from "store@room";
</script>

<style lang="stylus" scoped>
section
  padding: 4em 1em
  display: flex
  flex-flow: row wrap
</style>