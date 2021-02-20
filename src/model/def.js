import { parts, defMask } from 'store@locale'
import { generateWords } from 'use@randomWords'
import { computed, reactive } from 'vue'
import { useHashList, addHashed } from 'store@hashList'
export const newDef = reactive({
  def: '',
  part: 'noun',
})

export const isValid = computed(() => {
  return verifyDef(newDef.def)
})

export async function addDef(part) {
  if (!verifyDef()) {
    console.warn('def is not correct')
    return
  }
  let obj = {
    def: newDef.def,
    part: part,
  }
  addHashed('def', obj)
  newDef.def = ''
}

function verifyDef(def = newDef.def, part = newDef.part) {
  let defOk = def && defMask.test(def) && def.length > 10
  let partOk = part && parts[part]
  return defOk && partOk
}
