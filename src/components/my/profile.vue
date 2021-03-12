<template lang="pug">
.flex.flex-col
  .flex.flex-col.items-center.text-center
    author-avatar(:pub="account.is?.pub", :size="64")
    .text-3xl.my-4.font-bold {{ account.profile.name }}
      .text-2xl.my-4 Добро пожаловать!
  .flex.flex-col.items-center.text-center(v-if="!account.profile?.gotKey")
    .text-4xl.mb-4
      i.iconify(data-icon="la:lock")
    .text-xl.font-bold.mb-4 Cохраните свой ключ
    .text-lg Чтобы заходить в свой аккаунт вам понадобится ключ. Это небольшой текст, который вы можете скопировать к себе в заметки, сделать скриншот с QR-кодом или сохранить в виде файла на диск. Затем вы сможете использовать их для прямого входа в свой аккаунт.
    .text-xl.mt-4 Храните свой ключ в секрете!

    edit-credentials.p-6.border.border-solid.border-warm-gray-400.rounded-2xl.my-6(
      :pub="account.is?.pub"
    )
    .flex
      .flex.items-center.justify-center.text-4xl.p-6
        i.iconify(data-icon="la:asterisk")
      .text-sm.mt-4 Для входа в аккаунт вы также можете задать пароль. Ввести его можно будет на вашей авторской странице.
    button.action.my-6(@click="updateProfile('gotKey', true)") Спасибо, ключ у меня
  .flex.flex-col.items-center.text-center(v-if="account.profile?.gotKey")
    p.text-lg.my-4 Добавляйте слова и определения в словарь, чтобы отображаться подниматься в списке его авторов.
    router-link.m-8.p-2.rounded-3xl.bg-warm-gray-100.flex.items-center.text-2xl(
      :to="'/author/' + account.is?.pub"
    ) 
      .mr-1
        i.iconify(data-icon="la:newspaper")
      .text-lg Перейти на мою страницу
    button.action.my-6(
      v-if="account.profile?.gotKey",
      @click="updateProfile('gotKey', false)"
    ) Я хочу сохранить свой ключ
</template>

<script setup>
import { useTitle } from "@vueuse/core";
import { account, updateProfile } from "store@account";

const title = useTitle(account.profile?.name);
</script>

<style lang="stylus" scoped></style>