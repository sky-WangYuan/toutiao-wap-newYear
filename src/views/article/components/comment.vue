<template>
  <div class="comment">
    <van-list v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
      <div class="item van-hairline--bottom van-hairline--top" v-for="comment in comments" :key="comment.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="comment.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{comment.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{comment.like_count}} </span>
            </span>
          </p>
          <p>{{comment.content}}</p>
          <p>
            <span class="time">{{comment.pubdate | time}}</span>&nbsp;
            <van-tag plain @click="openReply">{{comment.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">提交</span>
      </van-field>
    </div>
    <!-- 对评论进行回复 -->
    <van-action-sheet :round="false" title="回复评论" v-model="showReply" class="reply_dialog">
      <van-list v-model="reply.loading" :finished="reply.finished" finished-text="没有更多数据了"></van-list>
    </van-action-sheet>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { ArticleCommont } from '@/api/article'
export default {
  data () {
    return {
      // 上拉加载中
      loading: false,
      // 全部加载完毕
      finished: false,
      // 输入的内容
      value: '',
      // 控制提交中状态数据
      submiting: false,
      offset: null, // 文章分页数据
      comments: [], // 文章评论列表
      showReply: false,
      reply: {
        loading: false,
        finished: false
      }
    }
  },
  methods: {
    async onLoad () {
      const res = await ArticleCommont({ type: 'a', source: this.$route.query.articleId, offset: this.offset })
      console.log(res)
      this.comments.push(...res.results)
      this.loading = false
      // 判断是否是最后一页数据
      this.finished = res.last_id === res.end_id // 如果某页最后一个评论id等于整篇文章最后id，则结束
      if (!this.finished) {
        // 如果不相等，还有下一页数据
        this.offset = res.last_id
      }
    },
    // 点击恢复打开弹层
    openReply () {
      this.showReply = true
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
//对评论的回复
.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
