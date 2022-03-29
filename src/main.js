// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/axios'
import * as echarts from 'echarts';
import utils from './utils/utils.js'
import config from './config'
// 控制路由表的js文件
import '@/permission.js'

// 挂载echarts
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
// 挂载工具类
Vue.prototype.utils = utils
// 挂载网络请求配置
Vue.prototype.config = config

// 成功信息提示
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}
// 失败信息提示
Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
