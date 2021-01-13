<template>
  <div class="container">
    <!-- 标签栏目 -->
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id">
       <!-- 列表组件 -->
       <article-list @showAction="openAction" :channel_id="item.id"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 编辑频道的 -->
     <span class="bar_btn" @click="showChannelEdit=true">
      <van-icon name="wap-nav" />
    </span>
    <!-- 弹出反馈组件 -->
    <van-popup v-model="isShowAction">
      <more-action @dislike="dislikeAndReport($event, 'dislike')" @report="dislikeAndReport($event, 'report')"></more-action>
    </van-popup>
    <!-- 编辑组件 -->
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <channel-edits
        @addChannel="addChannel"
         @delChannel="delChannel"
         :activeIndex="activeIndex"
         @mychannel="mychannelToHome"
         :channel="channelsList"></channel-edits>
   </van-action-sheet>
    <!-- <van-action-sheet v-model="showEditor" :actions="ChannelEditor"/>
    <channel-edits></channel-edits> -->
  </div>
</template>

<script>
import ArticleList from './components/article_list'
import { Channels, delChannel, addChannel } from '@/api/channels'
import MoreAction from './components/moreAction'
import { dislike, report } from '@/api/article'
import eventBus from '@/utils/eventBus'
import ChannelEdits from './components/channel-edit'
export default {
  name: 'home',
  components: {
    ArticleList,
    MoreAction,
    ChannelEdits
  },
  data () {
    return {
      activeIndex: 0,
      channelsList: [],
      isShowAction: false,
      art_id: null,
      showChannelEdit: false // 显示编辑组件
      // ChannelEditor: this.channelsList
    }
  },
  created () {
    this.getChannels() // 初始化时获取数据
  },
  methods: {
    async addChannel (channel) {
      await addChannel(channel) // 将点击的频道放入本地缓存
      this.channelsList.push(channel) // 更改data数据
    },
    async delChannel (id) {
      try {
        await delChannel(id) // 删除本地缓存中数据

        const index = this.channelsList.findIndex(item => item.id === id)
        if (index <= this.activeIndex) {
          this.activeIndex = this.activeIndex - 1
        }
        if (index > -1) {
          // 找到了索引值，-1代表找不到
          this.channelsList.splice(index, 1)
        }
      } catch (error) {
        this.$mynotify({ type: 'danger', message: '删除失败' })
      }
    },
    // 从频道编辑页点击频道切换到首页对应的频道下
    mychannelToHome (id) {
      const index = this.channelsList.findIndex(item => item.id === id)
      this.activeIndex = index
      this.showChannelEdit = false
    },
    async getChannels () {
      const { channels } = await Channels()
      this.channelsList = channels
    },
    openAction (artID) {
      this.isShowAction = true
      this.art_id = artID
    },
    // 不感兴趣
    // async dislike () {
    //   try {
    //     await dislike({ target: this.art_id })
    //     eventBus.$emit('delArticle', this.channelsList[this.activeIndex].id, this.art_id)
    //     this.$mynotify({ type: 'success', message: '删除成功' })
    //     this.isShowAction = false
    //   } catch (e) {
    //     this.$mynotify({ type: 'success', message: '删除失败' })
    //   }
    // },
    // 不感兴趣和举报
    async dislikeAndReport (data, option) {
      try {
        option === 'dislike' ? await dislike({ target: this.art_id }) : await report({ target: this.art_id, type: data })
        this.$mynotify({ type: 'success', message: '删除成功' })
        eventBus.$emit('delArticle', this.channelsList[this.activeIndex].id, this.art_id)
        this.isShowAction = false
      } catch (error) {
        this.$mynotify({ type: 'success', message: '删除失败' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;//设置滚动条
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
.van-popup--center {
  width: 78%;
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
