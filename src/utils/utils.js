import axios from '../plugins/axios'
import ro from "element-ui/src/locale/lang/ro";


let utils = {
  /**
   * 获取页面宽高按比例计算
   *
   * @param widthScale 宽占比
   * @param HeightScale 高占比
   *
   * @return {Object} 返回计算后页面的宽高 {weight, height}
   */
  getWeight(widthScale, HeightScale) {
    let weight = {};
    const TAB_BAR_HEIGHT = 60;
    let windowWidth = (document.documentElement.clientWidth - 17) / 24;
    let windowHeight = document.documentElement.clientHeight / 24;
    weight.width = windowWidth * widthScale;
    weight.height = windowHeight * HeightScale;
    return weight;
  },

  /**
   * 请求数据
   *
   * @param options
   *
   * @return {Object} options.success 成功回调
   * @return {Object} options.fail 失败回调
   */
  request(options) {
    axios.get(options.url)
      .then((res) => {
        options.success(res);
      })
      .catch((error => {
        options.fail({data: error});
      }))
  },

  requestAPI(options) {
    return new Promise((resolve, reject) => {
      axios.get(options.url)
        .then((res) => {
          resolve(res);
        })
        .catch((error => {
          reject(error)
        }))
    })
  },

  /**
   * 提交
   *
   * @param options
   *
   * @return {Object} options.success 成功回调
   * @return {Object} options.fail 失败回调
   */
  submit(options) {
    axios.post(options.url, options.data)
      .then((res) => {
        options.success(res);
      })
      .catch((error) => {
        options.fail({data: error});
      })
  },

  submitAPI(options) {
    return new Promise((resolve, reject) => {
      axios.post(options.url, options.data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * 日期格式转换(新加坡时间转换为北京时间)
   *
   * @param datetime    2021-09-09T16:41:04Z
   *
   * @return {string}   2021-09-09 16:41:04
   */
  formatDate(datetime) {
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
  },

  /**
   * 获取当前时间
   *
   * @return {string}
   */
  getCurrentTime() {
    let date = new Date();//当前时间
    let month = this.zeroFill(date.getMonth() + 1);//月
    let day = this.zeroFill(date.getDate());//日
    let hour = this.zeroFill(date.getHours());//时
    let minute = this.zeroFill(date.getMinutes());//分
    let second = this.zeroFill(date.getSeconds());//秒

    //当前时间
    let curTime = date.getFullYear() + "-" + month + "-" + day
      + " " + hour + ":" + minute + ":" + second;

    return curTime;
  },

  /**
   * 补零
   *
   * @param i
   *
   * @return {string|*}
   */
  zeroFill(i) {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    } else {
      return i;
    }
  },

  /**
   * 失踪者类型转换
   */
  formatTypeByMiss(type, row) {
    if (type === 'seek') {
      return this.seekTypeFormat(row);
    }
    if (type === 'miss') {
      return this.missTypeFormat(row);
    }
    if (type === 'sex') {
      return this.genderFormat(row);
    }
  },

  /**
   * 用户类型转换
   */

  userRoleFormat(role) {
    role = typeof(role) === "number" ? role : parseInt(role)
    switch (role) {
      case User.Role.user.id:
        return User.Role.user.name;
      case User.Role.volunteer.id:
        return User.Role.volunteer.name;
      case User.Role.admin.id:
        return User.Role.admin.name;
    }
  },

  /**
   * 寻找类型转换
   */
  seekTypeFormat(role) {
    switch (role) {
      case Dict.SeekType.type_1.id:
        return Dict.SeekType.type_1.name;
      case Dict.SeekType.type_2.id:
        return Dict.SeekType.type_2.name;
      case Dict.SeekType.type_3.id:
        return Dict.SeekType.type_3.name;
      case Dict.SeekType.type_4.id:
        return Dict.SeekType.type_4.name;
      case Dict.SeekType.type_5.id:
        return Dict.SeekType.type_5.name;
      case Dict.SeekType.type_6.id:
        return Dict.SeekType.type_6.name;
    }
  },

  /**
   * 失踪类型转换
   */
  missTypeFormat(role) {
    switch (role) {
      case Dict.MissType.type_1.id:
        return Dict.MissType.type_1.name;
      case Dict.MissType.type_2.id:
        return Dict.MissType.type_2.name;
      case Dict.MissType.type_3.id:
        return Dict.MissType.type_3.name;
      case Dict.MissType.type_4.id:
        return Dict.MissType.type_4.name;
      case Dict.MissType.type_5.id:
        return Dict.MissType.type_5.name;
      case Dict.MissType.type_6.id:
        return Dict.MissType.type_6.name;
      case Dict.MissType.type_7.id:
        return Dict.MissType.type_7.name;
      case Dict.MissType.type_8.id:
        return Dict.MissType.type_8.name;
      case Dict.MissType.type_9.id:
        return Dict.MissType.type_9.name;
      case Dict.MissType.type_10.id:
        return Dict.MissType.type_10.name;
    }
  },

  /**
   * 性别类型转换
   */
  genderFormat(role) {
    switch (role) {
      case Dict.Gender.male.id:
        return Dict.Gender.male.name;
      case Dict.Gender.female.id:
        return Dict.Gender.female.name;
    }
  },

  //获取对象数组元素重复出现次数
  timeRepet(arr) {
    let newArr = [...new Set(arr.map(i => i.missName))]; // 去重的时候需要注意和普通数组不同
    let list = [];
    newArr.forEach(i => {
      list.push(arr.filter(t => t.missName === i));
    });
    let mlist = [];
    list.forEach((i, index) => {
      mlist.push({
        name: newArr[index],
        num: i.length,
      });
    });
    return mlist;
  },
  getCount(arr, rank,ranktype){
    var obj = {}, k, arr1 = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      k = arr[i];
      if (obj[k])
        obj[k]++;
      else
        obj[k] = 1;
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
      arr1.push({el: o, count: obj[o]});
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
      return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if(ranktype===1){
      arr1=arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0,rank1);
  }
}

export default utils

let Dict = {}
let User = {}
// 寻找类型字典
Dict.SeekType = {
  type_1: {
    id: 1,
    name: "家寻亲人"
  },
  type_2: {
    id: 2,
    name: "亲人寻家"
  },
  type_3: {
    id: 3,
    name: "寻找朋友"
  },
  type_4: {
    id: 4,
    name: "寻找同学"
  },
  type_5: {
    id: 5,
    name: "寻找战友"
  },
  type_6: {
    id: 6,
    name: "其他寻找"
  },
}
// 失踪类型字典
Dict.MissType = {
  type_1: {
    id: 1,
    name: "失散亲友"
  },
  type_2: {
    id: 2,
    name: "被拐卖"
  },
  type_3: {
    id: 3,
    name: "离家出走"
  },
  type_4: {
    id: 4,
    name: "迷路走失"
  },
  type_5: {
    id: 5,
    name: "不明原因"
  },
  type_6: {
    id: 6,
    name: "孤儿"
  },
  type_7: {
    id: 7,
    name: "遗弃"
  },
  type_8: {
    id: 8,
    name: "送养"
  },
  type_9: {
    id: 9,
    name: "收养"
  },
  type_10: {
    id: 10,
    name: "死亡"
  },
}
// 性别类型字典
Dict.Gender = {
  male: {
    id: 1,
    name: '男'
  },
  female: {
    id: 2,
    name: '女'
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
