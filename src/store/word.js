import { reactive } from 'vue'
import { generateWords } from 'use@randomWords'
import { gun, sea, db, appPath } from 'store@gun-db'
import { user } from 'store@user'

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

export async function addWord(word, stress, room, cert) {
  const { text, hash } = await generateRecord(word, stress)
  let opt
  if (cert) {
    opt = { cert }
  }
  gun
    .get('~' + room)
    .get(appPath)
    .get('#words')
    .get(user.is.pub + '#' + hash)
    .put(text, null, { opt })
}

export function setStress(i) {
  if (!vowels.includes(newWord.word[i])) return
  newWord.stress = i
}
