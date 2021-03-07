<template lang="pug">
.flex.flex-col.items-stretch.bg-warm-gray-100
  .flex.flex-wrap.p-2.items-center
    span.text-xl.ml-3.mr-1
      i.iconify(data-icon="la:lock")
    .spacer
    button(@click="show('pass')") 
      i.iconify(data-icon="la:asterisk")
    button(@click="show('text')") 
      i.iconify(data-icon="la:eye")
    button(@click="show('qr')") 
      i.iconify(data-icon="la:qrcode")
    button(@click="downloadPair()") 
      i.iconify(data-icon="la:file-code")
    button(@click="show('test')", v-if="lab") 
      i.iconify(data-icon="la:flask")
    .spacer
    button.leave(@click="logOut()") 
      i.iconify(data-icon="la:sign-out-alt")
  .flex.py-8.w-full.justify-center(v-if="current")
    transition-group(name="fade")
      my-pass(key="pass", v-if="current == 'pass'")
      textarea.key(
        rows="6",
        v-if="current == 'text'",
        :value="pair",
        key="text"
      ) 
      util-qr(v-if="current == 'qr'", :data="pair", key="qr")
      .flex.flex-col(v-if="current == 'test' && lab", key="lab")
        .text-lg.text-center.mb-2 Тестовый автор
        .text-center Создан вовремя разработки и открыт для всех
        button.mt-4.p-2.bg-warm-gray-200(@click="unTest()") Стать самостоятельным
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { downloadPair, logOut } from "store@account";
import { gun } from "store@db";
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

const lab = ref(false);

onMounted(() => {
  gun
    .user()
    .get("test")
    .on((d, k) => {
      lab.value = d;
    });
});
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