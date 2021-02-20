<template lang="pug">
main 
  .init(v-if="Object.values(roomCerts).length == 0")
    textarea(v-model="pair")
    button(@click="initRoom(JSON.parse(pair))") Init
  room-page
  room-list
</template>

<script setup>
import { ref } from "vue";
import { initRoom, roomCerts } from "model@room";

const pair = ref("");
</script>

<style lang="stylus" scoped></style>