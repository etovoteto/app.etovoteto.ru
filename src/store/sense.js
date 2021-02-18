import { reactive } from 'vue'
import { useHashList, addHashed } from 'use@hashList'
export const record = reactive({
  sense: '',
  part: 'noun',
})

import { parts, senseMask } from 'store@model'
import { generateWords } from '../use/randomWords'
export { parts }

export function generate() {
  record.sense = generateWords(8, 20)
}

export async function addSense() {
  if (!verifySense()) {
    console.warn('sense is not correct')
    return
  }
  let obj = {
    sense: record.sense,
    part: record.part,
  }
  addHashed('sense', obj)
  record.sense = ''
}

function verifySense(sense = record.sense, part = record.part) {
  let senseOk = sense && senseMask.test(sense)
  let partOk = part && parts[part]
  return senseOk && partOk
}
