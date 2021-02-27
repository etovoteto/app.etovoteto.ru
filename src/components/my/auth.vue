<template lang="pug">
form(@submit.prevent.stop)
  button.action(@click="generate()") 
    i.iconify(data-icon="la:plus")
    .text Начать
  button.action(@click="cont = !cont") 
    i.iconify(data-icon="la:upload")
    .text Продолжить
  .options(v-if="cont")
    textarea(
      @input="handleText($event.target.value)",
      placeholder="Вставьте сюда ваш ключ",
      :class="{ invalid: invalid }"
    )
    input(
      type="file",
      accept="application/json",
      @change="handleFile($event.target.files)"
    )
</template>

<script setup>
import { generate, participate } from "model@author";
import { ref } from "vue";

const cont = ref(false);
const invalid = ref(false);

function handleText(text) {
  if (text == "") invalid.value = false;
  if (text && text.includes("pub") && text.includes("priv")) {
    parseJSON(text);
  } else {
    invalid.value = true;
  }
}

function handleFile(files) {
  let file = files[0];
  if (file.size < 1000) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      parseJSON(reader.result);
    };
  }
}

function parseJSON(json) {
  if (json && json.includes("pub") && json.includes("priv")) {
    try {
      let obj = JSON.parse(json);
      participate(obj);
    } catch (e) {
      invalid.value = true;
    }
  }
}
</script>

<style lang="stylus" scoped>
form
  display: flex
  max-width: 55ch
  flex-flow: column

.action
  padding: 1em
  margin: 0.5em 0
  align-items: center
  font-size: 1rem
  display: flex

.options
  display: flex
  flex-flow: column
  align-items: center

textarea.invalid
  background-color: hsla(0, 100%, 50%, 0.1)
</style>