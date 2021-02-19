import { reactive } from 'vue'
import { useHashList, addHashed } from 'use@hashList'
export const newSense = reactive({
  sense: '',
  part: 'noun',
})

import { parts, senseMask } from 'store@model'
import { generateWords } from '../use/randomWords'
export { parts }

export function generate() {
  newSense.sense = generateWords(8, 20)
}

export async function addSense() {
  if (!verifySense()) {
    console.warn('sense is not correct')
    return
  }
  let obj = {
    sense: newSense.sense,
    part: newSense.part,
  }
  addHashed('sense', obj)
  newSense.sense = ''
}

function verifySense(sense = newSense.sense, part = newSense.part) {
  let senseOk = sense && senseMask.test(sense)
  let partOk = part && parts[part]
  return senseOk && partOk
}
