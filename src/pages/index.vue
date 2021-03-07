<template lang="pug">
room-page(:key="currentRoom.pub", :pub="currentRoom.pub")
</template>

<script setup>
import { currentRoom } from "store@room";
import { useTitle } from "@vueuse/core";
const title = useTitle("Онлайн-словарь ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped>
a
  @apply: p-4 m-4 text-2xl flex text-center items-center bg-warm-gray-100 shadow-lg

  &:hover
    @apply: shadow-xl bg-warm-gray-50
</style>