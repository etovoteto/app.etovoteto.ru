<template lang="pug">
router-link.my-4.flex.flex-col.items-stretch.bg-warm-gray-50.shadow-lg(
  :to="{ path: '/room/' + room.pub }"
)
  .flex.flex-col.p-4.items-stretch.text-center(
    :style="{ background: pubGradient(room.pub, 90) }"
  )
    .text-2xl.mt-4.mb-6 {{ room.data.title }}
      edit-hide(:hash="room.hash", tag="room")
    .flex.justify-center
      author-badge.text-sm(:pub="room.host")
      .spacer
      button.bg-warm-gray-200.px-4.mx-2.flex.items-center(
        v-if="currentRoom.pub != room.pub",
        @click="$router.push({ path: '/check' }); enterRoom(room.pub)"
      ) 
        .title Войти
  .p-4.text-lg.font-normal.text-center(v-if="room.data?.desc")
    p {{ room.data?.desc }}
  room-counters.bg-warm-gray-100(:room="room")
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { gun } from "store@db";
import { pubGradient } from "use@colors";
import { favRoom, unFavRoom, useRoom } from "model@room";
import { enterRoom, currentRoom } from "store@room";

const props = defineProps({
  room: Object,
});
</script>

<style lang="stylus"  scoped>
a:hover
  @apply: shadow-2xl no-underline
</style>