import utils from "../utils/utils";
import config from "../config"

// 查询用户列表
export function findInformationAll(query) {
  let options = {
    url: config.service.findInformationAll
  }
  return utils.requestAPI(options)
}
// 查询发表启示失踪者列表
export function findInfoAllByIsShow(query) {
  let options = {
    url: config.service.findInfoAllByIsShow
  }
  return utils.requestAPI(options)
}
// 查询失踪者认领列表
export function findClaim(query) {
  let options = {
    url: config.service.findClaim
  }
  return utils.requestAPI(options)
}
