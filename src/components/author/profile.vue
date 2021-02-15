<template lang="pug">
.profile
  user-avatar(:pub="user.is?.pub")
  h2 {{ user.profile.name }}
  button(@click="logOut()") log out
</template>

<script setup>
import { user, logOut } from "store@user";
</script>

<style lang="stylus" scoped></style>