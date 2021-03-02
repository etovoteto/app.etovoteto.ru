import { reactive, ref } from 'vue'

export const search = ref('')

export function favRoom(pub) {
  gun.user().get('room').get('fav').get(pub).put(true)
}

export function unFavRoom(pub) {
  gun.user().get('room').get('fav').get(pub).put(false)
}

export function isFav(pub) {
  let fav = ref(false)
  gun
    .get(`~${pub}`)
    .get('room')
    .get('fav')
    .get(pub)
    .on((d) => {
      fav.value - d
    })
  return fav.value
}

export function useRoom(pub) {
  const room = reactive({
    title: '',
    isFav: false,
  })
  gun
    .get(`~${pub}`)
    .get('host')
    .once((d) => (room.host = d))
  gun
    .get(`~${pub}`)
    .get('title')
    .on((d) => (room.title = d))

  gun
    .user()
    .get('room')
    .get('fav')
    .get(pub)
    .on((d) => {
      room.isFav = d
    })

  return room
}
