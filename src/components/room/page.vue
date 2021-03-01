<template lang="pug">
main
  .p-6.text-xl(:style="{ background: pubGradient(pub, 90) }") 
    edit-title(
      :title="room.title",
      @update="updateRoomTitle()",
      :editable="true"
    )
    button.bg-warm-gray-300.py-2.px-4(
      v-if="state.room != pub",
      @click="enterRoom(pub)"
    ) Войти
    transition(name="fade")
    button.bg-warm-gray-300.py-2.px-4(
      @click="favRoom(pub)",
      v-if="!room.isFav"
    )
      i.iconify(data-icon="la:star-solid")
    button.bg-warm-gray-300.py-2.px-4(@click="unFavRoom(pub)", v-else)
      i.iconify(data-icon="la:star")
  room-counters(:pub="pub")
</template>

<script setup>
import { enterRoom, state } from "store@room";
import { favRoom, unFavRoom, isFav, useRoom } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps, reactive } from "vue";

function updateRoomTitle() {
  console.log("updating");
}

const props = defineProps({
  pub: String,
});

const room = useRoom(props.pub);
</script>

<style lang="stylus" scoped>
.head
  flex: 1 1 100%
  padding: 2em

  h1
    margin: 1em
</style>