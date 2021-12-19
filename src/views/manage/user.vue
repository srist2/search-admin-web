<template>
  <el-container>
    <div class="header-box">
      <breadcrumb/>
      <el-button class="btn-add" type="primary" icon="el-icon-edit" size="medium" @click="addUser()">添加</el-button>
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
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="addMessage.phone"/>
              </el-form-item>
            </div>
            <div class="form-item-right">
              <el-form-item label="姓名" prop="nickName">
                <el-input v-model="addMessage.nickName"/>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="addMessage.checkPassword" show-password autocomplete="off"/>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addMessage.email"/>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="addMessage.remark"/>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="addMessage.status" placeholder="请选择">
                  <el-option
                    v-for="item in statusList"
                    :key="item.status"
                    :label="item.type"
                    :value="item.status"
                    :disabled="item.disable">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="form-row-btn">
            <el-button type="primary" @click="submitForm('addMessage')">提交</el-button>
            <el-button @click="resetForm('addMessage')">重置</el-button>
          </div>
        </el-form>
      </modal-base>
    </div>
    <el-table
      :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      :default-sort="{prop: 'userId', order: 'descending'}"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="nickName" label="姓名"/>
      <el-table-column prop="email" label="电子邮箱"/>
      <el-table-column prop="phone" label="电话号"/>
      <el-table-column prop="role" label="用户类型" :formatter="formatRole" sortable/>
      <el-table-column label="用户状态" :sort-by="['status', 'role']" sortable>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :inactive-value="2"
            :active-value="1"
            @change="changeUserStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope" v-if="scope.row.status === 1">
          <el-popover
            placement="left"
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
      <el-form
        :model="updateMessage"
        ref="updateMessage"
        class="form-box"
        label-position="left"
        :rules="rules"
        label-width="80px"
      >
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
            <el-form-item label="用户类型" prop="role">
              <el-select v-model="updateMessage.role" placeholder="请选择">
                <el-option
                  v-for="item in roleList"
                  :key="item.status"
                  :label="item.type"
                  :value="item.status"
                  :disabled="item.disable">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="updateMessage.createTime" readonly/>
            </el-form-item>
          </div>
          <div class="form-item-right">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="updateMessage.userName"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="updateMessage.password" show-password autocomplete="off"/>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="updateMessage.phone"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="updateMessage.remark"/>
            </el-form-item>
            <el-form-item label="修改时间">
              <el-input v-model="updateMessage.updateTime" readonly/>
            </el-form-item>
          </div>
        </div>
        <div class="form-row-btn">
          <el-button type="primary" @click="submitForm('updateMessage')">提交</el-button>
          <el-button @click="resetForm('updateMessage')">重置</el-button>
        </div>
      </el-form>
    </modal-base>
    <!-- 删除提示模态框 -->
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
        tableData: [],
        roleList: [],
        modalData: {},
        updateMessage: {
          userId: '',
          userName: '',
          password: '',
          nickName: '',
          phone: '',
          email: '',
          remark: '',
          status: '',
          role: '',
          createTime: '',
          updateTime: '',
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
          createTime: '',
          updateTime: '',
          idCard: '',
          residentLocation: '',
          address: '',
          zipCode: '',
          profession: '',
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
          ],
        },
        statusList: [
          {
            status: 1,
            type: '启用'
          },
          {
            status: 2,
            type: '禁用'
          }
        ],
        // 分页信息
        total: 0,
        pageNum: 1,
        pageSize: 10,
      }
    },
    methods: {
      // 初始化数据
      init() {
        let options = {
          url: this.config.service.findRole,
          success: res => {
            if (res.data.status === 200) {
              this.roleList = res.data.data;
              this.roleList[2].disable = true;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        this.refresh();
        this.utils.request(options);
      },
      // 重新获取数据刷新列表
      refresh() {
        let options = {
          url: this.config.service.findUserAll,
          success: res => {
            if (res.status === 200) {
              this.tableData = res.data;
              this.total = this.tableData.length;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        this.utils.request(options);
      },
      // 用户类型格式化
      formatRole(row, column) {
        return this.utils.userRoleFormat(row.role);
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
            amount2: "密码",
            amount3: data.password
          },
          {
            name: "邮箱",
            amount1: data.email,
            amount2: "电话号码",
            amount3: data.phone
          },
          {
            name: "用户类型",
            amount1: this.utils.userRoleFormat(data.role),
            amount2: "备注",
            amount3: data.remark
          },
          {
            name: "创建时间",
            amount1: data.createTime,
            amount2: "修改时间",
            amount3: data.updateTime
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
            url = this.config.service.updateUser;
            message = '更新成功！';
            break;
          case 'addMessage':
            data = this.addMessage;
            url = data.status === 1 ? this.config.service.addUser : this.config.service.addVolunteer;
            message = '添加成功！';
            break;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let options = {
              url: url,
              data: data,
              success: res => {
                if (res.data.status === 200) {
                  this.$refs.modalBaseUpdate.hide();
                  this.$refs.modalBaseAdd.hide();
                  this.$message({
                    message: message,
                    type: 'success'
                  });
                } else {
                  this.$message.error('修改失败');
                }
                this.request();
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
      // 删除用户
      deleteRow(index) {
        this.modalData = {
          title: '提示',
          context: '是否删除这条用户信息',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancel: true,
          confirm: () => {
            let data = {
              userId: index
            }
            let options = {
              url: this.config.service.deleteUser,
              data: data,
              success: res => {
                if (res.data.status === 200) {
                  this.$refs.modalBaseUpdate.hide();
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
      // 添加用户模态框
      addUser() {
        this.$refs.modalBaseAdd.show();
      },
      // 更改用户状态
      changeUserStatus(row) {
        let data = {
          userId: row.userId,
          status: row.status
        }
        let options = {
          url: this.config.service.updateUserStatus,
          data: data,
          success: res => {
            if (res.data.status === 200) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            } else {
              this.$message.error('修改失败');
            }
            this.request();
          },
          fail: res => {
            console.warn("res-err", res)
          }
        }
        this.utils.submit(options);
      },
      // 为禁用用户添加背景样式
      tableRowClassName({row, rowIndex}) {
        if (row.status === 2) {
          return 'warning-row';
        }
        return '';
      }
    },
    created() {
      this.init();
    }
  };
</script>

<style scoped>
  .el-container {
    display: flex;
    flex-direction: column;
    min-height: 760px;
  }

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
  /* 因为使用scoped设置了样式作用域，所以需要使用深度选择器 */
  .el-table >>> .warning-row {
    background: #ffd8dc;
  }

  .el-table >>> .success-row {
    background: #f0f9eb;
  }
</style>
