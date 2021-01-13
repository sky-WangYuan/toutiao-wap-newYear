<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航-搜索框 -->
    <van-search v-model.trim="q"  placeholder="请输入搜索关键词" shape="round" />
    <!-- 联想搜索 -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search">
        <span>j</span>ava
      </van-cell>
    </van-cell-group>
    <!-- 历史记录--有历史记录才显示此盒子 -->
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell @click="toResult(item)" v-for="(item,index) in historyList" :key="index">
          <a class="word_btn">{{item}}</a>
          <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
const key = 'history'
export default {
  name: 'search',
  data () {
    return {
      q: '', // 绑定搜索的数据
      historyList: []
    }
  },
  created () {
    this.historyList = ['马云', '哈哈']
    // this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
    // try {
    //   this.historyList = JSON.parse(localStorage.getItem(zhi) || '[]')
    // } catch (error) {
    //   console.log(error)
    //   console.log('有错误')
    // }
  },
  methods: {
    // 点击历史记录跳到搜索结果
    toResult (text) {
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
