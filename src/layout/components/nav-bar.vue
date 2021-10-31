<template>
  <el-row class="row-bg" align="center">
    <el-col :span="6">
      <div @click="handleClick"><p>寻人网站</p></div>
    </el-col>
    <el-col :span="18" style="text-align: right;">
      <el-dropdown @command="handleCommand">
        <p class="el-dropdown-link">
          欢迎登录，{{uerName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set">设置</el-dropdown-item>
          <el-dropdown-item command="out">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'navBar',
    data() {
      return {
        uerName: 'xxxxx'
      }
    },
    methods: {
      handleCommand(command) {
        console.log('command', command);
        if (command === 'set') {
          this.$router.push({path: '/test'})
        }
      },
      handleClick() {
        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>
  .left-bar {
    background-color: rgb(238, 241, 246);
    height: 700px;
  }
</style>
