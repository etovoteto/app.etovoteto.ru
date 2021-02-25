<template lang="pug">
header(
  :style="{ background: !state.isRoot ? pubGradient(state.room, 90) : 'var(--top-bar)' }"
)
  h1 
    router-link(:to="link") {{ state.title }}
    router-link(
      v-if="!state.isRoot",
      :to="{ path: '/room', query: { room: '' } }",
      @click="leaveRoom()"
    )
      i.iconify(data-icon="la:sign-out-alt")
  app-nav
  app-dev
</template>

<script setup>
import { computed } from "vue";
import { state, leaveRoom } from "model@room";
import { pubGradient } from "use@colors";

const link = computed(() => {
  if (state.isRoot) {
    return "/";
  } else {
    return "/room/" + state.room;
  }
});
</script>

<style lang="stylus" scoped>
header
  background-color: var(--top-bar)
  width: 100%
  display: flex
  flex-flow: column
  align-items: center

h1
  text-align: center
  margin: 2em 0 1em 0
</style>