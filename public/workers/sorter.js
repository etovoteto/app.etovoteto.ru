onmessage = (e) => {
  sort(e)
}

function sort({ data }) {
  let list = Object.values(data.list)
  let more = false
  let total = list.length
  let { orderBy, search, limit, hashed, main = 'word' } = data.options

  list = list.filter(Boolean)

  if (hashed) {
    list = list.map((item) => {
      item.data = JSON.parse(item.data)
      return item
    })
  }

  if (search) {
    list = list.filter((item) => {
      if (item.data[main]) {
        return item.data[main].toLowerCase().includes(search.toLowerCase())
      } else return false
    })
  }

  list.sort(sortBy(orderBy))

  let count = list.length
  if (count > limit) {
    list.length = limit
    more = true
  } else {
    more = false
  }

  postMessage({ list, count, total, more })
}

function countRates(item, type) {
  return Object.keys(item.rated[type]).length
}

function sortByAB(a, b) {
  if (!a) {
    return -1
  }
  if (!b) {
    return 1
  }
  let aTitle = String(a.title).toLowerCase()
  let bTitle = String(b.title).toLowerCase()

  if (aTitle > bTitle) {
    return 1
  }
  if (aTitle < bTitle) {
    return -1
  }

  return 0
}

function sortByTimestamp(a, b) {
  return b.timestamp - a.timestamp
}

function sortBy(prop) {
  return function (a, b) {
    if (!a) {
      return -1
    }
    if (!b) {
      return 1
    }
    if (b[prop] >= a[prop]) return 1
    else return -1
  }
}
