<template lang="pug">
header(
  :style="{ background: currentRoom.pub != appPub ? pubGradient(currentRoom.pub, 90) : 'none' }"
)
  router-link(to="/word")
    i.iconify(data-icon="la:comment-dots")
  router-link(to="/def")
    i.iconify(data-icon="la:comment")
  router-link(to="/me")
    span(v-if="!user.is?.pub")
      i.iconify(data-icon="la:user-plus")
    author-avatar(v-else, :pub="user.is?.pub", size="small")
  router-link.user(to="/room")
    i.iconify(data-icon="la:comments")
  router-link(to="/author")
    i.iconify(data-icon="la:users")
</template>

<script setup>
import { user } from "store@user";
import { appPub, currentRoom } from "model@room";
import { pubGradient } from "use@colors";
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