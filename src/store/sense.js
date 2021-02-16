import { reactive, ref } from 'vue'

export const record = reactive({
  text: '',
  part: 'noun',
})

import { parts } from 'store@lingvo'
import { generateWords } from '../use/randomWords'
import { addHashed } from './room'
export { parts }

export function generate() {
  record.text = generateWords(8, 20)
}

export async function addSense() {
  if (!verifySense()) {
    console.warn('sense is not correct')
    return
  }
  let obj = {
    text: record.text,
    part: record.part,
  }
  addHashed('sense', obj)
  record.text = ''
}

function verifySense(text = record.text, part = record.part) {
  let textOk = text && /^[а-я А-Я 1-9"«»!?,.-]+$/.test(text)
  let partOk = part && parts[part]
  return textOk && partOk
}
