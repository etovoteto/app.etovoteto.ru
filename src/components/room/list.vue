<template lang="pug">
p ROOMS
  button(@click="addRoom()", v-if="user.is")
    i.iconify(data-icon="la:plus")
  .room(v-for="(room, key) in rooms", :key="room") 
    user-avatar(:pub="key", size="medium", @click="enterRoom(key)")
    .name {{ room.name }}
</template>

<script setup>
import { ref } from "vue";
import { sea } from "../../store/gun-db";
import { user } from "../../store/user";
import { generateWords } from "../../use/randomWords";
import { enterRoom } from "use@room";
const rooms = ref({});
async function addRoom() {
  let pair = await sea.pair();
  rooms.value[pair.pub] = {
    name: generateWords(),
    pair,
  };
}
</script>

<style lang="stylus" scoped></style>