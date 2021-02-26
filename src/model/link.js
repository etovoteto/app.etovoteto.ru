import { reactive, ref } from 'vue'
import { author } from 'model@author'
import { state } from 'model@room'

export const linking = ref({})

export function unlink() {
  linking.value = {}
}

export function isLinking(node) {
  return linking.value == node
}

export function link(node, cb) {
  let lnk = linking.value
  if (lnk && lnk.hash && node && node.hash && lnk.tag != node.tag) {
    linkHashes(lnk.hash, node.hash)
    linking.value = {}
  } else {
    linking.value = node
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
    .put(author.is.pub, null, {
      opt: {
        cert: certificate,
      },
    })
  gun
    .get(`~${state.room}`)
    .get('link')
    .get(to)
    .get(from)
    .put(author.is.pub, null, {
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
