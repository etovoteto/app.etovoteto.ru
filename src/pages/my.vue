<template lang="pug">
main(:key="account.is")
  my-auth(v-if="!account.is?.pub")
  my-profile(v-else)
</template>

<script setup>
import { account } from "store@account";
</script>

<style lang="stylus" scoped></style>