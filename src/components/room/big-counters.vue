<template lang="pug">
.flex.flex-col
  router-link(to="/word", @click="enterRoom(pub)")
    .flex.flex-col.items-start
      .title Слова
      edit-subtitle(
        @click.prevent.stop,
        :text="info.wordDesc",
        @update="setInfo('wordDesc', $event, pub)",
        :editable="account.is?.pub == currentRoom.host"
      )
      edit-subtitle(:value="info.wordDesc")
    .spacer
    span
      i.iconify(data-icon="la:comment-dots")
    .tag {{ words }}

  router-link(to="/def", @click="enterRoom(pub)")
    .title Определения
    .spacer
    .icon
      i.iconify(data-icon="la:comment")
    .tag {{ defs }}

  router-link(to="/author", @click="enterRoom(pub)") 
    .title Авторы
    .spacer
    span
      i.iconify(data-icon="la:users")
    .tag {{ authors }}

  router-link(to="/room", @click="enterRoom(pub)") 
    .title Комнаты
    .spacer
    span
      i.iconify(data-icon="la:comments")
    .tag {{ rooms }}
</template>

<script setup>
import { useCount, countAuthors } from "store@list";
import { enterRoom, currentRoom } from "store@room";
import { setInfo } from "model@room";
import { account } from "store@account";
const props = defineProps({
  pub: String,
  info: Object,
});

const words = useCount("word", true, props.pub);
const defs = useCount("def", true, props.pub);
const authors = countAuthors(props.pub);
const rooms = useCount("room", true, props.pub);
</script>

<style lang="stylus" scoped>
a
  @apply: p-8 my-4 text-2xl flex text-center items-center bg-warm-gray-100 shadow-lg

  &:hover
    @apply: shadow-xl bg-warm-gray-50
</style>