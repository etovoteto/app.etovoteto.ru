import { link } from 'model@link'
import { reactive } from 'vue'
import { account } from 'store@account'
import { gun, hashObj, roomDb } from './db'
import { state } from './room'

export async function addHashedPersonal(tag, obj, room = state.room) {
  let certificate = await gun.get(`~${room}`).get('cert').get(tag).then()
  const { text, hash } = await hashObj(obj)
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get(`${hash}#${account.is.pub}`)
    .put(text, null, { opt: { cert: certificate } })
  link({ hash, tag, ...obj })
}

export function getHashedPersonal(tag, hash, room = state.room) {
  const record = reactive({})
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .map()
    .on(function (data, key) {
      if (key.includes(hash)) {
        record.hash = hash
        record.tag = tag
        record.data = JSON.parse(data)
        record.authors = record.authors || {}
        record.authors[key.slice(-87)] = true
      }
    })
  return { record }
}
