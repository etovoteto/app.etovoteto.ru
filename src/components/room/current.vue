<template lang="pug">
section.current CURRENT ROOM
.id(
  :style="{ background: pubGradient(currentRoom.pub, 90) }",
  :class="{ my: user.ownRooms[currentRoom.pub] }"
) {{ currentRoom.pub }}
  .init(v-if="!checkCerts")
    textarea(v-model="pair")
    button(@click="initRoom(JSON.parse(pair))") Init
</template>

<script setup>
import { computed, ref } from "vue";
import { currentRoom, useRoomCerts, initRoom } from "../../model/room";
import { model } from "../../store/locale";
import { user } from "../../store/user";
import { pubGradient } from "../../use/colors";
const pair = ref("");

const checkCerts = computed(() => {
  let certCount = Object.values(useRoomCerts()).length;
  let modelCount = Object.keys(model).length;
  return certCount == modelCount;
});
</script>

<style lang="stylus" scoped>
.my
  font-weight: bold
</style>