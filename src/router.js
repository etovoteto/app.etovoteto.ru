import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'voie-pages'
import { state } from './model/room'

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
  if (!state.isRoot && !hasQueryParams(to)) {
    next({ ...to, query: { room: state.room } })
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
