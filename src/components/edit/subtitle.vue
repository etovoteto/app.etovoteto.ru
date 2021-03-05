<template lang="pug">
.subtitle(v-if="text || editable")
  .mb-2.flex.items-center.border-b.border-solid.border-warm-gray-800
    .text-base.opacity-50
      slot
    .spacer
    button.p-2(@click="open = !open", v-if="editable && !open")
      i.iconify(data-icon="la:pen-alt")
    button.p-2(v-if="open", @click="update()")
      i.iconify(data-icon="la:check")
    button.p-2(v-if="open", @click="open = false")
      i.iconify(data-icon="la:times")
  .text(v-if="text && !open") {{ text }}
  form.w-full(v-if="open", @submit.prevent="")
    textarea.w-full(
      v-model="text",
      name="subtitle",
      @keyup.meta.enter="update()",
      @keyup.ctrl.enter="update()",
      :rows="10",
      :cols="30"
    )
</template>

<script setup >
import { defineEmit, ref, defineProps, reactive, watchEffect } from "vue";

const emit = defineEmit(["update"]);

const props = defineProps({
  text: String,
  editable: Boolean,
});

const text = ref("");
const open = ref(false);

watchEffect(() => {
  text.value = props.text;
});

function update() {
  emit("update", text.value);
  open.value = false;
}
</script>

<style lang="stylus" scoped>
.edit
  cursor: pointer
  padding: 8px
  border-radius: 4em
  color: var(--text-color)

.edit:hover
  opacity: 1

.subtitle
  margin: 0
  position: relative
  hyphens: auto
  display: flex
  flex-flow: column

textarea
  width: 90%
  height: 100px
</style>