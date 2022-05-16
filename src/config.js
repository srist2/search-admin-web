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
    // 用户登录
    userLogin: `${host}/admin/login`,
    // 用户注册
    userRegister: `${host}/admin/register`,
    // 用户注销
    userLoginOut: `${host}/admin/loginOut`,
    // 用户重置密码
    resetPassword: `${host}/admin/resetPassword`,
    // 查询失踪者列表
    findInformationAll: `${host}/information/findAll`,
    // 添加失踪者信息
    addInformation: `${host}/information/add`,
    // 更新失踪者信息
    updateInformation: `${host}/information/update`,
    // 删除失踪者信息
    deleteInformation: `${host}/information/delete`,
    // 是否发布失踪者信息
    isShowInformation: `${host}/information/isShowInfo`,
    // 查询发表启示失踪者列表
    findInfoAllByIsShow: `${host}/information/findAllByIsShow`,
    // 失踪者信息查询
    findAllByInfoName: `${host}/information/findAllByInfoName`,
    // 查询失踪者认领列表
    findClaim: `${host}/claim/findAll`,
    // 失踪者认领审核
    updateIsPass: `${host}/claim/updateIsPass`,
    // 失踪者认领查询
    findByClaim: `${host}/claim/findByClaim`,
    // 查询失踪类型字典
    findMissTypeDict: `${host}/dict/missType`,
    // 查询寻找类型字典
    findSeekTypeDict: `${host}/dict/seekType`,
    // 用户结构
    getUserStructure: `${host}/date/getUserStructure`,
    // 加载本地静态文件
    static: {
      districts: `${localhost}/static/jsc-json/districts.json`
    }
  },
  global: {
    // 全局路由
    antRouter: '',
    //
    addRouFlag: false
  }
}
module.exports = config
