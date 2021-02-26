<template lang="pug">
.card
  .content
    router-link.word(
      :to="'/word/' + safeHash(record.hash)",
      :title="record.timestamp"
    )
      span(v-if="record", v-html="renderWord(record.word, record.stress)")
    author-dots(:authors="record.authors")
    .spacer
    link-button(:record="record")

  .links(v-if="record != linkFrom")
    transition-group(name="list")
      def-link(
        v-for="(linker, hash) in links",
        :key="hash + linker",
        :linker="linker",
        :hash="hash"
      )
</template>

<script setup>
import { defineProps } from "vue";
import { renderWord } from "model@word";
import { useLinks, linkFrom } from "model@link";
import { safeHash } from "../../store/db";

const props = defineProps({
  record: Object,
});
const { links } = useLinks(props.record.hash);
</script>

<style lang="stylus" scoped>
.card
  padding: 2em
  margin: 1em
  display: flex
  flex-flow: row wrap
  align-items: center
  background-color: var(--background-alt)

  .content
    width: 100%
    color: var(--text-light)
    display: flex
    align-items: center
    flex-flow: row

.word
  font-size: 1.7em
  font-weight: bold
</style>