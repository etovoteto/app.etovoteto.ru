<template lang="pug">
.flex.flex-col.min-w-full.items-center
  author-profile.shadow-xl.z-2.bg-warm-gray-100.min-w-full(
    :pub="pub",
    :key="pub"
  )
  .flex.flex-col.items-center.max-w-55ch.bg-warm-gray-50.w-full.p-6
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