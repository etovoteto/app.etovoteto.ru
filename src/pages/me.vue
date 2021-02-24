<template lang="pug">
main
  author-me(v-if="user.is?.pub")
  author-auth(v-else)
  author-lists
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped></style>