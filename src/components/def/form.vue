<template lang="pug">
.flex.flex-col
  textarea.text-xl.p-6(
    ref="input",
    placeholder="Придумайте понятие как минимум из двух слов и не короче 10 знаков",
    :rows="3",
    v-model="newDef.def",
    :class="{ valid: isValid }"
  )
  transition(name="fade")
  .flex(v-if="isValid")
    .flex.flex-wrap(v-if="account.is?.pub")
      .part.m-2.py-6.text-2xl.underline.text-center.cursor-pointer.transition-colors.bg-warm-gray-50(
        v-for="(part, key) in parts",
        :key="key",
        @click="addDef(key)",
        :style="{ textDecorationStyle: part.underline }"
      ) {{ part.name }}.
    my-auth(v-else)
</template>

<script setup>
import { newDef, isValid, addDef } from "model@def";
import { parts } from "store@locale";
import { ref } from "vue";
import { onStartTyping } from "@vueuse/core";
import { account } from "store@account";
const input = ref(null);

onStartTyping(() => {
  if (!input.value.active) input.value.focus();
});
</script>

<style lang="stylus" scoped>
.valid
  border: solid 1px green

.part
  flex: 1 1 4em

  &:hover
    background-color: var(--top-bar)
</style>