import { reactive, ref } from 'vue'
import { account } from 'store@account'
import { state } from 'store@room'

export const linkFrom = ref({})

export function unlink() {
  linkFrom.value = {}
}

export function isLinking(node) {
  return linkFrom.value == node
}

export function link(node, cb) {
  let lnk = linkFrom.value
  if (lnk && lnk.hash && node && node.hash && lnk.tag != node.tag) {
    linkHashes(lnk.hash, node.hash)
    linkFrom.value = {}
  } else {
    linkFrom.value = node
    if (cb) cb()
  }
}

export async function linkHashes(from, to) {
  let certificate = await gun
    .get(`~${state.room}`)
    .get('cert')
    .get('link')
    .then()
  gun
    .get(`~${state.room}`)
    .get('link')
    .get(from)
    .get(to)
    .put(account.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
  gun
    .get(`~${state.room}`)
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
    .get(`~${state.room}`)
    .get('link')
    .get(hash)
    .map()
    .on((d, k) => {
      links[k] = d
    })
  return { links }
}
