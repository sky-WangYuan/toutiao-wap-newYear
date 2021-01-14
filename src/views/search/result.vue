<template>
  <div class="container">
   <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />

      <van-list @load="onLoad" v-model="loading" :finished="finished" :finished-text="finishedText">
        <van-cell-group>
          <van-cell v-for="item in articleList" :key="item.art_id.toString()">
            <div class="article_item">
              <h3 class="van-ellipsis">{{item.title}}</h3>
              <div class="img_box" v-if="item.cover.type===3">
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box" v-if="item.cover.type===1">
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}评论</span>
                <span>{{item.pubdate | time}}</span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { searchArticle } from '@/api/article'
export default {
  name: 'result',
  data () {
    return {
      loading: false,
      finished: false,
      finishedText: '',
      pageParams: {
        page: 1,
        per_page: 10
      },
      articleList: []
    }
  },
  methods: {
    // 上拉加载数据
    async onLoad () {
      const { q } = this.$route.query
      const data = await searchArticle({ ...this.pageParams, q })
      this.articleList.push(...data.results)
      this.loading = false
      // 通过返回 的长度判断是否还有数据
      if (data.results.length) {
        this.pageParams.page++
      } else {
        this.finished = true
        this.finishedText = '已是最新数据'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
