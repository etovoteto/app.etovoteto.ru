<template lang="pug">
form(@submit.prevent.stop)
  input(type="text", v-model="author.name")
  button(@click="addPlayer()")
    i.iconify(data-icon="la:plus")
</template>

<script setup>
import { sea } from "store@gun-db";
import { reactive } from "vue";
import { authUser } from "store@user";

const author = reactive({
  name: "",
});

async function addPlayer() {
  let pair = await sea.pair();
  authUser(pair);
}
</script>

<style lang="stylus" scoped>
.list
  padding: 1em

.player
  display: flex
  align-items: center
</style>