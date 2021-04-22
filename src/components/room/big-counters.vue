<template lang="pug">
.flex.flex-col
  .row(
    v-for="(item, tag, i) in items",
    :key="tag"
    v-motion,
    :initial="{ opacity: 0, y: 20 }",
    :enter="{ opacity: 1, y: 0, scale: 1 }",
    :visible="{ opacity: 1, y: 0, scale: 1 }",
    :delay="i * 100 + 100")
    router-link.flex.items-center.w-full(:to="'/' + tag", @click="enterRoom(pub)")
      .p-1 {{ item.title }}
      .spacer
      .flex.items-center
        .p-1
          i.iconify(data-icon="la:comment-dots")
        .whitespace-nowrap.p-2 {{ item.count }}
    edit-subtitle.font-normal.text-lg.text-left(
      @click.prevent.stop,
      :text="item.info",
      @update="setInfo(tag + 'Desc', $event, pub)",
      :editable="account.is?.pub == currentRoom.host"
    ) {{ item.label }}

</template>

<script setup>
import { reactive, computed } from 'vue'
import { useCount, countAuthors } from "store@list";
import { enterRoom, currentRoom } from "store@room";
import { setInfo } from "model@room";
import { account } from "store@account";
const props = defineProps({
  pub: String,
  info: Object,
});

const items = reactive({
  word: {
    title: "Слова",
    label: "Какие слова здесь собирают?",
    info: computed(() => props.info?.wordDesc),
    count: useCount("word", true, props.pub),
  },
  def: {
    title: "Определения",
    label: "Какие определения подходят сюда?",
    info: computed(() => props.info?.defDesc),
    count: useCount("def", true, props.pub),
  },
  author: {
    title: "Авторы",
    label: "Кто те, кто пользуется этими словами и понятиями?",
    info: computed(() => props.info?.authorDesc),
    count: countAuthors(props.pub),
  },
  room: {
    title: "Комнаты",
    label: "Для чего предназначены комнаты внутри этой?",
    info: computed(() => props.info?.roomDesc),
    count: useCount("room", true, props.pub),
  },
})

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