<template lang="pug">
router-link.flex.flex-wrap.justify-start.py-6.px-2.my-2.text-xl.items-center.bg-warm-gray-50(
  :to="'/author/' + pub"
)
  .flex.items-center.justify-start.flex-grow
    author-avatar(:pub="pub", size="small")
    .name {{ author.name }}

  .flex.px-4.justify-start
    .p-2
      i.iconify(data-icon="la:comment-dots")
      span {{ count(list.word) }}
    .p-2 
      i.iconify(data-icon="la:comment")
      span {{ count(list.def) }}
    .p-2
      i.iconify(data-icon="la:link")
      span {{ count(list.link) / 2 }}
</template>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { gun } from "store@db";
import { testAuthor } from "model@author";

const props = defineProps({
  pub: String,
  list: Object,
});

function count(list) {
  if (!list) return 0;
  return Object.keys(list).length;
}

const author = reactive({
  name: "",
});

const test = ref("");
const my = gun.get(`~${props.pub}`);

my.get("profile")
  .get("name")
  .on((d) => (author.name = d));

// TESTING AUTHORS
my.get("test").once((d) => {
  test.value = d;
});
</script>

<style lang="stylus" scoped></style>