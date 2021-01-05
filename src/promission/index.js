// 拦截到登录
import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  // 判断去的页面 并 是否有token
  if (to.path.startsWith('/user') && !store.state.user.token) {
    next({ path: '/login', query: { redirectUrl: to.path } }) // 拦截到登录，携带访问的页面当作参数
  } else {
    next()
  }
})

export default router
