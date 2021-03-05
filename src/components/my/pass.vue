<template lang="pug">
.flex.flex-col
  .text-base(v-if="pass.pair") 
    span.mr-2
      i.iconify(data-icon="la:check")
    span Пароль установлен
      span.mx-2.underline.cursor-pointer(@click="pass.show = !pass.show") Показать
  .text-center.text-2xl.py-4(v-if="pass.show") {{ pass.is }}
  input.p-4.mt-4(
    v-model="pass.text",
    placeholder="Придумайте пароль > 5 символов"
  )
  button.mt-4.p-4.bg-warm-gray-200(
    @click="setPass(pass.text)",
    v-if="pass.text.length > 5"
  ) Задать
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { gun, sea } from "store@db";
import { asyncComputed } from "@vueuse/core";

const pass = reactive({
  text: "",
  pair: "",
});
onMounted(() => {
  gun
    .user()
    .get("pass")
    .map()
    .on((d, k) => {
      pass[k] = d;
    });
});

pass.is = asyncComputed(async () => {
  if (pass.password) {
    return await sea.decrypt(pass.password, gun.user()._.sea);
  }
});

async function setPass(password) {
  let pair = gun.user()._.sea;
  let encPair = await sea.encrypt(pair, password);
  let encPass = await sea.encrypt(password, pair);
  gun.user().get("pass").get("pair").put(encPair);
  gun.user().get("pass").get("password").put(encPass);
  pass.text = "";
}
</script>

<style lang="stylus" scoped></style>