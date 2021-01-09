// 封装请求文章列表数据
import request from '@/utils/request'

export const article = (params) => {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { ...params, with_top: 1 }
  })
}

// 反馈不喜欢接口
export const dislike = (data) => {
  return request({
    url: '/article/dislikes',
    method: 'POST',
    data
  })
}
