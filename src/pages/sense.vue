<template lang="pug">
main
  .form
    textarea(:cols="24", :rows="4", v-model="newSense.sense")
    .generate(@click="generate()")
      i.iconify(data-icon="teenyicons:refresh-alt-solid")

  .parts
    button.part(
      v-for="(part, key) in parts",
      :key="key",
      @click="newSense.part = key",
      :class="{ active: newSense.part == key }"
    ) {{ part }}
    button.add(@click="addSense()")
      i.iconify(data-icon="la:plus")

  .list 
    transition-group(name="list")
      sense-card(
        v-for="(sense, key) in sorted.list",
        :key="sense.hash",
        :record="sense"
      ) 
        button.link(
          v-if="!isLinking(sense)",
          @click="link(sense, () => { $router.push('/'); })"
        )
          i.iconify(data-icon="la:link")
      .more(
        key="more",
        ref="more",
        v-if="sorted.more",
        @click="options.limit += options.page"
      ) {{ options.limit }} / {{ sorted.total }}
</template>

<script setup>
import { newSense, addSense, generate, parts } from "store@sense";
import { linking, isLinking, link } from "store@link";
import { useHashList } from "../use/hashList";

const { sorted, options, more } = useHashList("sense");
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

  .more
    font-size: 2em
    padding: 3em
    background-color: var(--top-bar)
</style>