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
            <van-tag plain @click="openReply(comment.com_id)">{{comment.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" @click="commit" v-else slot="button">提交</span>
      </van-field>
    </div>
    <!-- 对评论进行回复 -->
      <!-- 通过reply.commentID判断对文章评论 还是 对评论进行回复 （也可以用showReply判断）-->
    <van-action-sheet @closed="reply.commentID=null" :round="false" title="回复评论" v-model="showReply" class="reply_dialog">
      <!-- :immediate-check="false"仅关闭第一次的自动加载，第二次及以后开启自动加载 -->
      <van-list @load="getComments" :immediate-check="false" v-model="reply.loading" :finished="reply.finished" finished-text="没有更多数据了">
        <div class="item van-hairline--bottom van-hairline--top" v-for="reply in reply.commentList" :key="reply.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="reply.aut_photo" />
          <div class="info">
            <p><span class="name">{{reply.aut_name}}</span></p>
            <p>{{reply.content}}</p>
            <p><span class="time">{{reply.pubdate | time}}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { ArticleCommont, addArticleOrReplyComment } from '@/api/article'
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
        finished: false,
        commentID: null, // 评论的id
        commentList: [], // 评论的数据
        offset: null // 评论的参数
      }
    }
  },
  methods: {
    async onLoad () {
      const res = await ArticleCommont({ type: 'a', source: this.$route.query.articleId, offset: this.offset })
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
    openReply (commentId) {
      this.showReply = true // 打开评论的弹层
      this.reply.commentID = commentId // 用评论id获取对应的评论
      // this.reply.loading = true
      // this.reply.finished = false
      // this.reply.commentList = []
      // this.reply.offset = null
      this.getComments()
    },
    // 获取评论的评论
    async  getComments () {
      const res = await ArticleCommont({ type: 'c', source: this.reply.commentID.toString(), offset: this.reply.offset })
      // console.log(res)
      this.reply.commentList.push(...res.results) // 将评论数据放在评论列表中
      this.reply.loading = false
      this.reply.finished = res.end_id === res.last_id // 如果当前页最后的id等于整个评论的id，加载完成
      if (!this.reply.finished) {
        this.reply.offset = res.last_id
      }
    },
    // 点击提交 （对文章评论 || 回复评论）
    async commit () {
      if (!this.value) return false
      this.submiting = true
      // await this.$sleep()  //延迟请求时间 （网络本身不好，不再设置延迟）
      try {
        const res = await addArticleOrReplyComment({
          target: this.reply.commentID ? this.reply.commentID.toString() : this.$route.query.articleId,
          content: this.value,
          art_id: this.reply.commentID ? this.$route.query.articleId : null
        })
        // console.log(res)
        if (this.reply.commentID) {
          this.reply.commentList.unshift(res.new_obj)
          // 对评论进行评论之后, 应该找到该评论 并将 该评论的回复次数 +1
          const comment = this.comments.find(item => item.com_id.toString() === this.reply.commentID.toString())
          comment && comment.reply_count++
        } else {
          this.comments.unshift(res.new_obj)
        }
        this.value = ''
      } catch (error) {
        this.$mynotify({ type: 'danger', message: '评论失败' })
      }
      this.submiting = false
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
