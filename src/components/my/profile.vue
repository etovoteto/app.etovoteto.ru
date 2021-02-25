<template lang="pug">
.profile
  author-avatar(:pub="user.is?.pub", size="big")
  edit-title.name(
    :title="user.profile.name",
    :editable="true",
    @update="updateName($event)"
  )
  button(@click="logOut()") log out
</template>

<script setup>
import { user, logOut } from "store@user";
import { reactive, ref, watchEffect } from "vue";
import { gun } from "store@db";

const name = ref("");

function updateName(newName) {
  if (newName) {
    gun.user().get("profile").get("name").put(newName);
  }
}
</script>

<style lang="stylus" scoped>
.profile
  display: flex
  flex-flow: column

.name
  font-size: 2em

.rooms
  display: flex
  flex-flow: column
</style>