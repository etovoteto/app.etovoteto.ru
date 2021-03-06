import { reactive, ref } from 'vue'
import { account } from 'store@account'
import { currentRoom } from 'store@room'
import { computed } from 'vue'
import { throttledWatch } from '@vueuse/core'

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

export async function linkHashes(from, to, del = false) {
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
    .get(gun.user().is.pub)
    .put(!del ? true : false, null, {
      opt: {
        cert: certificate,
      },
    })
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(to)
    .get(from)
    .get(gun.user().is.pub)
    .put(!del ? true : false, null, {
      opt: {
        cert: certificate,
      },
    })
}

export function useLinks(fromHash) {
  const obj = reactive({})
  gun
    .get(`~${currentRoom.pub}`)
    .get('link')
    .get(fromHash)
    .map()
    .once(function (data, toHash) {
      obj[toHash] = obj[toHash] || {}
      this.map().on((is, by) => {
        obj[toHash][by] = is
      })
    })
  const links = computed(() => {
    let list = reactive({})
    for (let link in obj) {
      if (Object.values(obj[link]).filter(Boolean).length !== 0) {
        list[link] = obj[link]
      }
    }
    return list
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
