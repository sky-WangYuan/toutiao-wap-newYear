<template>
    <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="user.name" />
      <van-cell is-link title="性别" :value="user.gender===0?'男': '女'"/>
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      user: {
        name: '喜喜',
        gender: 0,
        birthday: '2021-1-21'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
