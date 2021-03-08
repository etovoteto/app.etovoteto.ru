<template lang="pug">
.flex.flex-col.max-w-45ch
  .p-6.flex.flex-col.items-center(
    v-if="currentRoom.pub != pub",
    :style="{ background: pubGradient(pub, 90) }"
  ) 
    edit-title.font-bold.text-2xl(
      :title="room.title",
      @update="setTitle($event, pub)",
      :editable="account.is?.pub == room.host"
    ) Название

  .p-8.my-8.bg-warm-gray-50.text-xl.text-center.shadow-sm
    edit-subtitle(
      :text="room.info.desc",
      @update="setInfo('desc', $event, pub)",
      :editable="account.is?.pub == room.host"
    )
  .flex.bg-warm-gray-50.mb-4.py-4.shadow-sm
    .px-4.py-2.text-lg Ведущий
    author-badge(:pub="room.host")
    .spacer
    button.bg-warm-gray-300.p-2.px-4.mx-2(
      v-if="currentRoom.pub != pub",
      @click="enterRoom(pub)"
    ) Войти
  room-big-counters(:pub="pub", :info="room.info")
  util-share
</template>

<script setup>
import { enterRoom, currentRoom, appPub } from "store@room";
import { useRoom, setInfo, setTitle } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps, reactive, watchEffect } from "vue";
import { useTitle } from "@vueuse/core";
import { gun } from "store@db";
import { account } from "store@account";
const props = defineProps({
  pub: {
    type: String,
    default: currentRoom.pub,
  },
});

const room = useRoom(props.pub);

const title = useTitle(room.title);
</script>

<style lang="stylus" scoped></style>