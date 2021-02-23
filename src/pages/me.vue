<template lang="pug">
.me
  author-me(v-if="user.is?.pub")
  author-auth(v-else)
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped></style>