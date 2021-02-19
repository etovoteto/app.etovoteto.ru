import { roomGun, sea, gun } from 'store@gun-db'
import { user } from 'store@user'
import { reactive, ref, watchEffect } from 'vue'
import { model } from 'store@model'
import { addHashed } from '../use/hashList'

export const appPub =
  'FKpW6azeZY34Sf3EHx9fd4kR3nwH8nkGbxHWWfeYg-A.zIYJXr6C-r6YQkSylS0uJ8m5ftivZoRw1ykxksKsydw'

export const roomKey = ref({})
export const currentRoom = reactive({
  pub: appPub,
})

roomGun.on('auth', async () => {
  console.info('You entered a room')
})

export async function createRoom() {
  let pair = await sea.pair()
  initRoom(pair)
  addHashed('room', { pub: pair.pub })
  console.log(pair)
}

export async function enterRoom(pub) {
  user.currentRoom = pub
  currentRoom.pub = pub
}

export async function exitRoom(pub) {
  user.currentRoom = null
  currentRoom.pub = appPub
}

export function initRoom(pair, title = 'Main') {
  roomGun.user().auth(pair, async () => {
    for (let tag in model) {
      let crt = await issueCert(tag, pair)
      roomGun.get(`~${pair.pub}`).get('cert').get(tag).put(crt)
      roomGun.get(`~${pair.pub}`).get('title').put(title)
    }
  })
}

export async function issueCert(tag = 'word', pair = appPair, users = '*') {
  let hashed = model[tag].hashed
  let personal = model[tag].personal
  let path = { '*': `${hashed ? '#' : ''}${tag}` }
  if (personal) {
    path['+'] = '*'
  }
  try {
    let cert = await SEA.certify(users, path, pair, null, {
      blacklist: 'banlist',
    })
    console.log(cert)
    return cert
  } catch (e) {
    console.log(e)
  }
}
