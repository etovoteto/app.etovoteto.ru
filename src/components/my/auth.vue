<template lang="pug">
form.flex.flex-col.items-stretch.p-8(@submit.prevent.stop)
  .flex.flex-col.justify-center
    .text-2xl.text-center Первый раз?
    button.p-4.m-4(@click="generate()") 
      i.iconify(data-icon="la:plus")
      .text Новый автор
    .text-2xl.text-center Уже есть ключ?
  transition(name="fade")
    .flex.mt-8.flex-wrap.justify-center
      button.action.m-2.p-4(@click="show.text = !show.text")
        i.iconify(data-icon="la:key")
        .text Текст
      label.action.m-2.p-4(for="json-input")
        i.iconify(data-icon="la:file-code")
        .text JSON-файл
      input#json-input.hidden(
        type="file",
        accept="application/json",
        @change="handleFile($event.target.files)"
      )
      label.action.m-2.p-4(for="qr-input")
        i.iconify(data-icon="la:qrcode")
        .text QR-код
      util-load-qr.hidden(@loaded="handleText($event)")
  transition(name="fade")
    .flex.flex-col(v-if="show.text")
      textarea.my-4(
        @input="handleText($event.target.value)",
        placeholder="Вставьте сюда ваш ключ",
        :class="{ invalid: invalid }"
      )
</template>

<script setup>
import { generate, participate } from "store@account";
import { reactive, ref } from "vue";

const show = reactive({
  options: true,
  text: false,
});

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


