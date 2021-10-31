<template>
  <el-container>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions title="失踪者信息">
            <el-descriptions-item label="姓名">{{props.row.infoName}}</el-descriptions-item>
            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
          <el-form label-position="left" inline class="table-expand">


            <!--失踪者信息-->
<!--            <el-form-item class="title-item" label="失踪者信息" style="width: 100%;"/>-->
<!--            <div class="item-left">-->
<!--              <el-form-item label="失踪者照片/近照">-->
<!--                &lt;!&ndash;              <el-empty :image-size="200" :image="props.row.infoAvatar"></el-empty>&ndash;&gt;-->
<!--                <el-skeleton-item variant="image" style="width: 180px; height: 180px;" />-->
<!--              </el-form-item>-->
<!--            </div>-->
<!--            <div class="item-right">-->
<!--              <el-form-item label="编号">-->
<!--                <span>{{props.row.infoId}}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="姓名">-->
<!--                <span>{{props.row.infoName}}</span>-->
<!--              </el-form-item>-->
<!--            </div>-->

<!--            <el-form-item label="性别">-->
<!--              <span>{{props.row.infoSex}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="籍贯">-->
<!--              <span>{{props.row.infoHometown}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="寻找类型">-->
<!--              <span>{{props.row.infoSeekType}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="失踪类型">-->
<!--              <span>{{props.row.infoMissType}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="出生日期">-->
<!--              <span>{{props.row.infoDateBirth}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="失踪日期">-->
<!--              <span>{{props.row.infoDateMiss}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="失踪时身高">-->
<!--              <span>{{props.row.infoMissHigh}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="相貌特征及身世描述">-->
<!--              <span>{{props.row.infoDescribe}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item class="title-item" label="联系者信息" style="width: 100%;"/>-->
<!--            &lt;!&ndash;联系人信息&ndash;&gt;-->
<!--            <el-form-item label="联系人编号">-->
<!--              <span>{{props.row.contactPerson.contactId}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="姓名">-->
<!--              <span>{{props.row.contactPerson.ctName}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="电话">-->
<!--              <span>{{props.row.contactPerson.ctPhone}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="电子邮箱">-->
<!--              <span>{{props.row.contactPerson.ctEmail}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="联系地址">-->
<!--              <span>{{props.row.contactPerson.ctAddress}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="邮政编码">-->
<!--              <span>{{props.row.contactPerson.ctZipCode}}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="备注">-->
<!--              <span>{{props.row.contactPerson.ctRemark}}</span>-->
<!--            </el-form-item>-->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="寻人信息编号"
        prop="infoId">
      </el-table-column>
      <el-table-column
        label="失踪者姓名"
        prop="infoName">
      </el-table-column>
      <el-table-column
        label="相貌特征及身世描述"
        prop="infoDescribe">
      </el-table-column>
      <el-table-column
        label="发表启事"
        prop="infoDescribe">
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
        width="150">
        <template slot-scope="scope">
          <el-button @click="showUpdateModal(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 更新模态框 -->
    <modal-base ref="modalBaseUpdate">
      <el-form :model="updateMessage" ref="updateMessage" class="form-box" label-position="left"
               label-width="80px">
        <div>xxxx</div>
      </el-form>
    </modal-base>
  </el-container>
</template>

<script>
  import breadcrumb from "../../components/breadcrumb";
  import modalBase from "../../components/modal/base";

  const config = require('@/config.js')
  let utils = require('@/utils/utils')

  export default {
    name: "missInformation",
    components: {
      // breadcrumb,
      modalBase
    },
    data() {
      return {
        tableData: [],
        updateMessage: {},
      }
    },
    methods: {
      init() {
        this.refresh();
      },
      refresh() {
        let options = {
          url: config.service.findInformationAll,
          success: res => {
            console.log("res", res);
            if (res.data.status === 200) {
              this.tableData = res.data.data;
            }
          },
          fail: res => {
            console.error('res', res)
          }
        }
        utils.request(options);
      },
      changeUserStatus() {

      },
      showUpdateModal(row) {
        // row是Object对象类型，如果直接赋值的话，就变成了浅拷贝，复制的是地址，导致在表单中改变值的时候table中的数据也跟着改变，所以要进行深拷贝。
        this.updateMessage = JSON.parse(JSON.stringify(row));
        this.$refs.modalBaseUpdate.show();
      },
      deleteRow() {

      },
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .table-expand {
    font-size: 0;
  }

  .table-expand >>> label {
    width: 20%;
    color: #E67E22;
  }
  .table-expand >>> .content {
    width: 80%;
  }


  .title-item {
    border-bottom: 1px #d3d3d3 solid;
  }

  .title-item >>> label {
    font-size: 18px;
    color: #000;
  }

  .table-expand >>> .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
