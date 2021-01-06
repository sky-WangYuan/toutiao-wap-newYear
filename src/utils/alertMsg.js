// 自己封装登录提示小插件（只有Vue插件才能被use方式注册）
// Vue.use()会调用install中的方法

export default {
  install: Vue => {
    // 如果传参用传的参，不传用1s提示消息
    Vue.prototype.$mynotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params })

    // 插件-处理延迟
    Vue.prototype.$sleep = sleep
  }
}

// 封装延迟处理函数-加载时太快，服务器压力大

function sleep (time = 600) { // es6中默认传参
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}
