<template lang="pug">
.panels
  author-profile
  section
    h1 BOOK
    button(@click="genPair()") Generate
    user-avatar(:pub="pair?.pub", @click="authUser()")
    button(@click="certify()") Certify
    p {{ cert }}
  section
    button(@click="addWord(undefined, undefined, pair.pub)") Add word
    .word(v-for="(record, key) in words", :key="key")
      word-title(:word="record.word", :stress="record.stress")
      user-avatar(:pub="key.slice(0, 88)", size="small")
  section.players
    .players
      user-profile(:main="pair?.pub", :cert="cert", v-slot="{pub}")
        button(v-if="user.is.pub == pair.pub", @click="toBan(pub)") Ban
</template>

<script setup>
import { sea, gun, appPath } from "store@gun-db";
import { ref } from "vue";
import { user } from "store@user";
import { generateRecord, addWord } from "store@word";

gun.on("auth", async () => {
  console.log("auth");
});

const pair = ref({});
const words = ref({});
const cert = ref();
const banlist = ref("");

async function genPair() {
  pair.value = await sea.pair();
  certify();
  gun
    .get("~" + pair.value.pub)
    .get(appPath)
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
    { "*": appPath + "/#words", "+": "*" },
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

function authUser() {
  gun.user().auth(pair.value);
}
</script>

<style lang="stylus" scoped>
.panels
  display: flex

section
  padding: 4em 1em
  display: flex
  flex-flow: row wrap

  > div
    padding: 2em

  &.players
    display: flex
    flex-flow: row nowrap
</style>