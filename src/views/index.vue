<template>
  <el-container>
    <div class="box-charts">
      <h1>寻人信息展示</h1>
      <div class="left-box">
<!--        <div class="left-item">-->
<!--          <districtMap/>-->
<!--        </div>-->
        <div class="left-item">
          <sankey-miss :sankeyList="structureList.sankeyList"/>
        </div>
      </div>
      <div class="right-box">
        <h3>系统用户结构</h3>
        <div class="right-item">
          <pie-rose-type ref="pieRoseType" :pieRoseDate="structureList.pieRoseDate"/>
        </div>
<!--        <h3>失踪者登记人数</h3>-->
        <div class="right-item">
          <sankey-seek :sankeyList="structureList.seekList"/>
<!--          <line-bar/>-->
        </div>
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
  import districtMap from "../components/charts/districtMap";

  import {getDateStructure} from '@/api/index'
  import {findMissDict} from '@/api/dict'

  export default {
    name: 'index',
    components: {
      SankeyMiss,
      SankeySeek,
      PieRoseType,
      LineBar,
      chartsLineBar,
      districtMap
    },
    data() {
      return {
        structureList: {
          pieRoseDate: {},
          sankeyList: [],
          seekList: []
        },
        missTypeList: [],
        seekType: ['家寻亲人','亲人寻家','寻找朋友','寻找同学','寻找战友','其他寻找']
      }
    },
    methods: {
      // 统计数量
      missTypeSum(missType, sexType) {
        let temp = []
        // 去重
        let text = this.utils.timeRepet(missType)
        let source = sexType ? '男性' : '女性'
        text.map((item) => {
          if (item.name) {
            let name = this.utils.missTypeFormat(parseInt(item.name))
            temp.push({target: name, value: item.num, source: source})
          }
        })
        return temp
      },
      // 寻找类型数据
      seekTypeSum(missType) {
        let temp = []
        let text = this.utils.timeRepet(missType)
        text.map((item) => {
          if (item.name) {
            let name = this.utils.seekTypeFormat(parseInt(item.name))
            temp.push({target: name, value: item.num})
          }
        })
        let seekList = []
        let seekType = this.seekType
        for (let i = 0; i< seekType.length; i++) {
          temp.map((item) => {
            if (item.target == seekType[i]) {
              seekList[i] = item.value
            }
          })
        }
        for(let i = 0; i< seekList.length; i++) {
          if (!seekList[i]) {
            seekList[i] = 0
          }
        }
        return seekList
      }
    },
    created() {
      getDateStructure()
      .then(res => {
        res = res.data
        console.log('res', res)
        if (res.status == 200) {
          let list = []
          // 饼图数据
          this.structureList.pieRoseDate = res.data
          // 桑葚图数据
          let manList = this.missTypeSum(res.data.missManTypeLists, true)
          let womanList = this.missTypeSum(res.data.missWomanTypeLists, false)
          manList = manList.concat(womanList)
          list.push({source: '失踪者类型', target: '男性', value: res.data.missManNumber})
          list.push({source: '失踪者类型', target: '女性', value: res.data.missWomanNumber})
          list = list.concat(manList)
          this.structureList.sankeyList = list

          let seekList = this.seekTypeSum(res.data.seekTypeLists)
          this.structureList.seekList = seekList
          console.log('seekList', seekList)
        }
      })
    }
  };
</script>

<style>
  .el-header {
    color: #fff;
  }

  .el-aside {
    color: #333;
  }

  .box-charts {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .right-item, .left-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .left-box {
    width: 1000px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .right-box {
    width: 400px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px #b8b8b8 solid;
    position: absolute;
    top: 20px;
    right: 50px;
    box-shadow: 4px 4px 8px 12px #b8b8b8;
  }

  .box-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
