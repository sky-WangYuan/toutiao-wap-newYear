// 自己封装登录提示小插件（只有Vue插件才能被use方式注册）
// Vue.use()会调用install中的方法
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime) // 使用插件

export default {
  install: Vue => {
    // 如果传参用传的参，不传用1s提示消息
    Vue.prototype.$mynotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params })

    // 插件-处理延迟
    Vue.prototype.$sleep = sleep
    Vue.filter('time', time) // 过滤器转换时间
  }
}

// 封装延迟处理函数-加载时太快，服务器压力大

function sleep (time = 600) { // es6中默认传参
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}

function time (value) { // 默认接收传的值
  return dayjs().locale('zh-cn').from(value)
}
