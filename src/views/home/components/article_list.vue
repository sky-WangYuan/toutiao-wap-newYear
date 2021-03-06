<template>
   <!-- 内容区 阅读记忆-->
        <div ref="myScroll" class="scroll-wrapper" @scroll="remember">
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
                <van-cell  @click="$emit('showAction', item.art_id.toString())" v-for="item in articleList"  :key="item.art_id.toString()" value="X"  :title="item.title" :label="item.pubdate | time" />
                    <!-- vant组件库中的van-cell更新单标签-无法使用之前van-cell双标签遍历标签内部数据图片和文字 --------------------------------->
                </van-list>
            </van-pull-refresh>
        </div>
</template>

<script>
import { article } from '@/api/article'
import eventBus from '@/utils/eventBus'
export default {
  name: 'article_list',
  props: {
    channel_id: {
      type: Number,
      require: true,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      articleList: [],
      onrefresh: false, // 刷新状态
      refreshText: '', // 刷新成功提示文字
      timestamp: null,
      scrollTop: 0 // 阅读记忆-滚动的距离

    }
  },
  created () {
    this.onLoad()

    // 删除文章
    eventBus.$on('delArticle', (channelID, articleID) => {
      if (this.channel_id === channelID) {
        // 同一个频道下
        const index = this.articleList.findIndex(item => item.art_id.toString() === articleID)
        if (index > -1) {
          this.articleList.splice(index, 1)
        }
      }
    })

    // 接收传递的tab标签页id-切换多个tab再从别的分类回来时，只有最后一个保留阅读记忆
    eventBus.$on('changeTab', id => {
      if (id === this.channel_id) { // 传递的id和当前组件实例id一致，激活的是当前的组件实例
        // debugger
        this.$nextTick(() => { // 切换tab 且 视图渲染完后 执行
          if (this.scrollTop && this.$refs.myScroll) {
            this.$refs.myScroll.scrollTop = this.scrollTop // 滚动到阅读记忆的位置
          }
        })
      }
    })
  },
  activated () { // keep-alive 组件切换回来激活时 唤醒的函数
    // console.log('唤醒了')
    // 切换多个tab页，从别的分类切回来时 只有最后一次tab显示阅读记忆，别的都刷新
    // 原因： 唤醒了所有的组件实例，只有最后一个tab页有dom
    // 解决：切换tab时，滚动到固定的位置

    if (this.scrollTop && this.$refs.myScroll) { // 如果滚动不为0 且 div元素存在则滚到固定位置
      this.$refs.myScroll.scrollTop = this.scrollTop
    }
  },
  methods: {
    // 获取文章列表
    async onLoad () {
      await this.$sleep() // 代码强制等待
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
    async onRefresh () {
      await this.$sleep() // 代码强制等待
      // 下拉用 最新时间 获取最新数据
      const res = await article({ channel_id: this.channel_id, timestamp: Date.now() })
      this.onrefresh = false // 关闭加载状态

      if (res.results.length) {
        // 有数据
        this.articleList = res.results
        this.refreshText = `更新了${res.results.length}条数据`
        this.finished = false
        this.timestamp = res.pre_timestamp
      } else {
        this.refreshText = '已是最新数据'
      }
    },

    // 记录滚动的位置-阅读记忆
    remember (e) {
      // console.log(e)
      this.scrollTop = e.target.scrollTop
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
.van-cell__value span {
  display: inline-block;
}
</style>
