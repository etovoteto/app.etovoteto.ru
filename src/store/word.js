import { reactive } from 'vue'
import { generateWords } from 'use@randomWords'
import { gun, sea, appPub, cert } from 'store@gun-db'
import { user } from 'store@user'
export const vowels = 'аеёиоуыюя'

export const newWord = reactive({
  word: generateWords(),
  stress: 1,
})

export function generate() {
  newWord.word = generateWords()
  newWord.stress = firstStress(newWord.word)
}

export async function hashWord(word = generateWords(), stress) {
  let text = JSON.stringify({ word, stress })
  let hash = await sea.work(text, null, null, { name: 'SHA-256' })
  return { text, hash }
}

export async function addWord(room = appPub, certificate = cert) {
  if (!user.is.pub) return
  if (!verifyWord()) {
    console.warn('word is not correct')
    return
  }
  const { text, hash } = await hashWord(
    newWord.word.toLowerCase(),
    newWord.stress,
  )

  let opt
  if (certificate) {
    opt = { cert: certificate }
  }
  gun
    .get('~' + room)
    .get('#word')
    .get(hash + '#' + user.is.pub)
    .put(text, null, { opt })
}

export function setStress(i) {
  if (!vowels.includes(newWord.word[i])) return
  newWord.stress = i
}

function firstStress(word) {
  for (let i = 0; i <= word.length; i++) {
    if (vowels.includes(word[i])) {
      return i
    }
  }
}

function verifyWord(word = newWord.word, stress = newWord.stress) {
  let wordOk = isChar(word)
  let stressOk = vowels.includes(word[stress])
  return wordOk && stressOk
}

function isChar(str) {
  return /^[а-яА-Я]+$/.test(str)
}
