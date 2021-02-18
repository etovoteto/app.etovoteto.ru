<template lang="pug">
app-header
.room-line(:style="{ background: pubGradient(currentRoom.pub, 90) }") 
user-change
linking
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component", :key="currentRoom.pub")
</template>

<script setup >
import { currentRoom } from "./store/room";
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
