<template lang="pug">
.flex.flex-col.items-center
  button(@click="showPair()") 
    i.iconify(data-icon="la:key")
    .title Показать ключ
  transition(name="fade")
    textarea.key(rows="6", v-if="pair", :value="pair") 
  button(@click="downloadPair()") 
    i.iconify(data-icon="la:download")
    .title Скачать ключ
  button(@click="logOut()") 
    i.iconify(data-icon="la:sign-out-alt")
    .title Выйти
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

<style  scoped>
button {
  @apply my-1 py-2 px-3 bg-warm-gray-300;
}
</style>