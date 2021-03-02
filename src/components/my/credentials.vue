<template lang="pug">
.flex.flex-wrap.items-center.py-2
  .flex.flex-wrap.p-2.items-center.bg-warm-gray-100.rounded-3xl
    span.text-xl.ml-3.mr-1
      i.iconify(data-icon="la:key")
    button(@click="showPair('text')") 
      i.iconify(data-icon="la:eye")

    button(@click="showPair('qr')") 
      i.iconify(data-icon="la:qrcode")

    button(@click="downloadPair()") 
      i.iconify(data-icon="la:file-code")
  .flex 
    transition(name="fade")
      textarea.key(rows="6", v-if="pair && show.text", :value="pair") 
    transition(name="fade")
      util-qr(v-if="pair && show.qr", :data="pair")
  button.mt-3(@click="logOut()") 
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
button,
a {
  @apply mx-2 py-3 px-3 bg-warm-gray-300 rounded-full;
}
</style>