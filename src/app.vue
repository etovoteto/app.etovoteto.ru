<template lang="pug">
app-header
app-admin(v-if="account.is?.pub == currentRoom.host", :key="currentRoom.pub")
link-card
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component", :key="currentRoom.pub")
app-lab
</template>

<script setup >
import { currentRoom, enterRoom } from "store@room";
import { account } from "store@account";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
watchEffect(() => {
  if (route.query.room) {
    enterRoom(route.query.room);
  }
});
</script>

<style lang="stylus"></style>
