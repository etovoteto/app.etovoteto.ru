<template lang="pug">
form(@submit.prevent)
  input(v-model="newRoom.title")
  button(@click="create()", v-if="newRoom.title.length > 3") Создать
</template>

<script setup>
import { createRoom, newRoom } from "model@room";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { generateWords } from "../../use/randomWords";
const router = useRouter();
async function create() {
  const roomPub = await createRoom();
  router.push({ path: "/room/" + roomPub });
}
</script>

<style lang="stylus" scoped>
form
  width: 100%
  display: flex
  flex-flow: column

  input
    text-align: center
</style>