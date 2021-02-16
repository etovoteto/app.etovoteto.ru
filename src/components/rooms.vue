<template lang="pug">
main
  section.current
    .id {{ currentRoom.pub }}
    .certs
      .cert(v-for="(cert, key) in currentRoom.certs", :key="key") 
        .key {{ key }}
        .cert {{ cert }}
  section.list
    p list
</template>

<script setup>
import { currentRoom } from "store@room";
</script>

<style lang="stylus" scoped>
section
  padding: 4em 1em
  display: flex
  flex-flow: row wrap

  > div
    padding: 1em

.cert
  display: flex

.key
  font-weight: bold
  padding: 0 1em 0 0
  white-space: nowrap
</style>