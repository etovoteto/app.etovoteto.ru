<template lang="pug">
.flex.flex-col 
  transition-group(name="list")
    room-card(v-for="room in sorted.list", :key="room.pub", :room="room")
    .text-2xl.p-8.bg-warm-gray-300.shadow.animate-pulse.cursor-pointer(
      key="more",
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { search } from "model@room";
import { useRooms } from "model@rooms";
import { defineProps, watchEffect } from "vue";

const props = defineProps({
  pub: String,
});

const { sorted, options, more } = useRooms(props.pub);

watchEffect(() => {
  options.main = "title";
  options.search = search.value;
});
</script>

<style lang="stylus" scoped></style>