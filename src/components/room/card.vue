<template lang="pug">
router-link.room(
  :to="{ path: '/room/' + pub }",
  :style="{ background: pubGradient(pub, 90) }"
) 
  author-avatar(:pub="room.owner", size="small")
  .title {{ room.title }}
  .spacer
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { gun } from "../../store/db";
import { pubGradient } from "../../use/colors";

const props = defineProps({
  pub: String,
});

const room = reactive({
  title: "",
  owner: "",
});

gun
  .get("~" + props.pub)
  .get("title")
  .on((d) => {
    room.title = d;
  });

gun
  .get("~" + props.pub)
  .get("owner")
  .on((d) => {
    room.owner = d;
  });
</script>

<style lang="stylus" scoped>
.room
  display: flex
  align-items: center
</style>