<template>
  <div class="left-bar">
    <el-menu router unique-opened :default-active="defaultActive">
      <el-menu-item index="/">
        <template slot="title"><i class="el-icon-s-home"/>首页</template>
      </el-menu-item>
<!--      <el-submenu index="2">-->
<!--        <template slot="title"><i class="el-icon-tickets"></i>失踪者管理</template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="2-1">寻人信息</el-menu-item>-->
<!--          <el-menu-item index="2-2">寻人启事</el-menu-item>-->
<!--          <el-menu-item index="2-3">寻人寻亲认领</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="3">-->
<!--        <template slot="title"><i class="el-icon-s-custom"></i>志愿者管理</template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/volunteer/manage">志愿者信息</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="4">-->
<!--        <template slot="title"><i class="el-icon-s-data"></i>数据展示</template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/data/overview">数据总览</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
      <el-submenu
        v-for="(item,index) in navList" :key='index'
        :index="index.toString()"
      >
        <template slot="title"><i :class="item.icon"/>{{item.name}}</template>
        <el-menu-item-group v-if="item.childrens.length > 0">
          <el-menu-item
            v-for="(item,index) in item.childrens":key='index'
            :index="item.url"
          >
            {{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        navList: {},
        defaultActive: this.$route.path,
      }
    },
    methods: {
      NavList() {
        let options = {
          url: this.config.service.findMenu,
          success: res => {
            if (res.data.status === 200) {
              this.navList = res.data.data.menu;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        this.utils.request(options);
      }
    },
    created() {
      this.NavList();
    }
  };
</script>

<style scoped>
  .left-bar {
    background-color: rgb(238, 241, 246);
    height: 700px;
  }
</style>
