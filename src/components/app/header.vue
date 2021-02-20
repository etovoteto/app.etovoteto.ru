<template lang="pug">
header(
  :style="{ background: currentRoom.pub != appPub ? pubGradient(currentRoom.pub, 90) : 'none' }"
)
  router-link(to="/word")
    i.iconify(data-icon="la:comment-dots")
  .spacer
  router-link(to="/def")
    i.iconify(data-icon="la:comment")
  router-link(to="/author")
    span(v-if="!user.is")
      i.iconify(data-icon="la:user-plus")
    author-avatar(:pub="user.is?.pub", size="small")
  router-link.user(to="/room")
    i.iconify(data-icon="la:comments")
  router-link(to="/lab")
    i.iconify(data-icon="la:flask")
</template>

<script setup>
import { user } from "store@user";
import { appPub, currentRoom } from "../../store/room";
import { pubGradient } from "../../use/colors";
</script>

<style lang="stylus" scoped>
header
  display: flex
  align-items: center
  font-size: 2em

  a
    padding: 4px 0.5em

  .router-link-active
    background-color: var(--top-bar)
</style>