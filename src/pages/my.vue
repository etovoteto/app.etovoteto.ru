<template lang="pug">
main
  my-profile(v-if="author.is?.pub")
  my-auth(v-else)
  author-lists
</template>

<script setup>
import { author } from "model@author";
</script>

<style lang="stylus" scoped></style>