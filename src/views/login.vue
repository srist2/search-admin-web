<template>
  <div class="login">
    <div class="background">
      <el-col class="main" :xs="24" :sm="14" :md="14" :lg="8" :xl="8">
        <h3>全国寻人信息管理系统</h3>
        <br/>
        <el-form>
          <el-form-item size="large">
            <el-input
              type="text"
              placeholder="请输入用户名"
              v-model="formLogin.userName"
              @keydown.enter.native="login()"
            />
          </el-form-item>
          <el-form-item size="large">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="formLogin.password"
              show-password
              autocomplete="off"
              @keydown.enter.native="login()"
            />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="login()">登录</el-button>
          </el-form-item>
          <el-form-item>
            <div class="register">
              <router-link :to="{path: '/register'}">注册用户</router-link>
              <!--              <a href="/register"></a>-->
              <router-link :to="{path: '/reset'}">忘记密码</router-link>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        formLogin: {
          userName: '',
          password: ''
        },
      }
    },
    methods: {
      login() {
        if (this.formLogin.userName.length <= 0 || this.formLogin.password.length <= 0) {
          this.$message({
            message: "请登录",
            type: 'warning'
          })
        } else {
          let options = {
            url: this.config.service.userLogin,
            data: this.formLogin,
            success: res => {
              console.log("res", res)
              res = res.data
              if (res.status === 200) {
                // 保存token信息
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("username",res.data.userName)
                localStorage.setItem("userRole",res.data.role)
                this.$message({
                  message: "登录成功",
                  type: 'success'
                })
                this.$router.push({path: '/'});
              } else {
                this.$message({
                  message: res.data,
                  type: 'warning'
                })
              }
            },
            fail: res => {
              console.error(res);
            }
          }
          this.utils.submit(options);
        }
      },
      register() {
        console.log("xxx")
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .background {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .main {
    width: 100%;
    margin-top: -170px;
  }

  .logo {
    width: 120px;
    height: 120px;
  }

  .el-button {
    width: 100%;
  }

  .register {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
