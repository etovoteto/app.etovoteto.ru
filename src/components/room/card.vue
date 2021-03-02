<template lang="pug">
router-link.p-4.my-2.flex.flex-col.items-center(
  :to="{ path: '/room/' + pub }",
  :style="{ background: pubGradient(pub, 90) }"
) 
  author-badge(:pub="room.host")
  .text-2xl {{ room.title }}
  room-counters(:pub="pub")
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { gun } from "store@db";
import { pubGradient } from "use@colors";

const props = defineProps({
  pub: String,
  data: Object,
});

const room = reactive({
  title: "",
  host: "",
});

gun
  .get("~" + props.pub)
  .get("title")
  .on((d) => {
    room.title = d;
  });

gun
  .get("~" + props.pub)
  .get("host")
  .on((d) => {
    room.host = d;
  });
</script>

<style lang="stylus" scoped></style>