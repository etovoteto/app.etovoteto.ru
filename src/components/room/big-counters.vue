<template lang="pug">
.flex.flex-col
  .row
    router-link.flex.items-center.w-full(to="/word", @click="enterRoom(pub)")
      .p-1 Слова
      .spacer
      .flex.items-center
        .p-1
          i.iconify(data-icon="la:comment-dots")
        .whitespace-nowrap.p-2 {{ words }}
    edit-subtitle.font-normal.text-lg.text-left(
      @click.prevent.stop,
      :text="info.wordDesc",
      @update="setInfo('wordDesc', $event, pub)",
      :editable="account.is?.pub == currentRoom.host"
    ) Какие слова здесь собирают?

  .row
    router-link.flex.items-center.w-full(to="/def", @click="enterRoom(pub)")
      .p-1 Определения
      .spacer
      .flex.items-center
        .p-1
          i.iconify(data-icon="la:comment")
        .whitespace-nowrap.p-2 {{ defs }}
    edit-subtitle.font-normal.text-lg.text-left(
      @click.prevent.stop,
      :text="info.defDesc",
      @update="setInfo('defDesc', $event, pub)",
      :editable="account.is?.pub == currentRoom.host"
    ) Какие определения подходят сюда?

  .row
    router-link.flex.items-center.w-full(to="/author", @click="enterRoom(pub)")
      .p-1 Авторы
      .spacer
      .flex.items-center
        .p-1
          i.iconify(data-icon="la:users")
        .whitespace-nowrap.p-2 {{ authors }}
    edit-subtitle.font-normal.text-lg.text-left(
      @click.prevent.stop,
      :text="info.authorDesc",
      @update="setInfo('authorDesc', $event, pub)",
      :editable="account.is?.pub == currentRoom.host"
    ) Кто те, кто пользуется этими словами и понятиями?

  .row
    router-link.flex.items-center.w-full(to="/room", @click="enterRoom(pub)")
      .p-1 Комнаты
      .spacer
      .flex.items-center
        .p-1
          i.iconify(data-icon="la:comments")
        .whitespace-nowrap.p-2 {{ rooms }}
    edit-subtitle.font-normal.text-lg.text-left(
      @click.prevent.stop,
      :text="info.roomDesc",
      @update="setInfo('roomDesc', $event, pub)",
      :editable="account.is?.pub == currentRoom.host"
    ) Для чего создаются новые комнаты внутри этой?
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
.row
  @apply: py-4 px-6 my-4 text-2xl flex flex-col text-center items-center bg-warm-gray-100 shadow-lg

  &:hover
    @apply: shadow-xl bg-warm-gray-50 no-underline
</style>