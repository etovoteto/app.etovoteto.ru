<template lang="pug">
.panel
  .rooms(v-if="Object.keys(account.room.host).length > 0")
    h2 Владелец комнат
    room-badge.card(
      v-for="(room, pub) in account.room.host",
      :key="room",
      :pub="pub"
    ) 
</template>

<script setup>
import { account } from "model@author";
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  display: block
</style>