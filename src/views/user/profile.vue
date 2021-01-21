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
          @click="showPhoto=true"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender=true" :value="user.gender===0?'男': '女'"/>
      <van-cell is-link title="生日" @click="showDate=true" :value="user.birthday" />
    </van-cell-group>

    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <van-cell title="本地相册" is-link></van-cell>
      <van-cell title="拍照" is-link></van-cell>
    </van-popup>
    <!-- 姓名弹层 -->
    <van-popup v-model="showName" style="width:80%">
      <van-field v-model="user.name" type="textarea" rows="4"></van-field>
    </van-popup>
    <!-- 性别弹层 -->
    <van-action-sheet v-model="showGender" :actions="actions" cancel-text="取消"></van-action-sheet>
    <!-- 日历弹层 -->
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      currentDate: new Date(),
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      user: {
        name: '喜喜',
        gender: 0,
        birthday: '2021-1-21'
      },
      showPhoto: false, // 头像弹层
      showName: false, // 姓名弹层
      showGender: false, // 性别弹层
      showDate: false, // 日期弹层
      actions: [
        { name: '男' },
        { name: '女' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
