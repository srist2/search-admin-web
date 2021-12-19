<template>
  <el-container>
    <div class="header-box">
      <breadcrumb/>
      <el-button class="btn-add" type="primary" icon="el-icon-edit" size="medium" @click="showUpdateModal()">添加
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions title="失踪者信息" border :column="4">
            <el-descriptions-item label="编号">{{props.row.infoId}}</el-descriptions-item>
            <el-descriptions-item label="姓名" :span="2">{{props.row.infoName}}</el-descriptions-item>
            <el-descriptions-item label="性别">{{formatType('sex', props.row.infoSex)}}</el-descriptions-item>
            <el-descriptions-item label="籍贯" :span="2">{{props.row.infoHometown}}</el-descriptions-item>
            <el-descriptions-item label="寻找类型">{{formatType('seek', props.row.infoSeekType)}}</el-descriptions-item>
            <el-descriptions-item label="失踪类型">{{formatType('miss', props.row.infoMissType)}}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{props.row.infoDateBirth}}</el-descriptions-item>
            <el-descriptions-item label="失踪日期">{{props.row.infoDateMiss}}</el-descriptions-item>
            <el-descriptions-item label="失踪时身高" :span="2">{{props.row.infoMissHigh}}</el-descriptions-item>
            <el-descriptions-item label="相貌特征及身世描述" :span="2">{{props.row.infoDescribe}}</el-descriptions-item>
            <el-descriptions-item label="失踪者照片/近照" :span="4">
              <el-empty :image="props.row.infoAvatar" style="width: 190px; height: 190px;" description="description">
                <template slot="description" >
                  <span>{{props.row.infoAvatar ? '' : '暂无上传'}}</span>
                </template>
              </el-empty>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="联系人信息" border class="dec-content" :column="4">
            <el-descriptions-item label="编号">{{props.row.contactPerson.contactId}}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{props.row.contactPerson.ctName}}</el-descriptions-item>
            <el-descriptions-item label="电话">{{props.row.contactPerson.ctPhone}}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱" :span="2">{{props.row.contactPerson.ctEmail}}</el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">{{props.row.contactPerson.ctAddress}}</el-descriptions-item>
            <el-descriptions-item label="邮政编码">{{props.row.contactPerson.ctZipCode}}</el-descriptions-item>
            <el-descriptions-item label="备注">{{props.row.contactPerson.ctRemark}}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column label="寻人信息编号" prop="infoId">
      </el-table-column>
      <el-table-column label="失踪者姓名" prop="infoName">
      </el-table-column>
      <el-table-column label="相貌特征及身世描述" prop="infoDescribe">
      </el-table-column>
      <el-table-column label="联系人姓名">
        <template slot-scope="scope">{{scope.row.contactPerson.ctName}}</template>
      </el-table-column>
      <el-table-column label="发表启事" prop="infoDescribe">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.infoIsShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :inactive-value="2"
            :active-value="1"
            @change="changeUserStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="showUpdateModal(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 更新模态框 -->
    <modal-base ref="modalBaseUpdate">
      <el-form :model="form" ref="form" class="form-box" label-position="left"
               label-width="120px">
        <div class="form-item-title">失踪者信息</div>
        <div class="form-item">
          <div class="form-item-left">
            <el-form-item label="姓名" prop="infoName">
              <el-input v-model="form.infoName"/>
            </el-form-item>
            <el-form-item label="性别" prop="infoSex">
              <el-select v-model="form.infoSex" placeholder="请选择">
                <el-option
                  v-for="item in sexDictList"
                  :key="item.dict_id"
                  :label="item.dict_name"
                  :value="item.dict_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="籍贯" prop="infoHometown">
              <el-input v-model="form.infoHometown"/>
            </el-form-item>
            <el-form-item label="失踪时身高" prop="infoMissHigh">
              <el-input v-model="form.infoMissHigh"/>
            </el-form-item>
            <el-form-item label="相貌特征及身世描述" prop="infoDescribe">
              <el-input v-model="form.infoDescribe"/>
            </el-form-item>
          </div>
          <div class="form-item-right">
            <el-form-item label="寻找类型" prop="infoSeekType">
              <el-select v-model="form.infoSeekType" placeholder="请选择">
                <el-option
                  v-for="item in seekTypeList"
                  :key="item.dict_id"
                  :label="item.dict_name"
                  :value="item.dict_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="失踪类型" prop="infoMissType">
              <el-select v-model="form.infoMissType" placeholder="请选择">
                <el-option
                  v-for="item in missTypeList"
                  :key="item.dict_id"
                  :label="item.dict_name"
                  :value="item.dict_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="infoDateBirth">
              <el-date-picker
                v-model="form.infoDateBirth"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="失踪日期" prop="infoDateMiss">
              <el-date-picker
                v-model="form.infoDateMiss"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="上传头像" prop="infoAvatar">
              <ImgUpload ref="imgUpload" :imgUrl.sync="imageUrl"/>
            </el-form-item>
          </div>
        </div>
        <div class="form-item-title">联系人信息</div>
        <div class="form-item">
          <div class="form-item-left">
            <el-form-item label="姓名">
              <el-input v-model="form.contactPerson.ctName"/>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="form.contactPerson.ctEmail"/>
            </el-form-item>
            <el-form-item label="邮政编码">
              <el-input v-model="form.contactPerson.ctZipCode"/>
            </el-form-item>
          </div>
          <div class="form-item-right">
            <el-form-item label="电话">
              <el-input v-model="form.contactPerson.ctPhone"/>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="form.contactPerson.ctAddress"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.contactPerson.ctRemark"/>
            </el-form-item>
          </div>
        </div>
        <div class="form-row-btn">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </div>
      </el-form>
    </modal-base>
    <!-- 删除模态框 -->
    <modal-common ref="modalCommon" :modalData="modalDelete"/>
  </el-container>
</template>

<script>
  import breadcrumb from "../../components/breadcrumb";
  import modalBase from "../../components/modal/base";
  import ImgUpload from "../../components/ImgUpload";
  import modalCommon from "../../components/modal/common";
  import {findInformationAll} from '@/api/missInformation';
  import {findMissDict, findSeekDict} from '@/api/dict';

  export default {
    name: "missInformation",
    components: {
      breadcrumb,
      modalBase,
      ImgUpload,
      modalCommon
    },
    data() {
      return {
        tableData: [],
        form: {
          contactPerson: {}
        },
        imageUrl: '',
        isSubmit: false,
        seekTypeList: [],
        missTypeList: [],
        sexDictList: [
          {
            dict_id: 1,
            dict_name: "男"
          },
          {
            dict_id: 2,
            dict_name: "女"
          }
        ],
        isAdd: false,
        modalDelete: {}
      }
    },
    methods: {
      // 初始化加载数据
      init() {
        this.refresh();
        // 获取失踪类型字典
        findMissDict().then(res => {
          this.missTypeList = res.data.data;
        })
        // 获取寻找类型字典
        findSeekDict().then(res => {
          this.seekTypeList = res.data.data;
        })
      },
      // 刷新列表数据
      refresh() {
        findInformationAll().then(res => {
          console.log("res", res);
          if (res.data.status === 200) {
            this.tableData = res.data.data;
          }
        })
      },
      // 重置表单信息
      reset() {
        this.form = {
          infoId: '',
          infoName: '',
          infoSex: '',
          infoHometown: '',
          infoSeekType: '',
          infoMissType: '',
          infoDateBirth: '',
          infoDateMiss: '',
          infoMissHigh: '',
          infoDescribe: '',
          contactPerson: {
            contactId: '',
            ctName: '',
            ctPhone: '',
            ctEmail: '',
            ctAddress: '',
            ctZipCode: '',
            ctRemark: '',
          }
        }
      },
      // 是否发表启示
      changeUserStatus(row) {
        let data = {
          infoId: row.infoId,
          isShow: row.infoIsShow
        }
        let options = {
          url: this.config.service.isShowInformation,
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
            this.refresh();
          },
          fail: res => {
            console.warn("res-err", res)
          }
        }
        this.utils.submit(options);
      },
      // 显示更新/添加模态框
      showUpdateModal(row) {
        // 判断是否为添加/更新
        if (!!row) {
          // row是Object对象类型，如果直接赋值的话，就变成了浅拷贝，复制的是地址，导致在表单中改变值的时候table中的数据也跟着改变，所以要进行深拷贝。
          this.form = JSON.parse(JSON.stringify(row));
        } else {
          this.$refs['form'].resetFields();
          this.reset();
          this.isAdd = true;
        }
        this.$refs.modalBaseUpdate.show();
      },
      // 删除当前行信息
      deleteRow(row) {
        this.modalDelete = {
          title: '提示',
          context: '是否删除这条失踪者信息',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancel: true,
          confirm: () => {
            let data = {
              infoId: row.infoId,
              contactId: row.contactPerson.contactId
            }
            let options = {
              url: this.config.service.deleteInformation,
              data: data,
              success: res => {
                if (res.data.status === 200) {
                  this.$refs.modalCommon.close();
                  this.refresh();
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
            console.log("options", options)
            this.utils.submit(options);
          }
        }
        this.$refs.modalCommon.show();
      },
      // 表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.imgUpload.submit();
            setTimeout(() => {
              this.form.infoAvatar = this.imageUrl;
              this.add();
            }, 300)
          }
        })
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 添加/修改
      add() {
        let url = this.isAdd ? this.config.service.addInformation : this.config.service.updateInformation
        let message = this.isAdd ? "添加成功" : "更新成功"
        let options = {
          url: url,
          data: this.form,
          success: res => {
            if (res.data.status === 200) {
              this.refresh();
              this.isAdd = false;
              this.$refs.modalBaseUpdate.hide();
              this.$message({
                message: message,
                type: 'success'
              });
            }
          },
          error: res => {
            console.error(res)
          }
        }
        this.utils.submit(options);
      },
      // 格式转换
      formatType(type, row) {
        return this.utils.formatTypeByMiss(type, row);
      }
    },
    created() {
      this.init();
    },
  }
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

  .el-descriptions {
    padding: 0 25px;
  }

  .dec-content {
    margin-top: 10px;
  }

  .form-box {
    margin: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-item-title {
    margin-bottom: 20px;
    font-size: 18px;
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
</style>
