<template lang="pug">
.flex.flex-col.items-center.max-w-45ch
  author-profile(:pub="pub", :key="pub")
  author-counters.w-full(:pub="pub")
  .flex.flex-col.items-center.p-6
    router-view(v-slot="{ Component }")
      transition(name="fade")
        component(:is="Component")
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pub: String,
});
</script>

<style lang="stylus" scoped></style>