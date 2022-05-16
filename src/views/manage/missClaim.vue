<template>
  <el-container>
    <div class="header-box">
      <breadcrumb/>
      <!-- 查询条件 -->
      <el-form :model="queryParams" ref="queryForm" :inline="true" style="padding-top: 20px;">
        <el-form-item label="认领人姓名" prop="claimName">
          <el-input
            v-model="queryParams.claimName"
            placeholder="请输入认领人姓名"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="审核类型" prop="isPass">
          <el-select
            v-model="queryParams.isPass"
            placeholder="审核类型"
            size="small"
            clearable
            style="width: 99%;"
            class="cus-select"
          >
            <el-option
              v-for="dept in isPassOptions"
              :key="dept.value"
              :label="dept.label"
              :value="dept.value"
              style="text-align: center;"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      class="table"
      :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      style="width: 100%;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions title="失踪者信息" border :column="4" style="padding: 20px;">
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
          <el-descriptions title="联系人信息" border class="dec-content" :column="4" style="padding: 20px;">
            <el-descriptions-item label="编号">{{props.row.infoAndContactVo.contactPerson.contactId}}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{props.row.infoAndContactVo.contactPerson.ctName}}</el-descriptions-item>
            <el-descriptions-item label="电话">{{props.row.infoAndContactVo.contactPerson.ctPhone}}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱" :span="2">{{props.row.infoAndContactVo.contactPerson.ctEmail}}</el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">{{props.row.infoAndContactVo.contactPerson.ctAddress}}</el-descriptions-item>
            <el-descriptions-item label="邮政编码">{{props.row.infoAndContactVo.contactPerson.ctZipCode}}</el-descriptions-item>
            <el-descriptions-item label="备注">{{props.row.infoAndContactVo.contactPerson.ctRemark}}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="认领人信息" border class="dec-content" :column="4" style="padding: 20px;">
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
      <el-table-column label="申请时间" prop="createTime"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.isPass === 1" class="check-success">审核通过</div>
          <div v-else-if="scope.row.isPass === 2"class="check-file">审核不通过</div>
          <el-button v-else @click="showPassModal(scope.row)" type="text" size="small">认领审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
    <!-- 提示模态框 -->
    <modal-common ref="modalCommon" :modalData="modalData"/>
  </el-container>
</template>

<script>
  import breadcrumb from "../../components/breadcrumb";
  import modalCommon from "../../components/modal/common"
  import pagination from "../../components/pagination"
  import {findClaim, findAllByClaimName} from '@/api/missInformation';

  export default {
    name: "missClaim",
    components: {
      breadcrumb,
      modalCommon,
      pagination
    },
    data() {
      return {
        tableData: [],
        infoData: {},
        modalData: {},
        // 分页信息
        total: 0,
        pageNum: 1,
        pageSize: 10,
        // 查询参数
        queryParams: {
          claimName: '',
          isPass: 0
        },
        // 审核字典
        isPassOptions: [
          {
            label: '待审核',
            value: 0
          },
          {
            label: '通过',
            value: 1
          },
          {
            label: '不通过',
            value: 2
          }
        ]
      }
    },
    methods: {
      init() {
        this.refresh();
      },
      refresh() {
        findClaim().then(res => {
          if (res.data.status === 200) {
            let list = res.data.data.sort((a, b) => {
              //正序a-b
              return new Date(b.createTime) - new Date(a.createTime)
            });
            console.log('list', list)
            this.tableData = list;
            this.total = this.tableData.length
          }
        })
      },
      formatType(type, row) {
        return this.utils.formatTypeByMiss(type, row);
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
              isPass: 1,
              email: row.email,
              infoId: row.infoId
            }
            this.reviewSubmit(data);
            this.$refs.modalCommon.hide();
          },
          close: () => {
            let data = {
              claimId: row.claimId,
              email: row.email,
              infoId: row.infoId,
              isPass: 2
            }
            this.reviewSubmit(data);
            this.$refs.modalCommon.hide();
          }
        }
        this.$refs.modalCommon.show();
      },
      reviewSubmit(data) {
        let options = {
          url: this.config.service.updateIsPass,
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
        this.utils.submit(options);
      },
      // 为审核添加背景样式
      tableRowClassName({row, rowIndex}) {
        if (row.isPass === 1) {
          return 'row-success';
        } else if (row.isPass === 2) {
          return 'row-file'
        }
        return '';
      },
      // 搜索按钮操作
      handleQuery() {
        findAllByClaimName(this.queryParams).then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.data.length
        })
      },
      // 重置按钮操作
      resetQuery() {
        this.$refs['queryForm'].resetFields();
        this.refresh();
      },
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

  .table >>> .row-success {
    background: #f0f9eb;
  }

  .table >>> .row-file {
    background: #ffd8dc;
  }

  .check-success, .check-file {
    font-size: 16px;
    font-weight: bold;
  }

  .check-success {
    color: #0cb511;
  }

  .check-file {
    color: #c91d1d;
  }
</style>
