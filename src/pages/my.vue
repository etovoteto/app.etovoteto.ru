<template lang="pug">
main.container(:key="account.is")
  my-profile(v-if="account.is?.pub")
  my-auth(v-else)
  author-lists
</template>

<script setup>
import { account } from "store@account";
</script>

<style lang="stylus" scoped></style>