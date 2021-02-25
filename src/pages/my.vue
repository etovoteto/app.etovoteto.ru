<template lang="pug">
main
  my-profile(v-if="user.is?.pub")
  my-auth(v-else)
  author-lists
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped></style>