<template lang="pug">
.flex.flex-col.items-center
  .font-bold.text-2xl Комнаты
  .flex.flex-wrap.items-center
    .font-bold.text-lg(v-if="Object.keys(rooms.host).length > 0") Авторские
    room-badge(v-for="(host, id) in rooms.host", :key="host", :pub="id")
  .flex.flex-wrap.items-center
    .font-bold.text-lg(v-if="Object.keys(rooms.fav).length > 0") Избранные
    room-badge(v-for="fav in favourites", :key="fav", :pub="fav") 
      span.pl-1(
        @click.prevent.stop="unFavRoom(fav)",
        v-if="account.is?.pub == pub"
      )
        i.iconify(data-icon="la:times")
</template>

<script setup>
import { computed, defineProps } from "vue";
import { unFavRoom } from "model@room";
import { account } from "store@account";

const props = defineProps({
  pub: String,
});

import { useRooms } from "model@author";

const rooms = useRooms(props.pub);

const favourites = computed(() => {
  let favs = [];
  for (let fav in rooms.fav) {
    if (rooms.fav[fav]) {
      favs.push(fav);
    }
  }
  return favs;
});
</script>

<style lang="stylus" scoped>
.card
  padding: 1em
  display: block
</style>