<template>
  <el-container>
    <el-main style="mix-height: 700px;">
      <el-table :data="listNest(tableData)" :default-sort="{prop: 'date', order: 'ascending'}">
        <el-table-column prop="date" label="日期" width="140" sortable>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
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
              <el-table
                :show-header="false"
                :data="showData(scope.row)"
                border
                style="width: 600px;"
                :row-style="rowStyle"
              >
                  <el-table-column prop="name" label="姓名"/>
                  <el-table-column prop="address" label="地址"/>
                <el-table-column prop="date" label="日期"/>
              </el-table>
              <el-button type="text" slot="reference" size="small">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="sizes, prev, pager, next, jumper"
        background
        :total="tableData.length"
        :current-page="1"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        @next-click="handleNextClick"
        @prev-click="handlePrevClick"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        // 总数据
        tableData: [],
        // 默认显示第几页
        currentPage: 1,
        // 总条数
        totalCount: 0,
        // 个数选择器
        pageSizes: [10, 20, 30],
        // 默认每页显示的条数
        pageSize: 10,
        uerName: '王小虎'
      }
    },
    methods: {
      getData() {
        for (let i = 0; i < 20; i++) {
          this.tableData[i] = {
            date: '2016-05-02',
            name: '王小虎',
            address: `上海市普陀区金沙江路 ${1518 + i} 弄`
          }
        }
        this.totalCount = this.tableData.length;
      },
      handleCommand(command) {
        if (command === 'set') {
          this.$router.push({path: '/test'})
        }
      },
      listNest(tableData) {
        return tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      },
      // 下一页
      handleNextClick() {
        this.currentPage++;
      },
      // 上一页
      handlePrevClick() {
        this.currentPage--;
      },
      // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.pageSize = val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage = 1
      },
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage = val
      },
      showData(data) {
        return [data]
      },
      rowStyle({row, rowIndex}) {
        if (rowIndex == 0) {
          return "background:#f3f6fc;";
        } else {
          return "background:#ffffff;";
        }
      }
    },
    created() {
      this.getData();
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    color: #333;
  }
</style>
