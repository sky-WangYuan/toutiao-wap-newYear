// 封装用户认证信息

// eslint-disable-next-line camelcase
const user_token = 'token'

// 保存用户信息
export function setUser (user) {
  localStorage.setItem(user_token, JSON.stringify(user))
}

// 获取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(user_token) || '{}') // 空对象不会报错
}

// 删除用户信息
export function delUser () {
  localStorage.removeItem(user_token)
}
