<template lang="pug">
aside
  .profile
    user-avatar(:pub="user.is?.pub")
    p {{ user.is?.pub }}
  .list
    .player(v-for="(player, key) in players", :key="player") 
      user-avatar(:pub="key", size="small")
      h2 {{ player.name }}
    button(@click="addPlayer()")
      i.iconify(data-icon="la:plus")
</template>

<script setup>
import { user } from "store@user";
import { reactive, ref } from "vue";
import { generateWords } from "use@randomWords";
import { sea } from "../../store/gun-db";
const players = ref({});

async function addPlayer() {
  let pair = await sea.pair();
  players.value[pair.pub] = {
    name: generateWords(),
    pair,
  };
}
</script>

<style lang="stylus" scoped></style>