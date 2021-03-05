<template lang="pug">
.flex.flex-col
  .text-2xl(v-if="!edit") {{ title }}
    span.p-3(v-if="editable", @click="edit = true")
      i.iconify(data-icon="la:pen")
  input.min-w-full.p-4(
    v-else,
    ref="input",
    @keyup.enter="$emit('update', $event.target.value); edit = false",
    @blur="edit = false",
    @keyup.esc="edit = false",
    type="text",
    :value="title"
  )
</template>

<script setup >
import { onStartTyping } from "@vueuse/core";
import { defineEmit, ref, defineProps, onMounted, watchEffect } from "vue";

defineEmit(["update"]);
const props = defineProps({
  editable: Boolean,
  title: String,
});
const edit = ref(false);

const input = ref(null);

watchEffect(() => {
  if (edit) {
    if (input.value && !input.value.active) input.value.focus();
  }
});

onStartTyping(() => {
  if (!input.value.active) input.value.focus();
});
</script>

<style lang="stylus" scoped></style>