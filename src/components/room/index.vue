<template lang="pug">
.room
  h1 ROOM
  user-avatar(:pub="pair.pub")
  button(@click="enterRoom()") Enter
  button(@click="genPair()") Generate
  button(@click="certify()") Certify
  p {{ cert }}

  button(@click="addWord(undefined, undefined, pair.pub)") Add word
  button(@click="addWord(undefined, undefined, pair.pub, cert)") Add word cert
  section
    .word(v-for="(record, key) in words", :key="key")
      word-title(:word="record.word", :stress="record.stress")
      user-avatar(:pub="key.slice(0, 88)", size="small")
</template>

<script setup>
import { sea, gun } from "store@gun-db";
import { ref } from "vue";
import { user } from "store@user";
import { addWord } from "store@word";

const pair = ref({});
const words = ref({});
const cert = ref();
const banlist = ref("");

async function genPair() {
  pair.value = await sea.pair();
  certify();
  gun
    .get("~" + pair.value.pub)
    .get("#words")
    .map()
    .on((d, k) => {
      words.value[k] = JSON.parse(d);
    });
}
genPair();

async function certify() {
  cert.value = await sea.certify(
    "*",
    { "*": "/#words", "+": "*" },
    pair.value,
    null,
    {
      blacklist: "banlist",
    }
  );
}

function toBan(pub) {
  console.log("ban " + pub);
  gun.user().get("banlist").get(pub).put(true);
}

function enterRoom() {
  console.log("entering");
}
</script>

<style lang="stylus" scoped></style>