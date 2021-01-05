<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-field  required placeholder="请输入手机号" label="手机号"></van-field>
      <van-field  required placeholder="请输入验证码" label="验证码">
         <template #button>
            <van-button size="mini" type="primary">发送验证码</van-button>
          </template>
      </van-field>
    </van-cell-group>
    <!-- 按钮 -->
    <div class="btn">
      <van-button type="info" block size="small" round>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
}
</style>
