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
  let text = JSON.stringify({ word, stress })
  let hash = await sea.work(text, null, null, { name: 'SHA-256' })

  return { text, hash }
}

export async function addWord() {
  const { text, hash } = await generateRecord()
  db.get(hash).put(text)
}

export function setStress(i) {
  if (!vowels.includes(newWord.word[i])) return
  newWord.stress = i
}
