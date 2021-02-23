<template lang="pug">
section
  header(:style="{ background: pubGradient(pub, 90) }") {{ pub }}
  button(@click="enterRoom(pub); $router.push({ query: { room: pub } })") Enter
  p {{ $route }}
</template>

<script setup>
import { enterRoom } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});
</script>

<style lang="stylus" scoped></style>