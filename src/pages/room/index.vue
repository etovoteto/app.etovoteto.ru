<template lang="pug">
main 
  .init(v-if="Object.values(roomCerts).length == 0")
    textarea(v-model="pair")
    button(@click="initCerts(JSON.parse(pair))") Init
  room-current
  room-list
</template>

<script setup>
import { ref } from "vue";
import { initCerts, roomCerts, currentRoom } from "model@room";

const pair = ref("");
</script>

<style lang="stylus" scoped></style>