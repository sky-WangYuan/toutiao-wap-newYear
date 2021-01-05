<template>
   <!-- 内容区 阅读记忆-->
        <div class="scroll-wrapper">
            <!-- 下拉刷新 -->
            <van-pull-refresh
                v-model="onrefresh"
                :success-text="refreshText"
                @refresh="onRefresh"
                >
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <van-cell v-for="item in articleList" :key="item" :title="item" />
                </van-list>
            </van-pull-refresh>
        </div>
</template>

<script>
export default {
  name: 'article_list',
  data () {
    return {
      loading: false,
      finished: false,
      articleList: [],
      onrefresh: false, // 刷新状态
      refreshText: '' // 刷新成功提示文字
    }
  },
  methods: {
    // 上拉加载功能
    onLoad () {
      console.log('加载数据')
      setTimeout(() => { // 模拟ajax经过1s后请求的数据
        if (this.articleList.length < 50) {
          // 请求数据
          const res = Array.from(Array(10), (value, index) => this.articleList.length + index + 1)
          //   console.log(res, ...res)
          this.articleList.push(...res)
          this.loading = false
        } else {
          this.finished = true // 显示加载完成
        }
      }, 1000)
    },
    // 下拉刷新功能
    onRefresh () {
    //   console.log('下拉刷新')
      setTimeout(() => {
        // 1、数据
        const res = Array.from(Array(10), (value, index) => index + 1)
        // 2、数据放在list头部
        this.articleList.unshift(...res)
        // 3、关闭状态+提示文字
        this.onrefresh = false
        this.refreshText = `刷新了${res.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
