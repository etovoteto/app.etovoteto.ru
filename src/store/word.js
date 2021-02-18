import { reactive, watchEffect } from 'vue'
import { generateWords } from 'use@randomWords'
import { addHashed } from 'use@hashList'

import { vowels, stressMark, wordMask } from 'store@model'

export { vowels }

export const record = reactive({
  word: '',
  stress: 0,
})

export function generate() {
  record.word = generateWords()
  record.stress = firstStress(record.word)
}

export async function addWord() {
  if (!verifyWord()) {
    console.warn('word is not correct')
    return
  }
  let obj = {
    word: record.word.toLowerCase(),
    stress: record.stress,
  }
  addHashed('word', obj)
  record.word = ''
}

export function setStress(i) {
  if (!vowels.includes(record.word[i])) return
  record.stress = i
}

export function renderWord(word, stress) {
  let str = word.slice(0, stress + 1) + stressMark + word.slice(stress + 1)
  return str[0].toUpperCase() + str.slice(1)
}

export function capitalFirst(text) {
  if (!text && typeof text != 'string') return
  return text[0].toUpperCase() + text.slice(1)
}

function firstStress(word) {
  for (let i = 0; i <= word.length; i++) {
    if (vowels.includes(word[i])) {
      return i
    }
  }
}

function verifyWord(word = record.word, stress = record.stress) {
  let wordOk = wordMask.test(word)
  let stressOk = vowels.includes(word[stress])
  return wordOk && stressOk
}
