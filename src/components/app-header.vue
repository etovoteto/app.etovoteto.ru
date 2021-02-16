<template lang="pug">
header 
  router-link(to="/")
    i.iconify(data-icon="la:comment-dots")
  .spacer
  router-link(to="/sense")
    i.iconify(data-icon="la:comment")
  router-link(to="/my")
    user-avatar(:pub="user.is?.pub", size="small")
  router-link.user(to="/room")
    i.iconify(data-icon="la:comments")
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
    padding: 4px 0.5em
</style>