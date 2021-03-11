<template lang="pug">
.flex.flex-col.items-stretch
  .flex.flex-wrap.p-2.items-center.justify-center
    .flex.flex-wrap(v-if="account.is?.pub == pub")
      button(@click="show('pass')") 
        i.iconify(data-icon="la:asterisk")
      button(@click="show('text')") 
        i.iconify(data-icon="la:key")
      button(@click="show('qr')") 
        i.iconify(data-icon="la:qrcode")
      button(@click="downloadPair()") 
        i.iconify(data-icon="la:file-code")
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      my-pass(key="pass", v-if="current == 'pass'")
      textarea.p-2.text-sm(
        rows="2",
        v-if="current == 'text'",
        :value="pair",
        key="text"
      ) 
      author-qr(key="qr", v-if="current == 'qr'", :pair="pair")
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from "vue";
import {
  hasPass,
  logWithPass,
  downloadPair,
  logOut,
  account,
} from "store@account";
import { gun } from "store@db";

const props = defineProps({
  pub: String,
});

const pair = ref(JSON.stringify(gun.user()._.sea));

const current = ref("");
const pass = ref("");

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}
</script>

<style lang="stylus"  scoped>
button, a
  @apply: mx-1 py-3 px-3 bg-warm-gray-300 rounded-full

button.leave
  @apply: text-red-600
</style>