/**
 *  配置文件
 */
const host = 'http://localhost:8085'
const localhost = 'http://localhost:8081'

const config = {
  // 请求网络路径
  service: {
    // 查询侧边栏菜单
    findMenu: `${host}/navigation/findMenu`,
    // 查询志愿者列表
    findVolunteerList: `${host}/volunteer/findVolunteerList`,
    // 更新志愿者列表
    updateVolunteerList: `${host}/volunteer/updateVolunteerList`,
    // 删除志愿者信息
    deleteVolunteer: `${host}/volunteer/deleteVolunteer`,
    // 增加志愿者信息
    addVolunteer: `${host}/volunteer/addVolunteer`,
    // 查询用户类型
    findRole: `${host}/role/findAll`,
    // 查询用户全部信息
    findUserAll: `${host}/user/findAll`,
    // 添加用户信息
    addUser: `${host}/user/add`,
    // 删除用户信息
    deleteUser: `${host}/user/delete`,
    // 更新用户信息
    updateUser: `${host}/user/update`,
    // 更改用户状态
    updateUserStatus: `${host}/user/updateStatus`,
    // 查询失踪者列表
    findInformationAll: `${host}/information/findAll`,

    // 加载本地静态文件
    static: {
      districts: `${localhost}/static/jsc-json/districts.json`
    }
  }
}
module.exports = config
