// 封装请求用户信息的api

// 导入封装的instance实例（相当于axios，但与axios无关）

import request from '@/utils/request'
export const login = (data) => {
  return request({ // 函数内部需要return将结果返出去，外部才能收到
    url: '/authorizations',
    method: 'POST',
    data
  })
}
