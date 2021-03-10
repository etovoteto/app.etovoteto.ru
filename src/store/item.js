import { link, linkFrom } from 'model@link'
import { reactive, ref, computed } from 'vue'
import { account } from 'store@account'
import { gun, hashObj, roomDb } from 'store@db'
import { currentRoom } from 'store@room'

export async function addHashedPersonal(tag, obj, room = currentRoom.pub) {
  let certificate = await gun.get(`~${room}`).get('cert').get(tag).then()
  const { text, hash } = await hashObj(obj)
  let path = await gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get(`${hash}#${account.is.pub}`)
    .then()
  if (!path) {
    gun.get(`~${room}`).get(`#${tag}`).put(`${hash}#${account.is.pub}`)
  }
  gun
    .get(`~${room}`)
    .get(`#${tag}`)
    .get(`${hash}#${account.is.pub}`)
    .put(
      text,
      () => {
        if (linkFrom.value) {
          console.log(linkFrom.value)
          link({ hash, tag, data: obj })
        }
      },
      { opt: { cert: certificate } },
    )
}

export function getHashedPersonal(tag, hash, room = currentRoom.pub) {
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

export async function trashHash(
  hash,
  tag,
  undo = false,
  room = currentRoom.pub,
) {
  let certificate = await gun.get(`~${room}`).get('cert').get('trash').then()
  let isIn = await gun.get(`~${room}`).get('trash').get(hash).then()
  gun
    .get(`~${room}`)
    .get('trash')
    .get(hash)
    .put(!isIn ? tag : null, null, { opt: { cert: certificate } })
  console.log(hash, tag)
}

export function useTrash(room = currentRoom.pub) {
  const obj = reactive({})
  gun
    .get(`~${room}`)
    .get('trash')
    .map()
    .on((d, k) => {
      obj[k] = d
    })
  const trash = computed(() => {
    let list = {}
    for (let hash in obj) {
      if (obj[hash]) {
        list[hash] = obj[hash]
      }
    }
    return list
  })
  return trash
}

export function useIsTrashed(hash) {
  const isTrashed = ref(false)

  gun
    .get(`~${currentRoom.pub}`)
    .get('trash')
    .get(hash)
    .on((d, k) => {
      isTrashed.value = !!d
    })
  return isTrashed
}

export function useTitle(hash, tag) {
  let title = ref('')
  gun
    .get(`~${currentRoom.pub}`)
    .get(`#${tag}`)
    .map()
    .once((d, k) => {
      if (k.includes(hash)) {
        title = d
      }
    })

  return title
}
