import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from '@/promission' // 对原本router进行拦截登录处理
import store from './store'
import Vant, { Lazyload } from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less' // 修改登录主题颜色
import '@/styles/index.less' // 覆盖vant样式
import 'amfe-flexible'
import alertMsg from '@/utils/alertMsg' // 封装的提示小插件

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(alertMsg)
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 在main.js中添加如下代码  此代码是采用的 5+ Runtime中的plus对象
document.addEventListener('plusready', function () {
  var webview = window.plus.webview.currentWebview()
  window.plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      if (e.canBack) {
        webview.back()
      } else {
        // webview.close(); //hide,quit
        // plus.runtime.quit();
        // 首页返回键处理
        // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null
        window.plus.key.addEventListener('backbutton', function () {
          // 首次按键，提示‘再按一次退出应用’
          if (!first) {
            first = new Date().getTime()
            setTimeout(function () {
              first = null
            }, 1000)
          } else {
            if (new Date().getTime() - first < 1500) {
              window.plus.runtime.quit()
            }
          }
        }, false)
      }
    })
  })
}) 