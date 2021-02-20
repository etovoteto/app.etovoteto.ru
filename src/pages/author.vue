<template lang="pug">
main
  .panel
    author-profile(v-if="user.is?.pub")
    author-form(v-else)
  article
    author-list
</template>

<script setup>
import { user } from "../store/user";
</script>

<style lang="stylus" scoped>
main
  display: flex
</style>