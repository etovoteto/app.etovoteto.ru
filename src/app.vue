<template lang="pug">
app-header
link-card
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component", :key="state.room")
app-dev
transition(name="fade")
  .auth(v-if="!account.is?.pub")
    p {{ account }}
    my-auth
</template>

<script setup >
import { state, enterRoom } from "store@room";
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

<style lang="stylus">
.auth
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: var(--background-transparent)
  display: flex
  flex-flow: column
  align-items: center
</style>
