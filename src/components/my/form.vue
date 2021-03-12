<template lang="pug">
form.flex.flex-col.items-center.text-center.border.border-solid.border-warm-gray-400.rounded-xl.p-2.mt-8.max-w-45ch(
  @submit.prevent.stop
)
  .text-2xl.text-center Впервые здесь?
  .text-lg.mt-4 Представьтесь
  input(
    type="text",
    v-model="author.name",
    placeholder="Ваше имя или псевдоним"
  )
  button.action.p-4(v-if="author.name", @click="generate()") 
    i.iconify(data-icon="la:key")
    .text Сгенерировать ключ
  author-avatar.my-4(:v-if="author.pair", :pub="author.pair?.pub", size="240")
  button.action.p-4.mb-4(
    v-if="author.name && author.pair",
    @click="participate(author.pair, author.name)"
  ) 
    i.iconify(data-icon="la:plus")
    .text Стать автором
</template>

<script setup>
import { participate } from "store@account";
import { reactive, ref } from "vue";
import { sea } from "store@db";

const author = reactive({
  name: "",
  pair: null,
});

async function generate() {
  author.pair = await sea.pair();
}
</script>

<style lang="stylus" scoped>
input
  @apply: p-2 my-4 text-center
</style>


