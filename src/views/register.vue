<template>
  <el-container>
    <div class="back">
      <router-link to="/login"><el-button type="primary" icon="el-icon-back">返回</el-button></router-link>
    </div>
    <div class="register">
      <h3>用户注册</h3>
      <el-form :model="formDate" ref="formRegister" class="form-box" label-position="left"
               label-width="80px">
        <div class="form-item">
          <div class="form-item-left">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="formDate.userName"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formDate.password" show-password autocomplete="off"/>
            </el-form-item>
            <el-form-item label="用户类型" prop="role">
              <el-select v-model="formDate.role" placeholder="请选择">
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
              <el-input v-model="formDate.phone"/>
            </el-form-item>
            <div v-if="formDate.role === 2">
              <el-form-item label="常驻地址" prop="residentLocation">
                <address-selection v-model="formDate.residentLocation"/>
              </el-form-item>
              <el-form-item label="职业" prop="profession">
                <el-input v-model="formDate.profession"/>
              </el-form-item>
              <el-form-item label="邮编" prop="zipCode">
                <el-input v-model="formDate.zipCode"/>
              </el-form-item>
            </div>
          </div>
          <div class="form-item-right">
            <el-form-item label="姓名" prop="nickName">
              <el-input v-model="formDate.nickName"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input v-model="formDate.checkPassword" show-password autocomplete="off"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formDate.email"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formDate.remark"/>
            </el-form-item>
            <div v-if="formDate.role === 2">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="formDate.address"/>
              </el-form-item>
              <el-form-item label="身份证" prop="idCard">
                <el-input v-model="formDate.idCard"/>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-row-btn">
          <el-button type="primary" @click="submitForm('formRegister')">提交</el-button>
          <el-button @click="resetForm('formRegister')">重置</el-button>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  import addressSelection from "../components/addressSelection";

  export default {
    name: "register",
    components: {
      addressSelection
    },
    data() {
      return {
        formDate: {
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
        roleList: []
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
        this.utils.request(options);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("formDate", this.formDate)
            let options = {
              url: this.config.service.userRegister,
              data: this.formDate,
              success: res => {
                res = res.data
                console.log("res", res)
                if (res.status === 200) {
                  this.$message({
                    message: res.data,
                    type: 'success'
                  })
                  this.$router.push({path: '/login'});
                } else {
                  this.$message({
                    message: res.data,
                    type: 'warning'
                  })
                }
              },
              fail: res => {
                console.error(res);
              }
            }
            console.log("options", options)
            this.utils.submit(options);
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .el-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .back {
    margin-top: 50px;
  }

  .register {
    margin-top: 100px;
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
</style>
