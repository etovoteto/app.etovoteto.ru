<template lang="pug">
.room-line(
  v-if="currentRoom.pub != appPub",
  :style="{ background: pubGradient(currentRoom.pub, 90) }"
) 
  button(@click="leaveRoom(); $router.push({ query: { room: '' } })") Leave room
</template>

<script setup>
import { currentRoom, appPub, leaveRoom } from "model@room";
import { pubGradient } from "use@colors";
</script>

<style lang="stylus" scoped>
.room-line
  width: 100%
  height: 2em
</style>