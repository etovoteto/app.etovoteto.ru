<template lang="pug">
.link(
  v-if="linkFrom.hash != record.hash",
  @click="link(record, () => { $router.push('/' + links[record.tag]); })"
)
  i.iconify(data-icon="la:link")
.link(v-else, @click="unlink()")
  i.iconify(data-icon="la:unlink")
</template>

<script setup>
import { isLinking, link, unlink, linkFrom } from "model@link";
import { defineProps } from "vue";
import { links } from "store@locale";

const props = defineProps({
  record: Object,
});
</script>

<style  scoped>
.link {
  @apply text-xl bg-warm-gray-300 rounded-full py-1 px-2 hover:bg-warm-gray-200 cursor-pointer transition-colors;
}
</style>