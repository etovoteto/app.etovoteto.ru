<template lang="pug">
header 
  router-link(to="/")
    i.iconify(data-icon="la:book")
  .spacer
  router-link.user(to="/u")
    i.iconify(data-icon="teenyicons:user-square-outline")
  router-link(to="/my")
    user-avatar(:pub="user.is?.pub", size="small")
  router-link(to="/inbox")
    i.iconify(data-icon="la:trash")
  router-link(to="/lab")
    i.iconify(data-icon="la:flask")
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped>
header
  display: flex
  align-items: center
  font-size: 2em

  a
    padding: 4px 1em
</style>