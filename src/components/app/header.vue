<template lang="pug">
header(
  :style="{ background: !state.isRoot ? pubGradient(state.room, 90) : 'none' }"
)
  h1 
    router-link(to="/") {{ state.title }}
  app-nav
</template>

<script setup>
import { state } from "../../model/room";
import { pubGradient } from "../../use/colors";
</script>

<style lang="stylus" scoped></style>