<template>
  <el-container>
    <div class="back">
      <router-link to="/login"><el-button type="primary" icon="el-icon-back">返回</el-button></router-link>
    </div>
    <div class="register">
      <h3>忘记密码</h3>
      <el-form
        :model="formDate"
        ref="formDate"
        class="form-box"
        label-position="left"
        label-width="80px"
        :rules="rules"
      >
        <div class="form-item">
          <div class="form-item-left">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="formDate.userName"/>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="formDate.password" show-password autocomplete="off"/>
            </el-form-item>
          </div>
          <div class="form-item-right">
            <el-form-item label="邮箱" prop="email" label-width="100px">
              <el-input v-model="formDate.email"/>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPassword" label-width="100px">
              <el-input v-model="formDate.checkPassword" show-password autocomplete="off"/>
            </el-form-item>
          </div>
        </div>
        <div class="form-row-btn">
          <el-button type="primary" @click="submitForm('formDate')">提交</el-button>
          <el-button @click="resetForm('formDate')">重置</el-button>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  import {resetPassword} from '@/api/admin'

  export default {
    name: "reset",
    components: {
    },
    data() {
      // 密码验证
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formDate.checkPassword !== '') {
            this.$refs.formDate.validateField('checkPassword');
          }
          callback();
        }
      };
      // 二次密码验证
      let validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formDate.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        formDate: {
          userId: '',
          userName: '',
          password: '',
          checkPassword: '',
          email: '',
        },
        roleList: [],
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
          email: [
            {type: 'email', required: true, message: '请输入电子邮箱', trigger: 'change'},
            {pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确电子邮箱格式', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      // 初始化数据
      init() {

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("formDate", this.formDate)
            resetPassword({data:this.formDate })
            .then((res) => {
              res = res.data
              console.log('res', res)
              if (res.status == 200) {
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
            })
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
