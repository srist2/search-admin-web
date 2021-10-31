<template>
  <el-container>
    <el-row type="flex" style="height: 100%; width: 100%;">
        <div :style="{'width':canvasWidth/2 + 'px', 'height': canvasHeight + 'px'}" id="canvas"></div>
        <div :style="{'width':canvasWidth/2 + 'px', 'height': canvasHeight + 'px'}" id="canvas2"></div>
    </el-row>
  </el-container>
</template>

<script>
  import 'echarts/map/js/china.js'
  import './vintage.js'
  // import utils from '@/utils/utils'
  let utils = require('../../utils/utils')

  export default {
    data() {
      return {
        canvasWidth: 0,
        canvasHeight: 0,
        //echart data
        dataList: [
          {
            name: "南海诸岛",
            value: 100,
            eventTotal:100,
            specialImportant:10,
            import:10,
            compare:10,
            common:40,
            specail:20
          },
          {
            name: "北京",
            value: 540
          },
          {
            name: "河北",
            value: 130
          },
          {
            name: "河南",
            value: 830
          },
          {
            name: "云南",
            value: 110
          },

          {
            name: "广西",
            value: 33
          },

          {
            name: "福建",
            value: 18
          },
          {
            name: "贵州",
            value: 5
          },
          {
            name: "广东",
            value: 98
          },
        ]
      }
    },
    methods: {
      init() {
        let weight = utils.getWeight(21, 24)
        this.canvasWidth = weight.width;
        this.canvasHeight = weight.height;
      },
      myChart() {
        let myChart = this.$echarts.init(document.getElementById('canvas'));
        let myChart2 = this.$echarts.init(document.getElementById('canvas2'), 'vintage');
        let options = {
          title: {
            text: '志愿者统计'
          },
          tooltip: {
            triggerOn: "mousemove",   //mousemove、click
            padding:8,
            borderWidth:1,
            borderColor:'#409eff',
            backgroundColor:'rgba(255,255,255,0.7)',
            textStyle:{
              color:'#000000',
              fontSize:13
            },
            formatter: (e, t, n) => {
              let data = e;
              //模拟数据
              data.specialImportant = Math.random()*1000 | 0;
              data.import = Math.random()*1000 | 0;
              data.compare = Math.random()*1000 | 0;
              data.common = Math.random()*1000 | 0;
              data.specail = Math.random()*1000 | 0;

              let context = `
               <div>
                   <p><b style="font-size:15px;">${data.name}</b>志愿者统计</p>
                   <p class="tooltip_style"><span class="tooltip_left">总数</span><span class="tooltip_right">${data.value}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">职业种类</span><span class="tooltip_right">${data.specialImportant}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">覆盖率</span><span class="tooltip_right">${data.import}</span></p>
               </div>
            `
              return context;
            },
            visualMap: {
              show:true,
              left: 26,
              bottom: 40,
              showLabel:true,
              pieces: [
                {
                  gte: 100,
                  label: ">= 1000",
                  color: "#1f307b"
                },
                {
                  gte: 500,
                  lt: 999,
                  label: "500 - 999",
                  color: "#3c57ce"
                },
                {
                  gte: 100,
                  lt:499,
                  label: "100 - 499",
                  color: "#6f83db"
                },
                {
                  gte: 10,
                  lt: 99,
                  label: "10 - 99",
                  color: "#9face7"
                },
                {
                  lt:10,
                  label:'<10',
                  color: "#bcc5ee"
                }
              ]
            },
          },
          geo: {
            map: "china",
            scaleLimit: {
              min: 1,
              max: 2
            },
            zoom: 1,
            top: 120,
            label: {
              normal: {
                show:true,
                fontSize: "14",
                color: "rgba(0,0,0,0.7)"
              }
            },
            itemStyle: {
              normal: {   //背景设置
                // shadowBlur: 50,
                // shadowColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {   //鼠标选择区域颜色
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
              }
            }
          },
          series: [
            {
              name: "突发事件",
              type: "map",
              geoIndex: 0,
              data:[]
            }
          ]
        }
        // 用 option 描述 `数据`、`数据如何映射成图形`、`交互行为` 等。
        let sizeValue = '57%';
        let symbolSize = 2.5;
        let options2 = {
          title: {
            text: '登记数量',
            textStyle: {
              fontSize: '20'
            },
            x:'right',
            y:'top',
          },
          // 提示框组件
          tooltip: [
            {right: sizeValue, bottom: sizeValue},
            {left: sizeValue, bottom: sizeValue},
            {right: sizeValue, top: sizeValue},
            {left: sizeValue, top: sizeValue}
          ],
          //  定位设置
          grid: {
            bottom: 50
          },
          // 数据设置
          dataset: {
            // 提供一份数据。
            dimensions: ['product', '2015', '2016', '2017'],
            source: [
              {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
              {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
              {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
              {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
            ]
          },
          legend: {},
          // 直角坐标系 X 轴
          xAxis: {
            type: 'category'
          },
          // 直角坐标系 Y 轴
          yAxis: {

          },
          // 系列
          series: [
            {
              type: 'bar',
              radius: 50,
              encode: {
                x: 0, y: 4
              },
              symbolSize: 2.5,
              xAxisIndex: 1,
              yAxisIndex: 1,
            },
            { // 饼图
              type: 'pie',
              center: ['65%', 60],
              radius: 35,
              roseType: 'angle'
            }
          ]
        }
        myChart.setOption(options);
        myChart2.setOption(options2);
        options.series[0]['data'] = this.dataList;
      }
    },
    created() {
      this.init();
    },
    mounted() {
      this.myChart();
    }
  };
</script>

<style scoped>

</style>
