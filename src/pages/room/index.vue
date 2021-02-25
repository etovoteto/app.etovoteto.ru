<template lang="pug">
main 
  room-current(v-if="!state.isRoot")
  room-list
</template>

<script setup>
import { state } from "model@room";
</script>

<style lang="stylus" scoped></style>