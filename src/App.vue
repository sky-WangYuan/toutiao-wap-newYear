<template>
  <div id="app">
    <!-- 一级路由容器 -->
    <!-- 如果路由元信息meta中的isKeepAlive是ture缓存那个组件，反之不缓存一级路由 -->

    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>

<style lang="less">

</style>
