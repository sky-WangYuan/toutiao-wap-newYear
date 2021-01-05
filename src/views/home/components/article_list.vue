<template>
   <!-- 内容区 阅读记忆-->
        <div class="scroll-wrapper">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell v-for="item in articleList" :key="item" :title="item" />
            </van-list>
        </div>
</template>

<script>
export default {
  name: 'article_list',
  data () {
    return {
      loading: false,
      finished: false,
      articleList: []
    }
  },
  methods: {
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
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
