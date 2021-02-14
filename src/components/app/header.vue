<template lang="pug">
header 
  h1 Словарь
  .spacer
  router-link.user(to="/u")
    i.iconify(data-icon="teenyicons:user-square-outline")
  router-link(to="/my")
    user-avatar(:pub="user.is?.pub", size="small")
  router-link(to="/graph")
    i.iconify(data-icon="la:flask")
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped>
header
  display: flex
  align-items: center
</style>