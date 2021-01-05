import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)
const res = auth.getUser()
// debugger
export default new Vuex.Store({
  state: {
    // token信息
    user: res
    // user: auth.getUser()
  },
  mutations: {
    // 更新token（修改state数据）

    updataUser (state, payload) {
      state.user = payload.user // 仅内存中 vuex数据更新
      auth.setUser(payload.user) // 更新本地缓存数据(localStorage)
    },
    delUser (state) {
      // 删除用户信息
      state.user = {} // 用户信息设为空对象
      auth.delUser() // 删除本地缓存中数据(localStorage)
    }
  },
  actions: {
  },
  modules: {
  }
})
