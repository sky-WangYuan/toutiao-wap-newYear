import Vue from 'vue'
import VueRouter from 'vue-router'

// 按需导入路由-webpack时解决首屏加载慢问题
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Question = () => import('@/views/question')
const Video = () => import('@/views/video')
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
      { path: '/', component: Home },
      { path: '/question', component: Question },
      { path: '/video', component: Video },
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

const router = new VueRouter({
  routes
})

export default router
