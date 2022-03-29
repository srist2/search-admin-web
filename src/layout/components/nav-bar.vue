<template>
  <el-row class="row-bg" align="center">
    <el-col :span="6">
      <div @click="handleClick"><p>寻人网站</p></div>
    </el-col>
    <el-col :span="18" style="text-align: right;">
      <el-dropdown @command="handleCommand">
        <p class="el-dropdown-link">
          欢迎登录，{{formatRole(role)}}{{uerName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set">设置</el-dropdown-item>
          <el-dropdown-item command="out" @click="loginOut()">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
  import {userLoginOut} from '@/api/admin';

  export default {
    name: 'navBar',
    data() {
      return {
        uerName: localStorage.getItem('username'),
        role: localStorage.getItem('userRole')
      }
    },
    methods: {
      handleCommand(command) {
        if (command === 'set') {
          this.$router.push({path: '/test'})
        }
        if (command === 'out') {
          this.loginOut();
        }
      },
      handleClick() {
        this.$router.push('/');
      },
      loginOut() {
        userLoginOut().then(res => {
          localStorage.setItem("token", "unload");
          localStorage.setItem("username", null)
          localStorage.setItem("userRole", null)
          localStorage.setItem("reload", 'reload')
          this.$router.push({path: '/login'});
          this.$message({
            message: "登出成功",
            type: 'success'
          })
        })
      },
      // 用户类型格式化
      formatRole(role) {
        return this.utils.userRoleFormat(role);
      },
    }
  };
</script>

<style scoped>
  .left-bar {
    background-color: rgb(238, 241, 246);
    height: 700px;
  }
</style>
