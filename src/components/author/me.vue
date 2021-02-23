<template lang="pug">
.profile
  author-avatar(:pub="user.is?.pub", size="big")
  h2 {{ user.profile.name }}
  input(v-model="name")
  .rooms
    .room(v-for="(room, pub) in rooms", :key="room") {{ pub }}
  button(@click="logOut()") log out
</template>

<script setup>
import { user, logOut } from "store@user";
import { reactive, ref, watchEffect } from "vue";
import { gun } from "store@db";
const name = ref("");
watchEffect(() => {
  if (name.value) {
    gun.user().get("profile").get("name").put(name.value);
  }
});

const rooms = ref({});
gun
  .user()
  .get("myRooms")
  .map()
  .once((d, k) => {
    rooms.value[k] = d;
  });
</script>

<style lang="stylus" scoped>
.profile
  display: flex
  flex-flow: column

.rooms
  display: flex
</style>