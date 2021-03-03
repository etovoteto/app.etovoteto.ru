import { parts, defMask } from 'store@locale'
import { computed, reactive } from 'vue'
import { addHashedPersonal } from 'store@item'

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
  addHashedPersonal('def', obj)
  newDef.def = ''
}

function verifyDef(def = newDef.def, part = newDef.part) {
  let defOk = def && defMask.test(def) && def.length > 10
  let partOk = part && parts[part]
  return defOk && partOk
}
