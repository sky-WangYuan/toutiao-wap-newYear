<template>
  <div class="container-action">
    <!-- 封装弹出框组件 -->
    <van-cell-group v-if="!isShow">
      <van-cell title="不感兴趣"  />
      <van-cell title="反馈垃圾内容" @click="isShow=true" is-link/>
      <van-cell title="拉黑作者"/>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="返回" icon="arrow-left" @click="isShow=false"  />
      <van-cell title="其他问题"  icon="info-o"/>
      <van-cell title="标题夸张"  icon="info-o"/>
      <van-cell title="低俗色情"  icon="info-o"/>
      <van-cell title="错别字多"  icon="info-o"/>
      <van-cell title="旧闻重复"  icon="info-o"/>
      <van-cell title="广告软文"  icon="info-o"/>
      <van-cell title="内容不实"  icon="info-o"/>
      <van-cell title="涉嫌违法犯罪"  icon="info-o"/>
      <van-cell title="侵权"  icon="info-o"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.container-action {
    border-radius: 8px;
}
</style>
