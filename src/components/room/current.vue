<template lang="pug">
section.current CURRENT ROOM
.id(:style="{ background: pubGradient(currentRoom.pub, 90) }") {{ currentRoom.pub }}
  .init(v-if="Object.values(roomCerts).length == 0")
    textarea(v-model="pair")
    button(@click="initCerts(JSON.parse(pair))") Init
</template>

<script setup>
import { ref } from "vue";
import { currentRoom, roomCerts, initCerts } from "../../model/room";
import { pubGradient } from "../../use/colors";
const pair = ref("");
</script>

<style lang="stylus" scoped></style>