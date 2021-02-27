<template lang="pug">
.buttons
  button(@click="showPair()") 
    i.iconify(data-icon="la:key")
    .title Показать ключ
  button(@click="downloadPair()") 
    i.iconify(data-icon="la:download")
    .title Скачать ключ
  button(@click="logOut()") 
    i.iconify(data-icon="la:sign-out-alt")
    .title Выйти
transition(name="fade")
  textarea.key(v-if="pair", :value="pair") 
</template>

<script setup>
import { ref } from "vue";
import { downloadPair, logOut } from "model@author";

const pair = ref();

function showPair() {
  if (!pair.value) {
    pair.value = JSON.stringify(gun.user()._.sea);
  } else {
    pair.value = null;
  }
}
</script>

<style lang="stylus" scoped>
.buttons
  display: flex
  flex-flow: column
  align-items: center

  button
    margin: 0.2em
</style>