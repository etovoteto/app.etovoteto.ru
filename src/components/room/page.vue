<template lang="pug">
main
  .p-6.flex.flex-col.items-start(:style="{ background: pubGradient(pub, 90) }") 
    edit-title.font-bold.text-xl(
      :title="room.title",
      @update="setTitle($event, pub)",
      :editable="account.is?.pub == room.host"
    )
    author-badge(:pub="room.host")
  .flex.bg-warm-gray-50.py-4
    button.bg-warm-gray-300.py-2.px-4.mx-2(
      v-if="currentRoom.pub != pub",
      @click="enterRoom(pub)"
    ) Войти
    edit-fav(:pub="pub")
  room-admin(v-if="account.is?.pub == room.host", :pub="pub")
  .p-4.bg-warm-gray-50.text-lg
    edit-subtitle(
      :text="room.info.desc",
      @update="setInfo('desc', $event, pub)",
      :editable="account.is?.pub == room.host"
    )
  room-pub-counters(:pub="pub")
</template>

<script setup>
import { enterRoom, currentRoom } from "store@room";
import { useRoom, setInfo, setTitle } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps, reactive, watchEffect } from "vue";
import { useTitle } from "@vueuse/core";
import { gun } from "store@db";
import { account } from "store@account";
const props = defineProps({
  pub: String,
});

const room = useRoom(props.pub);

const title = useTitle(room.title);
</script>

<style lang="stylus" scoped></style>