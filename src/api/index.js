import config from "../config";
import utils from "../utils/utils";

// 获取系统用户结构
export function getDateStructure(query) {
  let options = {
    url: config.service.getUserStructure,
  }

  return utils.requestAPI(options)
}
