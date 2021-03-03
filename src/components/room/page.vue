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
  .flex INFO
    p {{ info }}
    input(v-model="edit.desc")
    button(@click="saveDesc()") SAVE
  .flex.flex-col
    .flex.flex-col.py-2(v-for="(cert, tag) in certs", :key="tag") 
      .font-bold {{ tag }}
      .text-xs {{ cert }}
</template>

<script setup>
import { enterRoom, currentRoom, useRoomCerts } from "store@room";
import { favRoom, unFavRoom, useRoom } from "model@room";
import { pubGradient } from "use@colors";
import { defineProps, reactive, watchEffect } from "vue";
import { useTitle } from "@vueuse/core";
import { gun } from "store@db";

function updateRoomTitle() {
  console.log("updating");
}

const props = defineProps({
  pub: String,
});

const info = reactive({});

const edit = reactive({
  desc: "test",
});

gun
  .get("~" + props.pub)
  .get("info")
  .map()
  .on((d, k) => {
    info[k] = d;
  });

async function saveDesc() {
  let cert = await gun
    .get("~" + props.pub)
    .get("cert")
    .get("info")
    .then();
  gun
    .get("~" + props.pub)
    .get("info")
    .get("desc")
    .put(edit.desc, null, { opt: { cert } });
}

const room = useRoom(props.pub);

const title = useTitle(room.title);

const certs = useRoomCerts();
</script>

<style lang="stylus" scoped></style>