import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'voie-pages'
import { currentRoom } from 'store@room'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach((to, from, next) => {
  if (!currentRoom.isRoot && !hasQueryParams(to)) {
    next({ ...to, query: { room: currentRoom.pub } })
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (!hasQueryParams(to) && hasQueryParams(from)) {
//     next({ ...to, query: from.query })
//   } else {
//     next()
//   }
// })

function hasQueryParams(route) {
  return !!Object.keys(route.query).length
}
