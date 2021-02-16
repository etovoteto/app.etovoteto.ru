<template lang="pug">
main
  .form
    textarea(:cols="24", :rows="4", v-model="record.sense")
    .generate(@click="generate()")
      i.iconify(data-icon="teenyicons:refresh-alt-solid")

  .parts
    button.part(
      v-for="(part, key) in parts",
      :key="key",
      @click="record.part = key",
      :class="{ active: record.part == key }"
    ) {{ part }}
    button.add(@click="addSense()")
      i.iconify(data-icon="la:plus")

  .list 
    .card(v-for="(sense, key) in sorted.list", :key="sense") 
      .content
        .info {{ parts[sense.part] }}.
        .spacer
        user-avatar(
          v-for="(is, author) in sense.authors",
          :key="author",
          :pub="author",
          size="small"
        )
      .text {{ sense.sense }}
    .more(
      ref="more",
      v-if="sorted.more",
      @click="options.limit += options.page"
    ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import {
  record,
  sorted,
  options,
  parts,
  addSense,
  generate,
  more,
} from "store@sense";
</script>

<style lang="stylus" scoped>
article
  padding: 2em
  display: flex
  flex-flow: column
  align-items: stretch

.form
  position: relative
  display: flex

textarea
  font-size: 1.2rem
  text-align: left

.generate
  position: absolute
  top: 1.4rem
  right: 1.5rem
  font-size: 1.2rem

.parts
  display: flex
  flex-flow: row wrap

  .part
    flex: 1 1 4em
    text-align: center
    transition: all 300ms ease-in-out
    cursor: pointer

    &:hover
      background-color: var(--background-alt)

    &.active
      background-color: var(--top-bar)

.list
  display: flex
  flex-flow: column
  align-items: flex-start
  padding: 1em

  .card
    padding: 0.5em 1rem
    display: flex
    flex-flow: column
    padding: 1em
    margin: 1em 0
    background-color: var(--background-alt)

    .content
      color: var(--text-light)
      display: flex
      align-items: center
      flex-flow: row

    .text
      font-size: 1.2em

  .more
    font-size: 2em
    padding: 3em
    background-color: var(--top-bar)
</style>