// 封装频道的请求
import request from '@/utils/request'
import store from '@/store/index'

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
    const str = localStorage.getItem(key) // 查看缓存中的Key
    if (str) {
      resolve({ channelList: JSON.parse(str) })
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
