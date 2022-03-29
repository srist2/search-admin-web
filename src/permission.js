import {constantRouterMap, dynamicRouter} from './router/index' //获取路由配置文件里的两个路由表
import router from '@/router'
import store from "./store";

const config = require('./config')
let addRouFlag = false


/**
 * 注册一个全局前置守卫
 *
 * @param to 将要访问的路径
 * @param from 代表从哪个路径跳转而来
 * @param next 是一个函数，表示放行
 */
router.beforeEach((to, from, next) => {


  let token = localStorage.getItem('token')
  let userRole = localStorage.getItem('userRole')
  let reload = localStorage.getItem('reload')
  if (reload === 'reload') {
    addRouFlag = false
    localStorage.setItem("reload", 'load')
  }

    // 判断权限
    if (token && token !== 'unload') {
      next()
      // 1.如果路由表 没根据角色进行筛选,就筛选一次
      if (!addRouFlag) {
        addRouFlag = true
        // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
        let getRoutes = baseRoleGetRouters(dynamicRouter, userRole.split(","))
        // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
        constantRouterMap.concat(getRoutes)
        config.global.antRouter = getRoutes
        // 4.将生成好的路由addRoutes
        router.addRoutes(constantRouterMap.concat(getRoutes))
        // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
        router.push({path: to.path})
      }
    } else {
      console.log('token',to.path)
      if (to.path === '/login') {
        next()
      } else if (to.path == '/register') {
        next()
      } else if (to.path == '/reset') {
        next()
      } else {
        next('/login')
      }
    }
})

function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  let rightRoutes = allRoutes.filter((route, index) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return rightRoutes
}
