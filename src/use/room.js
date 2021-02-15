import { user } from 'store@user'

export function enterRoom(pub) {
  console.log(pub)
  user.room.pub = pub
}

export async function createRoom() {
  console.log('creating room')
}
