<template>
   <!-- 内容区 阅读记忆-->
        <div class="scroll-wrapper">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            </van-list>
        </div>
</template>

<script>
export default {
  name: 'article_list',
  data () {
    return {
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      console.log('加载数据')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
