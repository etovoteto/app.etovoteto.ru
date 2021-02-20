<template lang="pug">
.profile
  author-avatar(:pub="user.is?.pub", size="big")
  h2 {{ user.profile.name }}
  button(@click="logOut()") log out
</template>

<script setup>
import { user, logOut } from "store@user";
</script>

<style lang="stylus" scoped></style>