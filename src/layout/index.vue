<template>
  <el-container>
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <el-row type="flex">
      <el-col :span="3">
        <el-aside style="width: auto">
          <LeftBar></LeftBar>
        </el-aside>
      </el-col>
      <el-col :span="21" class="app-main">
        <AppMain></AppMain>
      </el-col>
    </el-row>

  </el-container>
</template>

<script>
  import { AppMain, NavBar, LeftBar } from "./components";

  export default {
    name: 'Layout',
    components: {
      AppMain,
      NavBar,
      LeftBar
    },
    data() {
      return {

      }
    }
  };
</script>

<style>
  .left-bar {
    background-color: #e9e9e9;
    height: 700px;
  }

  .el-header {
    background-color: rgba(32, 73, 105, 0.8);
    opacity: 95%;
    color: #000;
  }

  .app-main {
    background-color: rgba(255, 247, 247, 0.4);
  }
</style>
s
