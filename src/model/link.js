import { reactive, ref } from 'vue'
import { account } from 'store@account'
import { currentRoom } from 'store@room'
import { computed } from 'vue'

export const linkFrom = ref({})

export function unlink() {
  linkFrom.value = {}
}

export function isLinking(node) {
  return linkFrom.value == node.data
}

export function link(node, cb) {
  let lnk = linkFrom.value
  if (lnk && lnk.hash && node && node.hash && lnk.tag != node.tag) {
    linkHashes(lnk.hash, node.hash)
  } else {
    linkFrom.value = node
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
    .put(account.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(to)
    .get(from)
    .put(account.is.pub, null, {
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

export function useCountLinks(author, room = currentRoom.pub) {
  const counter = reactive({})
  gun
    .get(`~${room}`)
    .get('link')
    .map()
    .map()
    .once((d, k) => {
      if (author && d != author) return
      counter[k] = true
    })
  const count = computed(() => {
    return Object.keys(counter).length
  })
  return count
}
