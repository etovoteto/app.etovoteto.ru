/*

function subscribe(path) {
  const database = new Worker('./workers/gunWorker.js')
  database.postMessage(path)
  database.addEventListener('message', (e) => {
    console.log('e', e.data)
  })
}

*/

const window = {
  crypto: self.crypto,
  TextEncoder: self.TextEncoder,
  TextDecoder: self.TextDecoder,
  WebSocket: self.WebSocket,
}

importScripts('../js/gun.min.js')
importScripts('../js/sea.js')
importScripts('../js/radix.js')
importScripts('../js/radisk.js')
importScripts('../js/store.js')
importScripts('../js/rindexed.js')

const peerList = [
  //'https://gun-feeds.glitch.me/gun',
  'http://127.0.0.1:4200/gun',
]

const gun = new window.Gun(peerList)

onmessage = (e) => {
  gun
    .get(e.data)
    .map()
    .on((d, k) => {
      postMessage({ k, d })
    })
}
