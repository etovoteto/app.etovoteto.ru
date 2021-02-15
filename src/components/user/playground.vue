<template lang="pug">
.panels
  section
    author-profile
    room-list
    author-list
  section.room
    room(v-if="user.room?.pub", :key="user.room?.pub")
    room-browse(v-else)
</template>

<script setup>
import { user } from "../../store/user";
</script>

<style lang="stylus" scoped>
.panels
  display: flex

section
  padding: 4em 1em
  display: flex
  flex-flow: row wrap

  > div
    padding: 2em

  &.players
    display: flex
    flex-flow: row nowrap
</style>