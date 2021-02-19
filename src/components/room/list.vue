<template lang="pug">
.rooms
  nav.buttons
    button(@click="createRoom()") Create
  transition-group(name="list")
    .room(
      v-for="room in sorted.list",
      :key="room",
      :style="{ background: pubGradient(room.pub, 90) }"
    ) {{ room.pub }}
      button(@click="enterRoom(room.pub)") Enter
</template>

<script setup>
import { pubGradient } from "use@colors";
import { useHashList } from "use@hashList";
import { enterRoom, createRoom } from "store@room";

const { sorted, options, more } = useHashList("room");
</script>

<style lang="stylus" scoped>
.rooms
  padding: 2em 1em
  display: flex
  flex-flow: row wrap

  > div
    padding: 1em
</style>