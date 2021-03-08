<template lang="pug">
router-link(to="/word", @click="enterRoom(pub)")
  .flex.flex-col.items-start
    .title Слова
    edit-subtitle.font-normal.text-lg.text-left(
      @click.prevent.stop,
      :text="info.wordDesc",
      @update="setInfo('wordDesc', $event, pub)",
      :editable="account.is?.pub == currentRoom.host"
    )
  .spacer
  .flex
    span
      i.iconify(data-icon="la:comment-dots")
    .tag {{ count }}
</template>

<script setup>
import { useCount, countAuthors } from "store@list";
import { enterRoom, currentRoom } from "store@room";
import { setInfo } from "model@room";
import { account } from "store@account";
const props = defineProps({
  tag: String,
  pub: String,
  info: Object,
});

const count = useCount(props.tag, true, props.pub);
</script>

<style lang="stylus" scoped>
a
  @apply: p-8 my-4 text-2xl flex text-center items-center bg-warm-gray-100 shadow-lg

  &:hover
    @apply: shadow-xl bg-warm-gray-50
</style>