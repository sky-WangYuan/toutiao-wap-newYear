// 封装请求配置
import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '@/utils/auth'

// 创建一个别的axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [data => {
    // 返回的数据被默认转为了JSON.parse，造成超出数字最大安全范围
    try {
      return JSONBIGINT.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 携带token
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  try {
    if (res.data.data) {
      return res.data.data
    }
  } catch (error) {
    return res.data
  }
}, err => {
  return Promise.reject(err)
})

// 导出别的地方用
export default instance
