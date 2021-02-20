import { reactive } from 'vue'
import { useHashList, addHashed } from 'store@hashList'
export const newDef = reactive({
  def: '',
  part: 'noun',
})

import { parts, defMask } from 'model@model'
import { generateWords } from 'use@randomWords'
export { parts }

export function generate() {
  newDef.def = generateWords(8, 20)
}

export async function addDef() {
  if (!verifyDef()) {
    console.warn('def is not correct')
    return
  }
  let obj = {
    def: newDef.def,
    part: newDef.part,
  }
  addHashed('def', obj)
  newDef.def = ''
}

function verifyDef(def = newDef.def, part = newDef.part) {
  let defOk = def && defMask.test(def)
  let partOk = part && parts[part]
  return defOk && partOk
}
