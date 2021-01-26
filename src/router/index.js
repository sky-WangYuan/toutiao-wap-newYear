import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 按需导入路由-webpack时解决首屏加载慢问题
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Question = () => import('@/views/question')
const Videos = () => import('@/views/videos')
const User = () => import('@/views/user')
const UserProfile = () => import('@/views/user/profile')
const UserChat = () => import('@/views/user/chat')
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchResult = () => import('@/views/search/result')
const Article = () => import('@/views/article')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout, // 布局容器
    children: [
      { path: '/', component: Home, meta: { isKeepAlive: true } }, // 将一级路由layout缓存 从别的一级路由返回后保持不刷新
      { path: '/question', component: Question },
      { path: '/video', component: Videos },
      { path: '/user', component: User }
    ]
  },
  { path: '/user/profile', component: UserProfile },
  { path: '/user/chat', component: UserChat },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/search/result', component: SearchResult },
  { path: '/article', component: Article }
]

// 路由实例对象
const router = new VueRouter({
  routes
})

export default router
