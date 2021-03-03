<template lang="pug">
header.w-full.flex.flex-col.items-center.shadow-md(
  :style="{ background: !state.isRoot ? pubGradient(state.room, 90) : 'var(--top-bar)' }"
)
  h1.text-3xl.mt-20.mb-4
    router-link(to="/") {{ state.title }}
  router-link.absolute.top-4.right-4.text-3xl(
    v-if="!state.isRoot",
    :to="{ path: '/room', query: { room: '' } }",
    @click="leaveRoom()"
  )
    i.iconify(data-icon="la:times")
  app-nav
</template>

<script setup>
import { state, leaveRoom } from "store@room";
import { pubGradient } from "use@colors";
</script>

<style lang="stylus" scoped></style>