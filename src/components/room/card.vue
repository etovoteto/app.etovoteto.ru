<template lang="pug">
router-link.my-4.flex.flex-col.items-stretch.bg-warm-gray-50.shadow-lg(
  :to="{ path: '/room/' + room.pub }"
)
  .flex.flex-col.p-4.items-stretch(
    :style="{ background: pubGradient(room.pub, 90) }"
  )
    .text-2xl.mb-4 {{ room.data.title }}
    .flex.justify-center
      author-badge.text-sm(:pub="room.host")
      .spacer
  .p-4.text-lg.font-normal(v-if="room.data?.desc")
    p {{ room.data?.desc }}
  room-counters.bg-warm-gray-100(:room="room")
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { gun } from "store@db";
import { pubGradient } from "use@colors";
import { favRoom, unFavRoom, useRoom } from "model@room";

const props = defineProps({
  room: Object,
});
</script>

<style  scoped>
a:hover {
  text-decoration: none;
  @apply shadow-2xl;
}
</style>