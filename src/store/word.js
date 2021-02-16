import { reactive } from 'vue'
import { generateWords } from 'use@randomWords'
import { addHashed } from './room'
export const vowels = 'аеёиоуыюя'

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
}

export function setStress(i) {
  if (!vowels.includes(record.word[i])) return
  record.stress = i
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
