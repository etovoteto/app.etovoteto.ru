<template lang="pug">
.panel
  .rooms(v-if="Object.keys(author.ownRooms).length > 0")
    h2 Владелец комнат
    room-badge.card(
      v-for="(room, pub) in author.ownRooms",
      :key="room",
      :pub="pub"
    ) 
</template>

<script setup>
import { author } from "model@author";
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  display: block
</style>