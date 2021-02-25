<template lang="pug">
nav
  router-link(to="/word")
    i.iconify(data-icon="la:comment-dots")
  router-link(to="/def")
    i.iconify(data-icon="la:comment")
  router-link(to="/my")
    span(v-if="!user.is?.pub")
      i.iconify(data-icon="la:user-plus")
    author-avatar(v-else, :pub="user.is?.pub", size="small")
  router-link(to="/author")
    i.iconify(data-icon="la:users")
  transition(name="fade")
    router-link.user(to="/room", v-if="state.isRoot")
      i.iconify(data-icon="la:comments")
    router-link(
      :to="{ path: '/room', query: { room: '' } }",
      v-else,
      @click="leaveRoom()"
    )
      i.iconify(data-icon="la:sign-out-alt")
</template>

<script setup>
import { user } from "store@user";
import { state } from "model@room";
import { leaveRoom } from "model@room";
</script>

<style lang="stylus" scoped>
nav
  display: flex
  align-items: center
  font-size: 2em

  a
    padding: 4px 0.5em

  .router-link-active
    background-color: var(--bar-color)
</style>