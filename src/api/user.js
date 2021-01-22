// 封装请求用户信息的api

// 导入封装的instance实例（相当于axios，但与axios无关）

import request from '@/utils/request'

// 用户登录
export const login = (data) => {
  return request({ // 函数内部需要return将结果返出去，外部才能收到
    url: '/authorizations',
    method: 'POST',
    data
  })
}

// 关注用户
export const followingUser = (data) => {
  return request({
    url: '/user/followings',
    method: 'POST',
    data
  })
}

// 取消关注用户
export const unFollowingUser = (target) => {
  return request({
    url: `/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 获取个人信息（文章的发表状态）
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}

// 获取【编辑资料】组件中的个人信息接口
export const getUserProfile = () => {
  return request({
    url: '/user/profile'
  })
}

// 局部更新头像接口
export const updateUserPhoto = (data) => {
  return request({
    url: '/user/photo',
    method: 'patch',
    data
  })
}
