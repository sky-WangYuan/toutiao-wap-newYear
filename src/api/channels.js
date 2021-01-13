// 封装频道的请求
import request from '@/utils/request'
import store from '@/store'

const tourist = 'tourist-youke'
const user = 'login-user'

// 获取我的频道
// export const Channels = () => {
//   // axios返回一个promise对象
//   return request({
//     url: '/user/channels'
//   })
// }

// export const Channels = () => {
export function Channels () {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async function (resolve, reject) {
    const key = store.state.user.token ? user : tourist
    const str = localStorage.getItem(key) // 缓存结果
    if (str) {
      resolve({ channels: JSON.parse(str) }) // resolve是await请求成功的结果
      // debugger
    } else {
      // 线上获取，保存在本地
      const data = await request({ url: '/user/channels' })
      localStorage.setItem(key, JSON.stringify(data.channels))
      resolve(data)
    }
  })
}

// 获取所有频道
export const allChannels = () => {
  return request({
    url: '/channels'
  })
}

// 删除频道
export const delChannel = (id) => {
  return new Promise((resolve, reject) => {
    const key = store.state.user.token ? user : tourist
    const data = JSON.parse(localStorage.getItem(key))
    const index = data.findIndex(item => item.id === id)
    if (index > -1) {
      // 找到了
      data.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(data))
      resolve()
    } else {
      reject(new Error('找不到对应的频道'))
    }
  })
}

// 添加频道
export const addChannel = (channel) => { // 将id和名字作为对象传入
  return new Promise((resolve, reject) => {
    // 判断是游客还是登录用户，获取到本地数据，将传入的数据添加到本地
    const key = store.state.user.token ? user : tourist
    const data = JSON.parse(localStorage.getItem(key)) // 转为数组对象
    data.push(channel)
    localStorage.setItem(key, JSON.stringify(data))
    resolve()
  })
}
