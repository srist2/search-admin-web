<template>
  <el-container>
    <div class="box-charts">
      <div class="box-row">
        <line-bar/>
        <pie-rose-type/>
      </div>
      <div class="box-row">
        <sankey-seek/>
        <sankey-miss/>
      </div>
    </div>
  </el-container>
</template>

<script>
  import chartsLineBar from '../components/charts/line-bar'
  import LineBar from "../components/charts/line-bar";
  import PieRoseType from "../components/charts/pie-roseType";
  import SankeySeek from "../components/charts/sankey-seek";
  import SankeyMiss from "../components/charts/sankey-miss";

  export default {
    name: 'index',
    components: {
      SankeyMiss,
      SankeySeek,
      PieRoseType,
      LineBar,
      chartsLineBar
    },
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

  .box-charts {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .box-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
