// 封装频道的请求
import request from '@/utils/request'

export const Channels = () => {
  // axios返回一个promise对象
  return request({
    url: '/user/channels'
  })
}
