import { roomGun, sea, gun } from 'store@gun-db'
import { user } from 'store@user'
import { reactive, ref, watchEffect } from 'vue'
import { appModel } from 'store@model'
import { addHashed, useHashList } from '../use/hashList'

const appPair = {
  pub:
    'ACHCKvZFFLdiFhtqSiKyxPNIjdRXtkS3WV9jKCP-XsQ.AGhaxvEDsiD8_MBbZrc_gR-sjNeLJ-cT0ISM2Smor6k',
  priv: 'JwDHPqohvEowZtJji5wBuLt4bMJBW_-ouhGVQeSrVDA',
  epub:
    'FlAuUWCmnZ8WK903lhLKf2VFpHQFFINviU9XxdTpi2Y.uscKgZ8Oo_vpAwvxyf8Jp6pfYen2WbOlESDZI55v-A4',
  epriv: 'zP3uDliPugDAAdi3KmzxtXuP0Y0m5NJK2vaXlY_DzK0',
}

export const roomKey = ref(appPair)
export const currentRoom = reactive({
  pub: appPair.pub,
})

export const { sorted, options, more } = useHashList('room')

roomGun.on('auth', async () => {
  console.info('You entered a room')
})

export const appPub = appPair.pub

export async function createRoom() {
  let pair = await sea.pair()
  initRoom(pair)
  addHashed('room', { pub: pair.pub })
}

export async function enterRoom(pub) {
  user.currentRoom = pub
  currentRoom.pub = pub
}

export async function exitRoom(pub) {
  user.currentRoom = null
  currentRoom.pub = appPair.pub
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
