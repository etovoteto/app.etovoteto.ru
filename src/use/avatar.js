export function useAvatar(pub, size = 800) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')

  const split = pub.split('.')
  const decoded = split.map((single) => decodeUrlSafeBase64(single))

  drawGradient(ctx, decoded[0][42], decoded[1][42], size)
  drawCircles(decoded[0], ctx, size, 250)
  ctx.globalCompositeOperation = 'multiply'
  drawCircles(decoded[1], ctx, size, 100)
  return canvas.toDataURL()
}

function drawGradient(ctx, top, bottom, size) {
  var gradient = ctx.createLinearGradient(0, 0, 0, size)
  gradient.addColorStop(0, `hsl(0,0%,${50 + top * 50}%)`)
  gradient.addColorStop(1, `hsl(0,0%,${50 + bottom * 50}%)`)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
}

function drawCircles(data, ctx, size, radius) {
  const chunks = chunkIt(data, 7)
  chunks.forEach((chunk) => {
    if (chunk.length == 7) {
      let x = chunk[0] * size
      let y = chunk[1] * size
      let r = chunk[2] * radius
      let h = chunk[3] * 360
      let s = chunk[4] * 100
      let l = chunk[5] * 100
      let a = chunk[6]

      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI, false)
      ctx.fillStyle = `hsla(${h},${s}%,${l}%,${a})`
      ctx.closePath()
      ctx.fill()
    }
  })
}

function decodeUrlSafeBase64(st) {
  const symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  const symbolArray = symbols.split('')
  let arr = []
  let i = 0
  for (let letter of st) {
    arr[i++] = symbolArray.indexOf(letter) / 64
  }
  return arr
}
function chunkIt(list, chunkSize = 3) {
  return [...Array(Math.ceil(list.length / chunkSize))].map(() =>
    list.splice(0, chunkSize),
  )
}
