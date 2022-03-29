import utils from "../utils/utils";
import config from "../config"

// 用户注销
export function userLoginOut(query) {
  let options = {
    url: config.service.userLoginOut
  }
  return utils.requestAPI(options)
}

// 用户重置密码
export function resetPassword(query) {
  let options = {
    url: config.service.resetPassword,
    data: query.data
  }

  return utils.submitAPI(options)
}
