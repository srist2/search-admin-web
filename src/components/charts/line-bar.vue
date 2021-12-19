<template>
  <div id="line-bar"></div>
</template>

<script>
  export default {
    name: "line-bar",
    methods: {
      echartsInit() {
        let option = {
          title: {
            text: '登记失踪/发表启示统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#5470c6'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: false, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: false },
            },
          },
          legend: {
            data: ['登记失踪者人数', '发表启示人数']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '登记失踪者人数',
              min: 0,
              max: 260,
              interval: 20,
              axisLabel: {
                formatter: '{value} '
              }
            },
            {
              type: 'value',
              name: '发表启示人数',
              min: 0,
              max: 260,
              interval: 20,
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
          series: [
            {
              name: '登记失踪者人数',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              color: '#5470c6'
            },
            {
              name: '发表启示人数',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
              color: '#91cc75'
            }
          ]
        };
        let main = document.getElementById("line-bar");
        this.$echarts.init(main).setOption(option);
      }
    },
    mounted() {
      this.echartsInit();
    }
  }
</script>

<style scoped>
  #line-bar {
    width: 650px;
    height: 450px;
  }
</style>
