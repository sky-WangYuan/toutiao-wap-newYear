<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(item,index) in channel" :key="item.id">
          <span class="f12" @click="$emit('mychannel', item.id)">{{item.name}}</span>
          <!-- 第一个推荐永远不要操作，是否显示x图标 -->
          <template v-if="index!==0">
           <van-icon v-show="editing" class="btn" name="cross"></van-icon>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="checkoutChannel in checkoutChannels" :key="checkoutChannel.id">
          <span class="f12">{{checkoutChannel.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { allChannels } from '@/api/channels'
export default {
  props: {
    channel: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    checkoutChannels () {
      return this.allChannelsOption.filter(item => !this.channel.some(i => i.id === item.id))
    }
  },
  data () {
    return {
      editing: false,
      allChannelsOption: []
    }
  },
  methods: {
    async getAllchannels () {
      const data = await allChannels()
      this.allChannelsOption = data.channels
    }
  },
  created () {
    this.getAllchannels()
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
