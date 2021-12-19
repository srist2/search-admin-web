import utils from "../utils/utils";
import config from "../config"

// 查询失踪类型字典
export function findMissDict(query) {
  let options = {
    url: config.service.findMissTypeDict
  }
  return utils.requestAPI(options)
}
// 查询寻找类型字典
export function findSeekDict(query) {
  let options = {
    url: config.service.findSeekTypeDict
  }
  return utils.requestAPI(options)
}
