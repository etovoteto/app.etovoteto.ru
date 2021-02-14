import { reactive } from 'vue'
import { generateWords } from 'use@randomWords'
import { gun, sea, db } from 'store@gun-db'

export const vowels = 'аеёиоуыюя'

export const newWord = reactive({
  word: generateWords(),
  stress: 1,
})

export async function generateRecord(word = generateWords(), stress = 1) {
  for (let i = 0; i <= word.length; i++) {
    if (vowels.includes(word[i])) {
      stress = i
      break
    }
  }
  let hash = await sea.work(record, null, null, { name: 'SHA-256' })
  let text = JSON.stringify({ word, stress })
  return { text, hash }
}

export async function addWord() {
  const { text, hash } = generateRecord()
  db.get(hash).put(text)
}

export function setStress(i) {
  if (!vowels.includes(newWord.word[i])) return
  newWord.stress = i
}
