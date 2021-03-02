<template lang="pug">
main
  room-form
  room-list
</template>

<script setup>
import { useTitle } from "@vueuse/core";
const title = useTitle("Комнаты | ЭТОВОТЭТО");
</script>

<style lang="stylus" scoped></style>