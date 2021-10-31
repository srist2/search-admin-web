import axios from 'axios'

/**
 * 获取页面宽高按比例计算
 *
 * @param widthScale 宽占比
 * @param HeightScale 高占比
 *
 * @return {Object} 返回计算后页面的宽高 {weight, height}
 */
export function getWeight(widthScale, HeightScale) {
  let weight = {};
  const TAB_BAR_HEIGHT = 60;
  let windowWidth = (document.documentElement.clientWidth - 17) / 24;
  let windowHeight = document.documentElement.clientHeight / 24;
  weight.width = windowWidth * widthScale;
  weight.height = windowHeight * HeightScale;
  return weight;
}

/**
 * 请求数据
 *
 * @param options
 *
 * @return {Object} options.success 成功回调
 * @return {Object} options.fail 失败回调
 */
export function request(options) {
  axios.get(options.url)
    .then((res) => {
      options.success(res);
    })
    .catch((error => {
      options.fail({data: error});
    }))
}

/**
 * 提交
 *
 * @param options
 *
 * @return {Object} options.success 成功回调
 * @return {Object} options.fail 失败回调
 */
export function submit(options) {
  axios.post(options.url, options.data)
    .then((res) => {
      options.success(res);
    })
    .catch((error) => {
      options.fail({data: error});
    })
}

/**
 * 日期格式转换(新加坡时间转换为北京时间)
 *
 * @param datetime    2021-09-09T16:41:04Z
 *
 * @return {string}   2021-09-09 16:41:04
 */
export function formatDate(datetime) {
  if (!datetime) {
    return "NULL";
  }
  // 判断长度和规格
  if (datetime.length > 20 || datetime.indexOf('Z') > 0) {
    datetime = datetime.substring(0, 19) + "Z";
  }
  // 转为正常的时间格式 年-月-日 时:分:秒
  let T_pos = datetime.indexOf('T');
  let Z_pos = datetime.indexOf('Z');
  let year_month_day = datetime.substr(0, T_pos);
  let hour_minute_second = datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  let new_datetime = year_month_day + " " + hour_minute_second;

  // 处理成为时间戳
  // timestamp = new Date(Date.parse(datetime));
  // timestamp = timestamp.getTime();
  // timestamp = timestamp / 1000;

  // 减少8个小时
  // let timestamp = timestamp - 8*60*60;
  // let timestamp = timestamp;

  // 时间戳转为时间
  // let formatDateTime = new Date(parseInt(timestamp) * 1000).toLocaleString('zh', {hour12: false}).replace("/", "-").replace("/", "-");

  return new_datetime;
}

/**
 * 获取当前时间
 *
 * @return {string}
 */
export function getCurrentTime() {
  let date = new Date();//当前时间
  let month = zeroFill(date.getMonth() + 1);//月
  let day = zeroFill(date.getDate());//日
  let hour = zeroFill(date.getHours());//时
  let minute = zeroFill(date.getMinutes());//分
  let second = zeroFill(date.getSeconds());//秒

  //当前时间
  let curTime = date.getFullYear() + "-" + month + "-" + day
    + " " + hour + ":" + minute + ":" + second;

  return curTime;
}

/**
 * 补零
 *
 * @param i
 *
 * @return {string|*}
 */
function zeroFill(i) {
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
}

/**
 * 用户类型转换
 */
let User = {}
export function userRoleFormat(role) {
  switch (role) {
    case User.Role.user.id:
      return User.Role.user.name;
    case User.Role.volunteer.id:
      return User.Role.volunteer.name;
    case User.Role.admin.id:
      return User.Role.admin.name;
  }
}

// 用户类型参数
User.Role = {
  user: {
    id: 1,
    name: '用户'
  },
  volunteer: {
    id: 2,
    name: '志愿者'
  },
  admin: {
    id: 3,
    name: '管理员'
  }
}
// 用户状态
User.Status = {
  enable: {
    type: 1,
    name: '启用'
  },
  disable: {
    type: 2,
    name: '禁用'
  }
}
