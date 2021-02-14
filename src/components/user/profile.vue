<template lang="pug">
article
  slot(:pub="pair?.pub")
  p {{ pair.pub }}
  button(@click="generateUser()") Generate
  user-avatar(:pub="pair?.pub", @click="authUser()")
  button(@click="addWord()") add
</template>

<script setup>
import { sea, gun, appPath } from "store@gun-db";
import { defineProps, ref } from "vue";
import { logOut } from "store@user";
import { generateRecord } from "store@word";

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

async function addWord() {
  let { text, hash } = await generateRecord();
  gun
    .get("~" + props.main)
    .get(appPath)
    .get("#words")
    .get(pair.value.pub + "#" + hash)
    .put(
      text,
      (d) => {
        if (d.err) console.log(d.err);
      },
      { opt: { cert: props.cert } }
    );
}
</script>

<style lang="stylus" scoped></style>