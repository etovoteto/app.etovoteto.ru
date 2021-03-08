<template lang="pug">
.flex.flex-col.items-stretch
  .flex.flex-wrap.p-2.items-center
    span.text-xl.ml-3.mr-1(@click="show('password')")
      i.iconify(data-icon="la:lock")
    .spacer
    .flex.flex-wrap(v-if="account.is?.pub == pub")
      button(@click="show('pass')") 
        i.iconify(data-icon="la:asterisk")
      button(@click="show('text')") 
        i.iconify(data-icon="la:key")
      button(@click="show('qr')") 
        i.iconify(data-icon="la:qrcode")
      button(@click="downloadPair()") 
        i.iconify(data-icon="la:file-code")
      .spacer
      button.leave(@click="logOut()") 
        i.iconify(data-icon="la:sign-out-alt")
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition-group(name="fade")
      input.text-lg.p-4.my-4(
        v-if="current == 'password' && !account.is?.pub",
        v-model="pass",
        placeholder="Ваш пароль",
        @keyup.enter="logWithPass(pub, $event.target.value)"
      )
      my-pass(key="pass", v-if="current == 'pass'")
      textarea.p-2.text-sm(
        rows="2",
        v-if="current == 'text'",
        :value="pair",
        key="text"
      ) 
      util-qr(v-if="current == 'qr'", :data="pair", key="qr")
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

function unTest() {
  gun.user().get("test").put(null);
}
</script>

<style  scoped>
button,
a {
  @apply mx-2 py-3 px-3 bg-warm-gray-300 rounded-full;
}

button.leave {
  @apply text-red-600;
}
</style>