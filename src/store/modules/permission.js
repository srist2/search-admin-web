import {constantRouterMap, dynamicRouter} from '../../router/index' //获取路由配置文件里的两个路由表
import router from "../../router/index";
const config = require('../../config')

const permission = {
  state: {
    user: '',
    pass: '',
    roles: localStorage.getItem("userRole"),
  },
  actions: {
    // 生成路由
    GenerateRoutes({commit}) {
      return new Promise(resolve => {
        console.log("dynamicRouter", dynamicRouter)
        // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
        let getRoutes = baseRoleGetRouters(dynamicRouter, permission.state.user.split(","))
        console.log("getRoutes", getRoutes)
        // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
        config.global.antRouter = constantRouterMap.concat(getRoutes)
        // 4.将生成好的路由addRoutes
        router.addRoutes(constantRouterMap.concat(getRoutes))
        // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
        // router.push({ path: to.path })
      })
    }
  }
}



export default permission
