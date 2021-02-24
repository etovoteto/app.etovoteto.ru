a<template lang="pug">
.subtitle(v-if="text || editable")
  .title 
    slot {{ $t('subtitle') }}
    button.edit(@click="open = !open", v-if="editable && !open")
      i.iconify(data-icon="la:pen-alt")
    button.save(v-if="open", @click="update()")
      i.iconify(data-icon="la:check")
    button(v-if="open", @click="open = false")
      i.iconify(data-icon="la:times")
  .text(v-if="text && !open") {{ text }}
  form(v-if="open", @submit.prevent="")
    textarea(
      v-model="text",
      name="subtitle",
      @keyup.meta.enter="update()",
      @keyup.ctrl.enter="update()",
      :rows="10"
    )
</template>

<script setup >
import { defineEmit, ref, defineProps, reactive, watchEffect } from "vue";

const emit = defineEmit(["update"]);

const props = defineProps({
  text: String,
  id: String,
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
.title
  font-size: 0.8em
  padding: 0.5em 0
  color: var(--text-light)

.edit
  cursor: pointer
  padding: 8px
  border-radius: 4em
  color: var(--text-color)

.edit:hover
  opacity: 1

.subtitle
  margin: 1em 0
  position: relative
  hyphens: auto
  display: flex
  flex-flow: row wrap

textarea
  width: 90%
  height: 100px
</style>