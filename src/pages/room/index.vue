<template lang="pug">
main
  section.main
    h2 ROOMS

  section.current CURRENT
    .id(:style="{ background: pubGradient(currentRoom.pub, 90) }") {{ currentRoom.pub }}
      button(@click="exitRoom()") Exit room
  nav.buttons
    button(@click="createRoom()") Create

  section.rooms
    .room(
      v-for="room in sorted.list",
      :key="room",
      :style="{ background: pubGradient(room.pub, 90) }"
    ) {{ room.pub }}
      button(@click="enterRoom(room.pub)") Enter
</template>

<script setup>
import {
  appPub,
  roomKey,
  currentRoom,
  createRoom,
  enterRoom,
  exitRoom,
  initRoom,
} from "store@room";
import { pubGradient } from "use@colors";
import { useHashList } from "use@hashList";

const { sorted, options, more } = useHashList("room");
</script>

<style lang="stylus" scoped>
section
  padding: 2em 1em
  display: flex
  flex-flow: row wrap

  > div
    padding: 1em

.id
  background-position: 0% 50%

.cert
  display: flex

.key
  font-weight: bold
  padding: 0 1em 0 0
  white-space: nowrap
</style>