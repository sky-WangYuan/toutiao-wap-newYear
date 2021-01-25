<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>

    <van-cell-group>
      <van-field v-model="userLogin.mobile" :error-message="errMsg.mobile" @blur="mobileBlur" required placeholder="请输入手机号" label="手机号"></van-field>
      <van-field v-model="userLogin.code" :error-message="errMsg.code" @blur="codeBlur" required placeholder="请输入验证码" label="验证码">
         <template #button>
            <van-button size="mini" type="primary">发送验证码</van-button>
          </template>
      </van-field>
    </van-cell-group>
    <!-- 按钮 -->
    <div class="btn">
      <van-button type="info" block size="small" round @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userLogin: {
        mobile: '13911111119', // 另一个测试号（老高的）：13041139705
        code: '246810'
      },
      // 错误提示信息
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 校验手机号失焦
    mobileBlur () {
      // 非空校验
      if (!this.userLogin.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 格式校验
      if (!/^1[3-9]\d{9}$/.test(this.userLogin.mobile)) {
        this.errMsg.mobile = '手机号格式不对'
      }
      // 如果都正确则返回true
      this.errMsg.mobile = ''
      return true
    },

    // 校验验证码
    codeBlur () {
      if (!this.userLogin.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.userLogin.code)) {
        this.errMsg.code = '请输入6位验证码'
        return false
      }
      this.errMsg.code = ''
      return true
    },
    // 登录提交
    async login () {
      if (this.mobileBlur() && this.codeBlur()) { // 如果输入的校验信息无误，发请求
        // 1、获取token
        const res = await login(this.userLogin)
        // console.log(res)
        // 2、更新vuex和本地存储
        this.updataUser({ user: res }) // 传参数payload
        this.$mynotify({ message: '登录成功', type: 'success' })
        const beforePath = this.$route.query.redirectUrl // 获取登陆前的地址，准备访问某页面时进行登录，登录后回到要去的页面；直接来到登录页登录将跳到首页
        this.$router.push(beforePath || '/')
      }
    },
    ...mapMutations(['updataUser'])
  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
}
</style>
