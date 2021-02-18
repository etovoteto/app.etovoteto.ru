import { reactive, ref, watchEffect } from 'vue'
import { useHashList, addHashed } from 'use@hashList'
import { useRouter } from 'vue-router'
import { currentRoom } from './room'
import { user } from './user'
export const linking = ref({})

export function unlink() {
  linking.value = null
}

export function isLinking(node) {
  return linking.value == node
}

export function link(node, cb) {
  let lnk = linking.value
  if (lnk && lnk.hash && node && node.hash && lnk.type != node.type) {
    linkHashes(lnk.hash, node.hash)
  } else {
    linking.value = node
    if (cb) cb()
  }
}

async function linkHashes(from, to) {
  let certificate = await gun
    .get(`~${currentRoom.pub}`)
    .get('cert')
    .get('link')
    .then()
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(from + to)
    .put(user.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(to + from)
    .put(user.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
}

export function getLinks(record, hash) {
  record.links = {}
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get({ '.': { '*': hash } })
    .map()
    .on((d, k) => {
      let to = k.slice(-44)
      record.links[to] = d
    })
}
