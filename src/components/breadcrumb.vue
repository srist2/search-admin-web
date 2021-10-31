<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :to="item.path" :key="index" v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
      console.log("this.", this.$route)
    }
  };
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 16px;
  }
</style>
