<template lang="pug">
.rooms
  nav.buttons
    button(@click="createRoom()") Create
  transition-group(name="list")
    router-link.room(
      :to="{ path: '/room/' + room.pub, query: { room: room.pub } }",
      v-for="room in sorted.list",
      :key="room",
      :style="{ background: pubGradient(room.pub, 90) }"
    ) {{ room.pub }}
</template>

<script setup>
import { pubGradient } from "use@colors";
import { useList } from "store@list";
import { createRoom } from "model@room";

const { sorted, options, more } = useList("room");
</script>

<style lang="stylus" scoped>
.rooms
  padding: 2em 1em
  display: flex
  flex-flow: row wrap

  > div
    padding: 1em
</style>