<template>
  <div id="districtMap"></div>
</template>

<script>
  import 'echarts/map/js/china.js'
  import './vintage.js'

  export default {
    name: "districtMap",
    data() {
      return{
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
        let option = {
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
            top: 10,
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
        let main = document.getElementById("districtMap");
        this.$echarts.init(main).setOption(option);
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
  #districtMap {
    width: 800px;
    height: 450px;
  }
</style>
