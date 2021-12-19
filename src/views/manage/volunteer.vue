<template>
  <el-container>
    <div class="header-box">
      <breadcrumb/>
      <el-button class="btn-add" type="primary" icon="el-icon-edit" size="medium" @click="addVolunteer()">添加</el-button>
      <!-- 添加模态框 -->
      <modal-base ref="modalBaseAdd">
        <el-form :model="addMessage" ref="addMessage" class="form-box" label-position="left" :rules="rules"
                 label-width="80px">
          <div class="form-item">
            <div class="form-item-left">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="addMessage.userName"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addMessage.password" show-password autocomplete="off"/>
              </el-form-item>
              <el-form-item label="身份证" prop="idCard">
                <el-input v-model="addMessage.idCard"/>
              </el-form-item>
              <el-form-item label="常驻地址" prop="residentLocation">
                <address-selection v-model="addMessage.residentLocation"/>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addMessage.email"/>
              </el-form-item>
              <el-form-item label="职业" prop="profession">
                <el-input v-model="addMessage.profession"/>
              </el-form-item>
              <el-form-item label="用户类型" prop="role">
                <el-select v-model="addMessage.role" placeholder="请选择">
                  <el-option
                    v-for="item in roleList"
                    :key="item.status"
                    :label="item.type"
                    :value="item.status"
                    :disabled="item.disable">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-item-right">
              <el-form-item label="姓名" prop="nickName">
                <el-input v-model="addMessage.nickName"/>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="addMessage.checkPassword" show-password autocomplete="off"/>
              </el-form-item>
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="addMessage.phone"/>
              </el-form-item>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="addMessage.address"/>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="addMessage.remark"/>
              </el-form-item>
              <el-form-item label="邮编" prop="zipCode">
                <el-input v-model="addMessage.zipCode"/>
              </el-form-item>
            </div>
          </div>
          <div class="form-row-btn">
            <el-button type="primary" @click="submitForm('addMessage')">提交</el-button>
            <el-button @click="resetForm('updateMessage')">重置</el-button>
          </div>
        </el-form>
      </modal-base>
    </div>
    <el-table :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)">
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="phone" label="电话号"/>
      <el-table-column prop="nickName" label="姓名"/>
      <el-table-column prop="idCard" label="身份证"/>
      <el-table-column prop="residentLocation" label="常驻地点"/>
      <el-table-column prop="address" label="详细地址"/>
      <el-table-column prop="profession" label="职业"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="600"
            trigger="click"
            :visible-arrow="false"
          >
            <table class="detail-show">
              <tr v-for="(item, index) in formatChangeDetail(scope.row)" :key="index">
                <td class="title" width="100">{{item.name}}</td>
                <td width="150">{{item.amount1}}</td>
                <td class="title" width="100">{{item.amount2}}</td>
                <td width="150">{{item.amount3}}</td>
              </tr>
            </table>
            <el-button type="text" slot="reference" size="small">查看</el-button>
          </el-popover>
          <el-button @click="showUpdateModal(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
    <!-- 更新模态框 -->
    <modal-base ref="modalBaseUpdate">
      <el-form :model="updateMessage" ref="updateMessage" class="form-box" label-position="left" :rules="rules"
               label-width="80px">
        <div class="form-item">
          <div class="form-item-left">
            <el-form-item label="用户ID" prop="userId">
              <el-input v-model="updateMessage.userId" readonly/>
            </el-form-item>
            <el-form-item label="姓名" prop="nickName">
              <el-input v-model="updateMessage.nickName"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="updateMessage.email"/>
            </el-form-item>
            <el-form-item label="常驻地址" prop="residentLocation">
              <address-selection v-model="updateMessage.residentLocation"/>
            </el-form-item>
            <el-form-item label="职业" prop="profession">
              <el-input v-model="updateMessage.profession"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="updateMessage.createTime" readonly/>
            </el-form-item>
          </div>
          <div class="form-item-right">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="updateMessage.userName"/>
            </el-form-item>
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="updateMessage.idCard"/>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="updateMessage.phone"/>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="updateMessage.address"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="updateMessage.remark"/>
            </el-form-item>
            <el-form-item label="邮编" prop="zipCode">
              <el-input v-model="updateMessage.zipCode"/>
            </el-form-item>
          </div>
        </div>
        <div class="form-row-btn">
          <el-button type="primary" @click="submitForm('updateMessage')">提交</el-button>
          <el-button @click="resetForm('updateMessage')">重置</el-button>
        </div>
      </el-form>
    </modal-base>
    <!-- 删除模态框 -->
    <modal-common ref="modalCommon" :modalData="modalData"/>
  </el-container>
</template>

<script>
  import breadcrumb from "../../components/breadcrumb";
  import modalBase from "../../components/modal/base";
  import modalCommon from "../../components/modal/common";
  import addressSelection from "../../components/addressSelection"
  import pagination from "../../components/pagination"

  export default {
    name: 'manage',
    components: {
      breadcrumb,
      modalBase,
      modalCommon,
      addressSelection,
      pagination
    },
    data() {
      // 密码验证
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addMessage.checkPassword !== '') {
            this.$refs.addMessage.validateField('checkPassword');
          }
          callback();
        }
      };
      // 二次密码验证
      let validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addMessage.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 总数据
        tableData: [],
        modalData: {},
        updateMessage: {
          address: '',
          email: '',
          idCard: '',
          nickName: '',
          phone: '',
          profession: '',
          remark: '',
          residentLocation: '',
          status: '',
          userName: '',
          zipCode: '',
        },
        addMessage: {
          userId: '',
          userName: '',
          password: '',
          checkPassword: '',
          nickName: '',
          phone: '',
          email: '',
          remark: '',
          status: 1,
          role: '',
          idCard: '',
          residentLocation: '',
          address: '',
          zipCode: '',
          profession: '',
          updateTime: '',
          createTime: '',
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入电话号码', trigger: 'change'},
            {
              pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
              message: '请输入正确电话号码',
              trigger: 'blur'
            },
          ],
          idCard: [
            {required: true, message: '请输入身份证号码', trigger: 'change'},
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确身份证号码', trigger: 'blur'},

          ],
          email: [
            {type: 'email', required: true, message: '请输入电子邮箱', trigger: 'change'},
            {pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确电子邮箱格式', trigger: 'blur'},
          ],
          role: [
            {required: true, message: '请选择一个用户类型', trigger: 'change'}
          ],
          residentLocation: [
            {required: true, message: '请选择常驻地址', trigger: 'change'}
          ]
        },
        roleList: [],
        // 分页信息
        total: 0,
        pageNum: 1,
        pageSize: 10,
      }
    },
    methods: {
      // 初始化数据
      init() {
        this.refresh();
        let options = {
          url: this.config.service.findRole,
          success: res => {
            if (res.data.status === 200) {
              this.roleList = res.data.data;
              this.roleList[0].disable = true;
              this.roleList[2].disable = true;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        this.utils.request(options);
      },
      // 重新获取数据刷新列表
      refresh() {
        let options = {
          url: this.config.service.findVolunteerList,
          success: res => {
            if (res.status === 200) {
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].createTime = this.utils.formatDate(res.data[i].createTime)
                res.data[i].updateTime = this.utils.formatDate(res.data[i].updateTime)
              }
              this.tableData = res.data;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        this.utils.request(options);
      },
      // 自定义列背景色
      columnStyle({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 0 || columnIndex == 2) {
          //第三第四列的背景色就改变了2和3都是列数的下标
          return "background:#f3f6fc;";
        } else {
          return "background:#ffffff;";
        }
      },
      // 详细信息格式转换
      formatChangeDetail(data) {
        let testData = [
          {
            name: "用户ID",
            amount1: data.userId,
            amount2: "用户名",
            amount3: data.userName
          },
          {
            name: "姓名",
            amount1: data.nickName,
            amount2: "身份证",
            amount3: data.idCard
          },
          {
            name: "邮箱",
            amount1: data.email,
            amount2: "电话号码",
            amount3: data.phone
          },
          {
            name: "常驻地址",
            amount1: data.residentLocation,
            amount2: "详细地址",
            amount3: data.address
          },
          {
            name: "职业",
            amount1: data.profession,
            amount2: "备注",
            amount3: data.remark
          },
          {
            name: "创建时间",
            amount1: data.createTime,
            amount2: "修改时间",
            amount3: data.updateTime
          },
          {
            name: "邮编",
            amount1: data.zipCode,
          },
        ]
        return testData;
      },
      // 显示更改模态框
      showUpdateModal(row) {
        // row是Object对象类型，如果直接赋值的话，就变成了浅拷贝，复制的是地址，导致在表单中改变值的时候table中的数据也跟着改变，所以要进行深拷贝。
        this.updateMessage = JSON.parse(JSON.stringify(row));
        this.$refs.modalBaseUpdate.show();
      },
      // 提交添加\更新表格
      submitForm(formName) {
        let data = {}
        let url = ''
        let message = ''
        switch (formName) {
          case 'updateMessage':
            data = this.updateMessage;
            url = this.config.service.updateVolunteerList;
            message = '更新成功！';
            break;
          case 'addMessage':
            data = this.addMessage;
            url = this.config.service.addVolunteer;
            message = '添加成功！';
            break;
        }
        console.log('data', data)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let options = {
              url: url,
              data: data,
              success: res => {
                if (res.data.status) {
                  this.$refs.modalBaseUpdate.hide();
                  this.$refs.modalBaseAdd.hide();
                  this.request();
                  this.$message({
                    message: message,
                    type: 'success'
                  });
                }
              },
              fail: res => {
                console.warn("res-err", res)
              }
            }
            this.utils.submit(options);
          }
        })
      },
      // 重置表格
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 删除志愿者
      deleteRow(index) {
        this.modalData = {
          title: '提示',
          context: '是否删除这条志愿者信息',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancel: true,
          confirm: () => {
            let data = {
              userId: index
            }
            let options = {
              url: this.config.service.deleteVolunteer,
              data: data,
              success: res => {
                if (res.data.status === 200) {
                  this.$refs.modalCommon.close();
                  this.request();
                  this.$message({
                    message: '删除成功！',
                    type: 'success'
                  });
                }
              },
              fail: res => {
                console.warn("res-err", res)
              }
            }
            this.utils.submit(options);
          }
        }
        this.$refs.modalCommon.show();
      },
      // 添加志愿者模态框
      addVolunteer() {
        this.$refs.modalBaseAdd.show();
      }
    },
    created() {
      this.init();
    }
  };
</script>

<style scoped>
  .header-box {
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #bcbcbc solid;
    background-color: #cfcfcf54;
  }

  .btn-add {
    margin-right: 60px;
  }

  .el-container {
    display: flex;
    flex-direction: column;
    min-height: 760px;
  }

  .form-box {
    margin: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .form-item-left, .form-item-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-item-left {
    padding-right: 20px;
  }

  .form-row {
    display: flex;
    flex-direction: row;
  }

  .form-row-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: -20px;
  }

  .form-row-btn .el-button {
    margin: 0 10px;
  }

  .detail-show {
    border-collapse: collapse;
  }

  .detail-show .title {
    background: #f3f6fc;
  }

  .detail-show tr {
    border: 1px #EBEEF5 solid;
  }

  .detail-show td {
    border: 1px #EBEEF5 solid;
    padding: 10px;
  }
</style>
