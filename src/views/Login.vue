<template>
  <div class="login">
    <div
      style="margin: 200px auto; background-color: #fff;width: 350px; height: 300px;padding: 20px;border-radius: 10px;">
      <div style="margin: 20px 0; text-align: center; font-size: 24px;"><b> 登 录 </b></div>
      <el-input size="medium" placeholder="请输入用户名" style="margin: 10px 0;" prefix-icon="el-icon-user"
        v-model="user.userId"></el-input>
      <el-input size="medium" placeholder="请输入密码" style="margin: 10px 0;" prefix-icon="el-icon-lock" show-password
        v-model="user.password"></el-input>
      <div style="margin: 10px 0; text-align: center;">
        <el-button type="primary" autocomplete="off" @click="login">登录</el-button>
        <el-button type="warning" autocomplete="off" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        userId: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录
    login() {
      this.request.post("http://1.15.242.164:9090/login", this.user).then(res => {
        console.log(res);
        if (res.code === '200') {
          localStorage.setItem('user', JSON.stringify(res.data))//存储用户信息到浏览器
          this.$router.push('/home')
          this.$message({
            showClose: true,
            type: 'success',
            message: '登录成功'
          })
        }
      })
    },
    // 注册
    register() {

    }
  }
}
</script>