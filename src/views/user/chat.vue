<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="高圆圆"></van-nav-bar>
    <div class="chat-list" ref="chatList">
      <!-- 通过item.name 判断是yy则左侧显示客服消息及头像 反之右侧显示 -->
      <div class="chat-item" :class="{right: item.name!='yy', left: item.name==='yy'}" v-for="(item,index) in chatContent" :key="index">
        <van-image v-if="item.name==='yy'" fit="cover" round :src="defaultPhoto" />
        <div class="chat-pao">{{item.msg}}</div>
        <van-image v-if="item.name!='yy'" fit="cover" round :src="photo" />
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">发送</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import defaultPhoto from '@/assets/images/yy.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'
export default {
  name: 'chat',
  computed: {
    ...mapState(['photo', 'user']) // 用户的头像
  },
  data () {
    return {
      value: '',
      loading: false,
      defaultPhoto, // 客服的默认头像
      chatContent: [{ msg: '嗨，你掉头发了吗', name: 'yy' }] // 聊天内容
    }
  },
  created () {
    // 连接socket服务器 - this是组件实例对象，在this中添加socketIO变量（不加this报错,not defined）
    this.socketIO = io('http://ttapi.research.itcast.cn', { query: { token: this.user.token } }) // 得到socketIO实例对象

    // 监听连接成功
    this.socketIO.on('connect', function () {
      console.log('服务器连接成功') // 连接成功，让客服主动发一条消息
      this.chatContent.push({ msg: '嗨，你掉头发了吗', name: 'yy' })
    })

    // 接收客服消息
    this.socketIO.on('message', data => { // data中是服务器传的数据(msg timestmp)，放在chatContent中
      this.chatContent.push({ ...data, name: 'yy' })
      this.scrollBottom() // 接消息，滚动到底部
    })
  },
  beforeDestroy () { // 页面销毁前关闭socket连接
    this.socketIO.close()
  },
  methods: {
    // 点击提交
    async send () {
      // 非空判断
      if (!this.value) return false

      this.loading = true
      await this.$sleep() // 默认延迟600毫秒
      this.socketIO.emit('message', { msg: this.value, timestamp: Date.now() })
      this.chatContent.push({ msg: this.value, timestamp: Date.now() }) // 将添加的数据放在对话列表中
      // （问题：接发消息后，未滚动到最后一条数据）在数据中添加新消息，调用scrollBottom时 有可能视图渲染还未更新，所以用$nextTick

      this.value = ''
      this.loading = false

      this.scrollBottom() // 发消息，滚动到底部
    },

    // 发消息、接消息 滚动到聊天最后位置
    scrollBottom () {
      this.$nextTick(() => { // 数据改变及 视图更新后执行 （vue中数据和视图不同时更新）
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
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
}
</style>
