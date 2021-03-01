<template lang="pug">
.flex.flex-col.items-center
  button(@click="showPair('text')") 
    i.iconify(data-icon="la:key")
    .title Показать ключ
  transition(name="fade")
    textarea.key(rows="6", v-if="pair && show.text", :value="pair") 
  button(@click="showPair('qr')") 
    i.iconify(data-icon="la:qrcode")
    .title QR-ключ
  transition(name="fade")
    qr-code(v-if="pair && show.qr", :data="pair")
  button(@click="downloadPair()") 
    i.iconify(data-icon="la:download")
    .title Скачать ключ
  button(@click="logOut()") 
    i.iconify(data-icon="la:sign-out-alt")
    .title Выйти
</template>

<script setup>
import { reactive, ref } from "vue";
import { downloadPair, logOut } from "store@account";

const pair = ref();
const show = reactive({
  text: false,
  qr: false,
});

function showPair(view) {
  if (!pair.value) {
    pair.value = JSON.stringify(gun.user()._.sea);
    show[view] = true;
  } else {
    pair.value = null;
    show[view] = false;
  }
}
</script>

<style  scoped>
button {
  @apply my-1 py-2 px-3 bg-warm-gray-300;
}
</style>