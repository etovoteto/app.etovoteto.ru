import { reactive } from 'vue'
import { generateWords } from 'use@randomWords'
import { gun, sea, db } from 'store@gun-db'

export const vowels = 'аеёиоуыюя'

export const newWord = reactive({
  word: '',
  stress: 0,
})

export function generate() {
  let word = generateWords()
  newWord.word = word
  let vow = 0
  for (let i = 0; i <= word.length; i++) {
    if (vowels.includes(word[i])) {
      newWord.stress = i
      break
    }
  }
}

export async function addWord() {
  const record = JSON.stringify({
    word: newWord.word,
    stress: newWord.stress,
  })
  var hash = await sea.work(record, null, null, { name: 'SHA-256' })
  db.get(hash).put(record)
}

export function setStress(i) {
  if (!vowels.includes(newWord.word[i])) return
  newWord.stress = i
}
