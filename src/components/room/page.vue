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
  room-counters(:pub="pub")
</template>

<script setup>
import { enterRoom, state } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps, reactive } from "vue";
import { gun } from "../../store/db";

function updateRoomTitle() {
  console.log("updating");
}

const props = defineProps({
  pub: String,
});

const room = reactive({
  title: "",
});

gun
  .get("~" + props.pub)
  .get("title")
  .on((d) => (room.title = d));
</script>

<style lang="stylus" scoped>
.head
  flex: 1 1 100%
  padding: 2em

  h1
    margin: 1em
</style>