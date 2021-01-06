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
                <van-cell v-for="item in articleList" :key="item.art_id.toString()"  :title="item.title" :label="item.aut_name" />
                    <!-- vant组件库中的van-cell更新单标签-无法使用之前van-cell双标签遍历标签内部数据图片和文字 --------------------------------->
                </van-list>
            </van-pull-refresh>
        </div>
</template>

<script>
import { article } from '@/api/article'
export default {
  name: 'article_list',
  props: ['channel_id'],
  data () {
    return {
      loading: false,
      finished: false,
      articleList: [],
      onrefresh: false, // 刷新状态
      refreshText: '', // 刷新成功提示文字
      timestamp: null
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    // 获取文章列表
    async onLoad () {
      const res = await article({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      this.articleList.push(...res.results)
      this.loading = false
      if (res.pre_timestamp) {
        this.timestamp = res.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新功能
    onRefresh () {
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
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
