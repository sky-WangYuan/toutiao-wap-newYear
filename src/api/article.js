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

// 举报文章
export const report = (data) => {
  return request({
    url: '/article/reports',
    method: 'POST',
    data
  })
}

// 联想搜索
export const suggestion = (params) => {
  return request({
    url: '/suggestion',
    params
  })
}

// 文章的搜索结果
export const searchArticle = (params) => {
  return request({
    url: '/search',
    params // 对象形式接收
  })
}

// 文章详情
export const articleInfo = (articleId) => {
  return request({
    url: `/articles/${articleId}`
  })
}

// 获取文章评论 且 对评论进行评论 （参数不同则代表的含义不同）
export const ArticleCommont = (params) => {
  return request({
    url: '/comments',
    params
  })
}

// 添加评论或评论回复
export const addArticleOrReplyComment = (data) => {
  return request({
    url: '/comments',
    method: 'POST',
    data
  })
}
