<template>
  <el-container>
    <div class="header-box">
      <breadcrumb/>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions title="失踪者信息" border :column="4">
            <el-descriptions-item label="编号">{{props.row.infoAndContactVo.infoId}}</el-descriptions-item>
            <el-descriptions-item label="姓名" :span="2">{{props.row.infoAndContactVo.infoName}}</el-descriptions-item>
            <el-descriptions-item label="性别">{{formatType('sex', props.row.infoAndContactVo.infoSex)}}</el-descriptions-item>
            <el-descriptions-item label="籍贯" :span="2">{{props.row.infoAndContactVo.infoHometown}}</el-descriptions-item>
            <el-descriptions-item label="寻找类型">{{formatType('seek', props.row.infoAndContactVo.infoSeekType)}}</el-descriptions-item>
            <el-descriptions-item label="失踪类型">{{formatType('miss', props.row.infoAndContactVo.infoMissType)}}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{props.row.infoAndContactVo.infoDateBirth}}</el-descriptions-item>
            <el-descriptions-item label="失踪日期">{{props.row.infoAndContactVo.infoDateMiss}}</el-descriptions-item>
            <el-descriptions-item label="失踪时身高" :span="2">{{props.row.infoAndContactVo.infoMissHigh}}</el-descriptions-item>
            <el-descriptions-item label="相貌特征及身世描述" :span="2">{{props.row.infoAndContactVo.infoDescribe}}</el-descriptions-item>
            <el-descriptions-item label="失踪者照片/近照">
              <el-empty :image="props.row.infoAndContactVo.infoAvatar" style="width: 190px; height: 190px;" description="description">
                <template slot="description">
                  <span>{{props.row.infoAndContactVo.infoAvatar ? '' : '暂无上传'}}</span>
                </template>
              </el-empty>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="联系人信息" border class="dec-content" :column="4">
            <el-descriptions-item label="编号">{{props.row.infoAndContactVo.contactPerson.contactId}}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{props.row.infoAndContactVo.contactPerson.ctName}}</el-descriptions-item>
            <el-descriptions-item label="电话">{{props.row.infoAndContactVo.contactPerson.ctPhone}}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱" :span="2">{{props.row.infoAndContactVo.contactPerson.ctEmail}}</el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">{{props.row.infoAndContactVo.contactPerson.ctAddress}}</el-descriptions-item>
            <el-descriptions-item label="邮政编码">{{props.row.infoAndContactVo.contactPerson.ctZipCode}}</el-descriptions-item>
            <el-descriptions-item label="备注">{{props.row.infoAndContactVo.contactPerson.ctRemark}}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="认领人信息" border class="dec-content" :column="4">
            <el-descriptions-item label="编号">{{props.row.claimId}}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{props.row.claimName}}</el-descriptions-item>
            <el-descriptions-item label="电话">{{props.row.phone}}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱" :span="2">{{props.row.email}}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column label="认领人编号" prop="claimId"/>
      <el-table-column label="认领人姓名" prop="claimName"/>
      <el-table-column label="寻人信息编号" prop="infoId"/>
      <el-table-column label="失踪者姓名">
        <template slot-scope="scope">
          <p>{{scope.row.infoAndContactVo.infoName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="联系人姓名">
        <template slot-scope="scope">
          <p>{{scope.row.infoAndContactVo.contactPerson.ctName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="showPassModal(scope.row)" type="text" size="small">审核通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 提示模态框 -->
    <modal-common ref="modalCommon" :modalData="modalData"/>
  </el-container>
</template>

<script>
  import breadcrumb from "../../components/breadcrumb";
  import modalCommon from "../../components/modal/common";
  import {findClaim} from '@/api/missInformation';

  const config = require('@/config.js')
  let utils = require('@/utils/utils')

  export default {
    name: "missClaim",
    components: {
      breadcrumb,
      modalCommon
    },
    data() {
      return {
        tableData: [],
        infoData: {},
        modalData: {}
      }
    },
    methods: {
      init() {
        this.refresh();
      },
      refresh() {
        findClaim().then(res => {
          console.log("res", res);
          if (res.data.status === 200) {
            this.tableData = res.data.data;
          }
        })
      },
      formatType(type, row) {
        return utils.formatTypeByMiss(type, row);
      },
      showPassModal(row) {
        this.modalData = {
          title: '提示',
          context: '是否通过审核',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancel: true,
          confirm: () => {
            let data = {
              claimId: row.claimId,
              isPass: 1
            }
            this.reviewSubmit(data);
          },
          close: () => {
            let data = {
              claimId: row.claimId,
              isPass: 2
            }
            console.log("Data",data)
            this.reviewSubmit(data);
          }
        }
        this.$refs.modalCommon.show();
      },
      reviewSubmit(data) {
        let options = {
          url: config.service.updateIsPass,
          data: data,
          success: res => {
            if (res.data.status === 200) {
              this.$refs.modalCommon.hide();
              this.refresh();
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            }
          },
          fail: res => {
            console.warn("res-err", res)
          }
        }
        console.log("options", options)
        utils.submit(options);
      }
    },
    created() {
      this.init();
    }
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

  .el-container {
    display: flex;
    flex-direction: column;
    min-height: 760px;
  }
</style>
