<template lang="pug">
app-header
link-card
router-view(v-slot="{Component}")
  transition(name="fade")
    component(:is="Component", :key="state.room")
app-dev
transition(name="fade")
  .auth(v-if="!author.is?.pub")
    p {{ author }}
    my-auth
</template>

<script setup >
import { state, enterRoom } from "model@room";
import { author } from "model@author";
import { pubGradient } from "use@colors";
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
main
  display: flex
  flex-flow: column
  justify-content: center
  background-color: var(--background)

header
  background-color: var(--top-bar)
  width: 100%
  display: flex
  flex-flow: column
  align-items: center

h1
  text-align: center
  margin: 2em 0 1em 0

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

  form
    max-width: 55ch
    margin: 10em
</style>
