<template lang="pug">
.flex.flex-wrap.items-center
  .font-bold.text-lg Владелец
  room-badge(v-for="(host, id) in rooms.host", :key="host", :pub="id")
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});

import { useRooms } from "model@author";

const rooms = useRooms(props.pub);
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  display: block
</style>