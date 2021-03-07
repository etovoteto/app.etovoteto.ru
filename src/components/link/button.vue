<template lang="pug">
.link(
  v-if="linkFrom.hash != record.hash",
  @click="link(record, () => { $router.push('/' + links[record.tag]); })"
)
  i.iconify(data-icon="la:link")
.link(v-else, @click="linkFrom = {}")
  i.iconify(data-icon="la:unlink")
.link.ml-2(
  :class="{ 'text-red-700': isTrashed }",
  v-if="currentRoom.trashing",
  @click="trashHash(record.hash, record.tag)"
)
  i.iconify(data-icon="la:trash")
</template>

<script setup>
import { link, linkFrom } from "model@link";
import { defineProps, ref } from "vue";
import { links } from "store@locale";
import { currentRoom } from "store@room";
import { trashHash, useIsTrashed } from "store@item";

const props = defineProps({
  record: Object,
});

const isTrashed = useIsTrashed(props.record.hash);
</script>

<style  scoped>
.link {
  @apply text-xl bg-warm-gray-300 rounded-full py-1 px-2 hover:bg-warm-gray-200 cursor-pointer transition-colors;
}
</style>