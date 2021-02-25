<template lang="pug">
.rooms
  transition-group(name="list")
    room-card(v-for="room in sorted.list", :key="room.pub", :pub="room.pub") 
    .more(
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

<style lang="stylus" scoped>
.rooms
  padding: 0
  display: flex
  flex-flow: column

  > div
    padding: 1em

  .room
    padding: 1em
    margin: 0.5em 0
</style>