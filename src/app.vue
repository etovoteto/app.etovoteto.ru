<template lang="pug">
header
  app-title
  app-nav
app-dev
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
