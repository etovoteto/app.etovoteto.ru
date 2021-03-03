<template lang="pug">
nav.flex.items-center.text-3xl
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
    router-link.user(:to="link")
      i.iconify(data-icon="la:comments")
</template>

<script setup>
import { account } from "store@account";
import { leaveRoom, currentRoom } from "store@room";
import { computed } from "vue";

const link = computed(() => {
  if (currentRoom.isRoot) {
    return "/";
  } else {
    return "/room/" + currentRoom.pub;
  }
});
</script>

<style lang="stylus" scoped>
a
  padding: 4px 0.5em

.router-link-active
  background-color: var(--bar-color)
</style>