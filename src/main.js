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
