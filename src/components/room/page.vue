<template lang="pug">
section
  header(:style="{ background: pubGradient(pub, 90) }") {{ pub }}
</template>

<script setup>
import { enterRoom } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});

enterRoom(props.pub);
</script>

<style lang="stylus" scoped></style>