import { reactive, ref } from 'vue'
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
  if (lnk && lnk.hash && node && node.hash && lnk.tag != node.tag) {
    linkHashes(lnk.hash, node.hash)
    linking.value = null
  } else {
    linking.value = node
    if (cb) cb()
  }
}

export async function linkHashes(from, to) {
  let certificate = await gun
    .get(`~${currentRoom.pub}`)
    .get('cert')
    .get('link')
    .then()
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(from)
    .get(to)
    .put(user.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(to)
    .get(from)
    .put(user.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
}

export function useLinks(hash) {
  const links = reactive({})
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(hash)
    .map()
    .on((d, k) => {
      links[k] = d
    })
  return { links }
}
