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
        v-if="currentRoom.pub != pub",
        @click="enterRoom(pub)"
      ) Войти
      edit-fav(:pub="pub")
  room-pub-counters(:pub="pub")
</template>

<script setup>
import { enterRoom, currentRoom } from "store@room";
import { favRoom, unFavRoom, useRoom } from "model@room";
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