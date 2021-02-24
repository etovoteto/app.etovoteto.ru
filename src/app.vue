<template lang="pug">
app-title
app-header
app-dev
room-line
link-card
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component", :key="currentRoom.pub")
</template>

<script setup >
import { currentRoom } from "./model/room";
</script>

<style lang="stylus">
main
  display: flex
  flex-flow: column
  justify-content: center
  background-color: var(--background)
</style>
