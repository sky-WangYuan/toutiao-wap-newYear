<template>
  <div class="container">
    <!-- 头部导航栏 -->
    <van-nav-bar v-if="showNavbar" fixed title="我的头条" right-text="搜索" @click-right="$router.push('/search')"></van-nav-bar>

    <!-- 二级路由容器 -->
    <div class="my-wrapper" :class="{noTop: !showNavbar}">
       <router-view></router-view>
    </div>
    <!-- 底部切换栏目 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    // 通过计算属性处理复杂逻辑-必须有return返回值
    showNavbar () {
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
