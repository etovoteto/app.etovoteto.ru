import { reactive, ref } from 'vue'

export const newSense = reactive({
  text: '',
  part: '',
})

export const parts = {
  noun: 'сущ',
  adj: 'прил',
  verb: 'глаг',
  adv: 'нареч',
}

export const allParts = {
  noun: 'сущ',
  adj: 'прил',
  verb: 'гл',
  adv: 'нареч',
  pron: 'мест',
  ptcl: 'прич',
  trans: 'деепр',
  prep: 'предл',
  conj: 'союз',
  part: 'част',
}
