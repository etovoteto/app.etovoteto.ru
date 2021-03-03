<template lang="pug">
.my-2.flex.flex-col.items-stretch.bg-warm-gray-50
  router-link.flex.flex-col.p-4.items-stretch(
    :to="{ path: '/room/' + pub }",
    :style="{ background: pubGradient(pub, 90) }"
  )
    .text-2xl.mb-4 {{ room.title }}
    .flex.justify-center
      author-badge.text-sm(:pub="room.host")
      .spacer
      edit-fav(:pub="pub")
  room-counters(:pub="pub")
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { gun } from "store@db";
import { pubGradient } from "use@colors";
import { favRoom, unFavRoom, useRoom } from "model@room";

const props = defineProps({
  pub: String,
  data: Object,
});

const room = useRoom(props.pub);
</script>

<style lang="stylus" scoped></style>