// 封装请求配置
import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 给instanse实例配置基准值和处理大数字
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [data => {
    // 默认处理成了JSON.parse对象
    try {
      return JSONBIGINT.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
instance.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  try {
    return response.data.data
  } catch (err) {
    return response.data
  }
}, async err => {
  // 处理token失效
  if (err.response && err.response.status === 401) {
    // 判断是否有refresh_token，来获取新的token
    if (store.state.user.refresh_token) {
      try {
        // 1、获取新token
        const res = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        // 2、更新vuex和本地存储
        store.commit('updataUser', {
          user: {
            token: res.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        // 3、将错误请求重发
        return instance(err.config)
      } catch (error) {
        // 如果换token或任意代码出错
        store.commit('delUser')
        router.push({ path: '/login', query: { redirectUrl: router.currentRoute.path } })
      }
    } else {
      // 无refresh_token
      store.commit('delUser')
      router.push({ path: '/login', query: { redirectUrl: router.currentRoute.path } })
    }
  }
  return Promise.reject(err)
})

// 导出给别的地方用
export default instance
