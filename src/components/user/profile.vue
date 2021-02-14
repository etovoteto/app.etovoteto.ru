<template lang="pug">
article
  slot(:pub="pair?.pub")
  p {{ pair.pub }}
  button(@click="generateUser()") Generate
  user-avatar(:pub="pair?.pub", @click="authUser()")
  button(@click="addWord(undefined, undefined, main, cert)") add
</template>

<script setup>
import { sea, gun, appPath } from "store@gun-db";
import { defineProps, ref } from "vue";
import { logOut } from "store@user";
import { generateRecord, addWord } from "store@word";

const props = defineProps({
  main: String,
  cert: String,
});

const pair = ref({});

generateUser();
async function generateUser() {
  pair.value = await sea.pair();
}

function authUser() {
  gun.user().auth(pair.value);
}
</script>

<style lang="stylus" scoped></style>