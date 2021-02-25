<template lang="pug">
.room-line(
  v-if="!state.isRoot",
  :style="{ background: pubGradient(state.room, 90) }"
) 
  button(@click="leaveRoom(); $router.push({ query: { room: '' } })") Leave room
</template>

<script setup>
import { leaveRoom, state } from "model@room";
import { pubGradient } from "use@colors";
</script>

<style lang="stylus" scoped>
.room-line
  width: 100%
  height: 2em
</style>