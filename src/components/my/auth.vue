<template lang="pug">
form.flex.flex-col.p-8(@submit.prevent.stop)
  button.action(@click="generate()") 
    i.iconify(data-icon="la:plus")
    .text Начать с нуля
  button.action(@click="cont = !cont") 
    i.iconify(data-icon="la:key")
    .text У меня есть ключ
  .flex.flex-col(v-if="cont")
    textarea.my-4(
      @input="handleText($event.target.value)",
      placeholder="Вставьте сюда ваш ключ",
      :class="{ invalid: invalid }"
    )

    label.action(for="json-input")
      i.iconify(data-icon="la:file-code")
      .text Загрузить JSON-файл
    input#json-input.hidden(
      type="file",
      accept="application/json",
      @change="handleFile($event.target.files)"
    )
    label.action(for="qr-input")
      i.iconify(data-icon="la:qrcode")
      .text Загрузить QR фото
    util-load-qr.hidden(@loaded="handleText($event)")
</template>

<script setup>
import { generate, participate } from "store@account";
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
.action
  padding: 1em
  margin: 0.5em 0
  align-items: center
  font-size: 1rem
  display: flex
  background-color: var(--button)
  border-radius: 4em
  cursor: pointer

textarea.invalid
  background-color: hsla(0, 100%, 50%, 0.1)
</style>