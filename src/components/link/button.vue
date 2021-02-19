<template lang="pug">
button.link(
  v-if="!isLinking(record)",
  @click="link(record, () => { $router.push('/' + links[record.tag]); })"
) 
  i.iconify(data-icon="la:link")
button.link(v-else, @click="unlink()")
  i.iconify(data-icon="la:unlink")
</template>

<script setup>
import { isLinking, link, unlink } from "store@link";
import { defineProps } from "vue";
import { links } from "../../store/model";

const props = defineProps({
  record: Object,
});
</script>

<style lang="stylus" scoped></style>