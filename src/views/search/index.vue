<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航-搜索框 -->
    <van-search @search="onsearch" v-model.trim="q"  placeholder="请输入搜索关键词" shape="round" />
    <!-- 联想搜索 -->
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell v-for="item in suggestionList" :key="item" icon="search">
       {{item}}
      </van-cell>
    </van-cell-group>
    <!-- 历史记录--有历史记录才显示此盒子 -->
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
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
import { suggestion } from '@/api/article'
const key = 'history'
export default {
  name: 'search',
  data () {
    return {
      q: '', // 绑定搜索的数据
      historyList: [],
      suggestionList: []
    }
  },
  watch: {
    q () {
      // 通过函数防抖实现联想搜索
      clearTimeout(this.timeID)
      this.timeID = setTimeout(async () => {
      // 搜索关键词空，将联想数组清空
        if (!this.q) {
          this.suggestionList = []
          return
        }
        const res = await suggestion({ q: this.q })
        this.suggestionList = res.options
      }, 500)
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    // 点击历史记录跳到搜索结果
    toResult (text) {
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    // 删除历史记录
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 清空历史记录
    clear () {
      this.historyList = []
      localStorage.setItem(key, '[]')
    },
    // 回车或软键盘搜索时，触发事件
    onsearch () {
      // 将输入的值放在历史记录和本地，跳转
      if (!this.q) return // 非空判断
      const obj = new Set(this.historyList) // 去重
      obj.add(this.q) // 将新数据放在去重数组中
      this.historyList = Array.from(obj) // 转为真正数组放在history历史记录数组中
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: this.q } })
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
