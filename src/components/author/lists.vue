<template lang="pug">
.panel
  .rooms(v-if="Object.keys(user.ownRooms).length > 0")
    h2 Владелец комнат
    room-badge.card(
      v-for="(room, pub) in user.ownRooms",
      :key="room",
      :pub="pub"
    ) 
</template>

<script setup>
import { user } from "store@user";
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  display: block
</style>