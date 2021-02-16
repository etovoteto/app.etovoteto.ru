<template lang="pug">
.list
  button(@click="addPlayer()")
    i.iconify(data-icon="la:plus")
  .player(v-for="(player, key) in players", :key="player") 
    user-avatar(:pub="key", size="small", @click="authUser(player.pair)")
</template>

<script setup>
import { reactive, ref } from "vue";
import { generateWords } from "use@randomWords";
import { sea } from "store@gun-db";
import { authUser } from "../../store/user";
const players = ref({});

async function addPlayer() {
  let pair = await sea.pair();
  players.value[pair.pub] = {
    name: generateWords(),
    pair,
  };
}
</script>

<style lang="stylus" scoped>
.list
  z-index: 10
  position: fixed
  top: 1em
  right: 1em

.player
  display: flex
  align-items: center
</style>