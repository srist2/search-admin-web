<template>
  <div class="left-bar">
    <el-menu router unique-opened :default-active="defaultActive">
      <el-menu-item index="/">
        <template slot="title"><i class="el-icon-s-home"/>首页</template>
      </el-menu-item>
      <el-submenu v-for="(item,index) in meuns" :key='index' :index="index.toString()">
        <template slot="title"><i :class="item.meta.icon"/>{{item.meta.title}}</template>
        <el-menu-item-group v-if="item.children">
          <el-menu-item
            v-for="(item2,index) in item.children" :key='index'
            :index="item.path + '/' + item2.path"
          >
            {{item2.meta.title}}
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
        meuns: []
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
      // this.NavList();
      this.meuns = this.config.global.antRouter
      console.log("antRouter", this.config.global.antRouter)
    }
  };
</script>

<style scoped>
  .left-bar {
    background-color: rgb(238, 241, 246);
    height: 700px;
    overflow-x: hidden;
  }
</style>
