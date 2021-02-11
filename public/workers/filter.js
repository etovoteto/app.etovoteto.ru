function sorter({
  items,
  host,
  seen,
  rootSearch,
  search,
  page,
  show = true,
  showSeen = false,
  typeField,
  sortAB = true,
}) {
  let feed = {}
  let more = false
  let cleaned = cleanMap(items)
  let entries = Object.entries(cleaned)
  let clean = 0
  let shown = 0
  let total = entries.length

  entries.sort(sortState)

  if (sortAB) {
    entries.sort(sortByAB)
  }

  for (let entry of entries) {
    let key = entry[0]
    let item = entry[1]

    if (!item || item.VOID || !item[typeField]) {
      continue
    }

    if (!showSeen && seen && seen[key]) {
      continue
    }

    if (showSeen && seen && !seen[key]) {
      continue
    }

    /*
      if ((show.banned && !item.banned) ||(!show.banned && item.banned)) {
        continue
      }
    */

    if (
      !host &&
      rootSearch &&
      !item[typeField].toLowerCase().includes(rootSearch.toLowerCase())
    ) {
      continue
    }
    if (
      search &&
      !item[typeField].toLowerCase().includes(search.toLowerCase())
    ) {
      continue
    }

    if (page) {
      clean++
      if (clean < page.start) {
        continue
      }
      shown++
      if (clean > page.end) {
        more = true
        break
      }
    }

    feed[key] = item
  }

  postMessage({ feed, shown: shown, total, more })
}

onmessage = (e) => {
  sorter(e.data)
}

function sortState(a, b) {
  if (a[1].createdAt > b[1].createdAt) {
    return -1
  } else {
    return 1
  }
}

function sortByAB(a, b) {
  let aTitle = a[1].title
  let bTitle = b[1].title
  if (typeof a[1].title == 'string') {
    aTitle = aTitle.toLowerCase()
  }
  if (typeof b[1].title == 'string') {
    bTitle = bTitle.toLowerCase()
  }

  if (aTitle > bTitle) {
    return 1
  }
  if (aTitle < bTitle) {
    return -1
  }
  if (aTitle == bTitle) {
    let aDesc = a[1].description.toLowerCase()
    let bDesc = b[1].description.toLowerCase()
    if (aDesc > bDesc) {
      return 1
    }
    if (aDesc < bDesc) {
      return -1
    }
  }
  return 0
}

function cleanMap(obj) {
  return Object.entries(obj).reduce(
    (a, [k, v]) =>
      v === null
        ? a
        : {
            ...a,
            [k]: v,
          },
    {},
  )
}
