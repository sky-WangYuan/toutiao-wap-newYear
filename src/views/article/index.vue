<template>
    <div class='container'>
    <van-nav-bar fixed :title="article.title" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | time}}</p>
        </div>
        <van-button :loading="loadingStatus" @click="toggleFollowing" round size="small" type="info">{{article.is_followed? '已关注': '+ 关注'}}</van-button>
      </div>
      <div class="content" v-html="article.content">
      </div>
      <div class="zan">
        <van-button round size="small"  :class="{active: article.attitude===1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" :class="{active: article.attitude===0}" plain icon="delete">不喜欢</van-button>
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import Comment from './components/comment'
import { articleInfo } from '@/api/article'
import { followingUser, unFollowingUser } from '@/api/user'
export default {
  name: 'article-info',
  data () {
    return {
      article: {},
      loadingStatus: false // 点击关注的加载状态
    }
  },
  components: {
    Comment
  },
  created () {
    this.getArticleInfo()
  },
  methods: {
    // 获取文章详情
    async getArticleInfo () {
      const { articleId } = this.$route.query
      this.article = await articleInfo(articleId)
    },
    // 关注或取关用户
    async toggleFollowing () {
      try {
        this.loadingStatus = true
        await this.$sleep() // 默认600ms请求一次

        if (this.article.is_followed) {
          // 已关注状态，变成未关注
          await unFollowingUser(this.article.aut_id)
        } else {
          // 未关注状态，变成已关注
          await followingUser({ target: this.article.aut_id })
        }
        this.article.is_followed = !this.article.is_followed
        this.loadingStatus = false
      } catch (error) {
        this.$mynotify({ type: 'danger', message: '操作失败' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan{
    text-align: center;
    padding: 10px 0;
    .active{
      border-color:red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;
    top: 47px;
    background: #fff;
        z-index: 2;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
    /deep/ code{
      white-space: pre-wrap;
    }
  }
}
</style>
