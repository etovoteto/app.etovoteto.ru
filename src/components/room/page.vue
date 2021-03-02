<template lang="pug">
main
  .p-6.flex.flex-col.items-start(:style="{ background: pubGradient(pub, 90) }") 
    edit-title.font-bold.text-xl(
      :title="room.title",
      @update="updateRoomTitle()",
      :editable="true"
    )
    author-badge(:pub="room.host")
    .flex.flex-wrap.my-4
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
      button.bg-warm-gray-300.py-2.px-4(v-else, @click="unFavRoom(pub)")
        i.iconify(data-icon="la:star")
  room-counters(:pub="pub")
</template>

<script setup>
import { enterRoom, state } from "store@room";
import { favRoom, unFavRoom, isFav, useRoom } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps, reactive, watchEffect } from "vue";
import { useTitle } from "@vueuse/core";

function updateRoomTitle() {
  console.log("updating");
}

const props = defineProps({
  pub: String,
});

const room = useRoom(props.pub);

const title = useTitle(room.title);
</script>

<style lang="stylus" scoped></style>