const config = require('@/config.js')
let utils = require('@/utils/utils')

// 查询用户列表
export function findInformationAll(query) {
  let options = {
    url: config.service.findInformationAll
  }
  return utils.requestAPI(options)
}
