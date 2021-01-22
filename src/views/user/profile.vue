<template>
    <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" @click-right="saveUserInfo"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          @click="showPhoto=true"
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender=true" :value="user.gender===0?'男': '女'"/>
      <van-cell is-link title="生日" @click="birthday" :value="user.birthday" />
    </van-cell-group>

    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <van-cell title="本地相册" @click="localPhoto" is-link></van-cell>
      <van-cell title="拍照" is-link></van-cell>
    </van-popup>
    <!-- 姓名弹层 禁用点击遮罩层关闭弹窗-->
    <van-popup v-model="showName" :close-on-click-overlay="false" style="width:80%">
      <van-field :error-message="err_NameMsg" v-model="user.name" type="textarea" rows="4"></van-field>
      <van-button type="info" size="large" @click="btnName">确定</van-button>
    </van-popup>
    <!-- 性别弹层 -->
    <van-action-sheet v-model="showGender" :actions="actions" @select="selectGender" cancel-text="取消"></van-action-sheet>
    <!-- 日历弹层 -->
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showDate=false"
        @confirm="confirmDate"
      />
    </van-popup>
    <!-- 本地相册的提交文件 -->
    <input type="file" @change="photoChange" ref="photoFile" style="display:none">
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, saveUserInfo } from '@/api/user'
import dayjs from 'dayjs'
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
        birthday: '2021-1-18'
      },
      showPhoto: false, // 头像弹层
      showName: false, // 姓名弹层
      showGender: false, // 性别弹层
      showDate: false, // 日期弹层
      actions: [
        { name: '男' },
        { name: '女' }
      ],
      err_NameMsg: '' // 错误提示信息
    }
  },
  methods: {
    // 点击修改名称的确定按钮
    btnName () {
      // 校验必须是1-6位
      if (this.user.name.length < 1 || this.user.name.length > 6) {
        this.err_NameMsg = '输入的数字须保持在1-6位之间'
        return false
      }
      this.err_NameMsg = ''
      this.showName = false
    },

    selectGender (item) { // 选择性别
      this.user.gender = item.name === '男' ? 0 : 1
      this.showGender = false
    },

    birthday () { // 点击生日资料
      this.showDate = true
      this.currentDate = new Date(this.user.birthday)
    },

    confirmDate (selectTime) { // 确认日期时间
      // 将选择的时间赋值给生日资料中 （对象形式的日期，转换为字符串格式）
      this.user.birthday = dayjs(selectTime).format('YYYY-MM-DD')
      this.showDate = false
    },
    async getUserProfile () { // 获取编辑资料信息
      const res = await getUserProfile()
      this.user = res
    },
    localPhoto () { // 点击头像的本地相册，触发input:file文件的点击事件
      this.$refs.photoFile.click()
    },
    async photoChange () { // 更新头像 （选中文件时）
      // console.dir(this.$refs.photoFile.files[0]) // 文件地址

      const fd = new FormData()
      fd.append('photo', this.$refs.photoFile.files[0])
      const res = await updateUserPhoto(fd) // 需要传递data参数
      this.user.photo = res.photo
      this.showPhoto = false
    },

    async saveUserInfo () { // 点击右上角保存用户信息
      try {
        await saveUserInfo({ ...this.user, photo: null })
        this.$mynotify({ type: 'success', message: '保存成功' })
      } catch (error) {
        this.$mynotify({ type: 'success', message: '保存失败' })
      }
    }

  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style lang="less" scoped>
</style>
