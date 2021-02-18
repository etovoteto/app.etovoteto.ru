import { roomGun, sea, gun } from 'store@gun-db'
import { user } from 'store@user'
import { reactive, ref, watchEffect } from 'vue'
import { appModel } from 'store@model'
import { addHashed } from '../use/hashList'

export const appPub =
  '0VP6NxIi6C6K2W73UXlozdx2pB1J_Ps3sX7vm2sz-Os.EWrQjS-qI28859cZJ5ywEcTvJN5fVXMl9XenJpkeTYM'

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
    for (let tag of appModel.list) {
      let crt = await issueCert(tag, pair)
      roomGun.get(`~${pair.pub}`).get('cert').get(tag).put(crt)
      roomGun.get(`~${pair.pub}`).get('title').put(title)
    }
  })
}

export async function issueCert(
  tag = 'word',
  pair = appPair,
  hashed = true,
  users = '*',
  personal = true,
) {
  let path = { '*': `${hashed ? '#' : ''}${tag}` }
  if (personal) {
    path['+'] = '*'
  }
  try {
    let cert = await SEA.certify(users, path, pair, null, {
      blacklist: 'banlist',
    })
    return cert
  } catch (e) {
    console.log(e)
  }
}
