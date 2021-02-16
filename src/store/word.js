import { reactive, watchEffect } from 'vue'
import { generateWords } from 'use@randomWords'
import { useHashList, addHashed } from 'use@hashList'

export const vowels = 'аеёиоуыюя'

export const record = reactive({
  word: '',
  stress: 0,
})

export const { sorted, options, more } = useHashList('word')

export function generate() {
  record.word = generateWords()
  record.stress = firstStress(record.word)
}

watchEffect(() => {
  options.search = record.word
})

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

export function getWord(word, stress) {
  let str = word.slice(0, stress + 1) + '&#x301;' + word.slice(stress + 1)
  return str[0].toUpperCase() + str.slice(1)
}

function firstStress(word) {
  for (let i = 0; i <= word.length; i++) {
    if (vowels.includes(word[i])) {
      return i
    }
  }
}

function verifyWord(word = record.word, stress = record.stress) {
  let wordOk = /^[а-яА-Я]+$/.test(word)
  let stressOk = vowels.includes(word[stress])
  return wordOk && stressOk
}
