<template lang="pug">
app-header
.room-line(
  v-if="currentRoom.pub != appPub",
  :style="{ background: pubGradient(currentRoom.pub, 90) }"
) 
  button(@click="exitRoom()") Exit room
author-changer
link-card
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component", :key="currentRoom.pub")
</template>

<script setup >
import { currentRoom, appPub, exitRoom } from "./store/room";
import { pubGradient } from "./use/colors";
</script>

<style lang="stylus">
main
  display: flex
  flex-flow: column
  justify-content: center
  background-color: var(--background)

.room-line
  width: 100%
  height: 2em
</style>
