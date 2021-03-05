<template lang="pug">
form.flex.flex-col(@submit.prevent.stop)
  input.p-6.text-center.text-xl(
    ref="input",
    v-model="newWord.word",
    placeholder="Несуществующее слово"
  )
  .flex(v-if="newWord.word.length > 3")
    .flex.flex-wrap.text-4xl.justify-center.font-bold.select-none(
      v-if="account.is?.pub"
    )
      .letter.m-1.p-1(
        @click="addWord(i)",
        v-for="(letter, i) in capitalFirst(newWord.word).slice('')",
        :class="{ vowel: vowels.includes(letter) }"
      ) {{ letter }}
    my-auth(v-else)
</template>

<script setup>
import { addWord, capitalFirst, newWord, vowels, setStress } from "model@word";
import { ref } from "vue";
import { onStartTyping } from "@vueuse/core";
import { account } from "store@account";
const input = ref(null);

onStartTyping(() => {
  if (!input.value.active) input.value.focus();
});
</script>

<style lang="stylus" scoped>
.letter
  opacity: 0.8
  cursor: default

.vowel
  cursor: pointer
  opacity: 0.9
  text-decoration: underline

  &:hover
    opacity: 1

    &::before
      content: '´'
      position: absolute
</style>