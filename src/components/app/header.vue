<template lang="pug">
header.w-full.flex.flex-col.items-center.shadow-md.z-100(
  :style="{ background: !currentRoom.isRoot ? pubGradient(currentRoom.pub, 90) : 'var(--top-bar)' }"
)
  h1.text-3xl.mt-20.mb-4.mx-4.text-center
    router-link(to="/") {{ currentRoom.title }}
  router-link.absolute.top-4.right-4.text-3xl(
    v-if="!currentRoom.isRoot",
    :to="{ path: '/room', query: { room: '' } }",
    @click="leaveRoom()"
  )
    i.iconify(data-icon="la:times")
  app-nav
</template>

<script setup>
import { currentRoom, leaveRoom } from "store@room";
import { pubGradient } from "use@colors";
</script>

<style lang="stylus" scoped></style>