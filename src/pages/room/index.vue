<template lang="pug">
main 
  room-current(v-if="currentRoom.pub != appPub")
  room-list
</template>

<script setup>
import { appPub, currentRoom } from "../../model/room";
</script>

<style lang="stylus" scoped></style>