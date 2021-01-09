<template>
  <div class="container-action">
    <!-- 封装弹出框组件 -->
    <van-cell-group v-if="!isShow">
      <van-cell title="不感兴趣"  @click="$emit('dislike')"/>
      <van-cell title="反馈垃圾内容" @click="isShow=true" is-link/>
      <van-cell title="拉黑作者"/>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="返回" icon="arrow-left" @click="isShow=false"  />
      <van-cell @click="$emit('report', item.value)" v-for="item in reports" :key="item.value" :title="item.label"  icon="info-o"/>
    </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants'
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      isShow: false,
      reports
    }
  },
  created () {
    // eventBus.$on('delArticle', ()=> this.isShow=false)
    eventBus.$on('delArticle', () => (this.isShow = false))
  }
}
</script>

<style lang="less" scoped>
.container-action {
    border-radius: 8px;
}
</style>
