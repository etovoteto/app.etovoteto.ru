<template lang="pug">
.flex.flex-col
  transition-group(name="list")
    room-card(
      v-for="room in sorted.list",
      :key="room.pub",
      :pub="room.pub",
      :data="room"
    ) 
    .text-2xl.p-8.bg-warm-gray-300(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { pubGradient } from "use@colors";
import { useList } from "store@list";
import { createRoom, newRoom } from "model@room";
import { watchEffect } from "vue";

const { sorted, options, more } = useList("room");

watchEffect(() => {
  options.main = "title";
  options.search = newRoom.title;
});
</script>

<style lang="stylus" scoped></style>