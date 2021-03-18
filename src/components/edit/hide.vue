<template lang="pug">
span.link.ml-2(
  :class="{ 'text-red-700': isTrashed }",
  v-if="currentRoom.trashing",
  @click.prevent.stop="trashHash(hash, tag)"
)
  i.iconify(data-icon="la:eye-slash")
</template>

<script setup>
import { trashHash, useIsTrashed } from "store@item";
import { currentRoom } from "store@room";

const props = defineProps({
  hash: String,
  tag: String,
});

const isTrashed = useIsTrashed(props.hash);
</script>

<style lang="stylus" scoped>
.link
  @apply: cursor-pointer text-xl transition-colors bg-warm-gray-300 rounded-full py-1 px-2

  &:hover
    @apply: bg-warm-gray-200
</style>