<template lang="pug">
button.bg-warm-gray-300.py-2.px-4(
  @click.stop.prevent="favRoom(pub)",
  v-if="!fav"
) 
  i.iconify(data-icon="la:star-solid")
button.bg-warm-gray-300.py-2.px-4(v-else, @click.stop.prevent="unFavRoom(pub)")
  i.iconify(data-icon="la:star")
</template>

<script setup>
import { favRoom, unFavRoom, useIsFav } from "model@room";
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});

const { fav } = useIsFav(props.pub);
</script>

<style lang="stylus" scoped></style>