<template lang="pug">
.flex.flex-col.text-center.mb-2(v-if="title || editable")
  .flex.items-center.px-1.text-xs.border-b.border-warm-gray-800.border-solid(
    v-if="editable"
  )
    slot
    .spacer
    button.p-1(v-if="editable", @click="edit = !edit")
      i.iconify(data-icon="la:pen")
  .p-1(v-if="!edit") {{ title }}
  input.min-w-full.p-4(
    v-if="editable && edit",
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