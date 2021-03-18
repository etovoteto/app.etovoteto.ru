<template lang="pug">
.flex(v-if="account.is?.pub")
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
    i.iconify(data-icon="la:eye-slash")
  .link.ml-2(
    :class="{ 'text-red-700': isMyTrashed }",
    v-if="record.authors[account.is?.pub]",
    @click="trashMyHash(record.hash, record.tag)"
  )
    i.iconify(data-icon="la:eye-slash")
</template>

<script setup>
import { link, linkFrom } from "model@link";
import { defineProps, ref } from "vue";
import { links } from "store@locale";
import { currentRoom } from "store@room";
import {
  trashHash,
  useIsTrashed,
  trashMyHash,
  useIsMyTrashed,
} from "store@item";
import { account } from "store@account";

const props = defineProps({
  record: Object,
});

const isTrashed = useIsTrashed(props.record.hash);
const isMyTrashed = useIsMyTrashed(props.record.hash);
</script>

<style lang="stylus" scoped>
.link
  @apply: cursor-pointer text-xl transition-colors bg-warm-gray-300 rounded-full py-1 px-2

  &:hover
    @apply: bg-warm-gray-200
</style>