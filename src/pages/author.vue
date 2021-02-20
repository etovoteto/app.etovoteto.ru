<template lang="pug">
.panels
  .me
    author-profile(v-if="user.is?.pub")
    author-form(v-else)
  author-list
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped>
.panels
  width: 100%
  display: flex
  flex-flow: row wrap
  max-width: 55ch

.me
  padding: 1em
  display: flex
  flex-flow: row wrap
</style>