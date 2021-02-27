<template lang="pug">
nav
  router-link(to="/word")
    i.iconify(data-icon="la:comment-dots")
  router-link(to="/def")
    i.iconify(data-icon="la:comment")
  router-link(to="/my")
    span(v-if="!account.is?.pub")
      i.iconify(data-icon="la:user-plus")
    author-avatar(v-else, :pub="account.is?.pub", size="small")
  router-link(to="/author")
    i.iconify(data-icon="la:users")
  transition(name="fade")
    router-link.user(to="/room")
      i.iconify(data-icon="la:comments")
</template>

<script setup>
import { account } from "model@author";
import { leaveRoom, state } from "model@room";
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