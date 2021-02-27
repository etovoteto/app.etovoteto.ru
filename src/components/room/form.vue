<template lang="pug">
form.flex.flex-col(@submit.prevent)
  input.p-4.mb-4.text-center.text-xl(v-model="newRoom.title")
  button.p-4.rounded-full.bg-warm-gray-300(
    @click="create()",
    v-if="newRoom.title.length > 3"
  ) Создать
</template>

<script setup>
import { createRoom, newRoom } from "model@room";
import { useRouter } from "vue-router";
const router = useRouter();
async function create() {
  const roomPub = await createRoom();
  router.push({ path: "/room/" + roomPub });
}
</script>

<style lang="stylus" scoped></style>