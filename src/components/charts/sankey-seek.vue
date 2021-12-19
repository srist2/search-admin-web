<template>
  <div id="sankey-seek"></div>
</template>

<script>
  export default {
    name: "sankey-seek",
    methods: {
      echartsInit() {
        let option = {
          title: {
            text: 'Basic Radar Chart'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['登记人数', '失踪者人数']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '家寻亲人', max: 100 },
              { name: '亲人寻家', max: 100 },
              { name: '寻找朋友', max: 100 },
              { name: '寻找同学', max: 100 },
              { name: '寻找战友', max: 100 },
              { name: '其他寻找', max: 100 }
            ],
            center: ['25%', '40%'],
            radius: 80
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [42, 30, 20, 35, 50, 18],
                  name: '登记人数'
                },
                {
                  value: [5, 14, 28, 26, 42, 21],
                  name: '失踪者人数'
                }
              ]
            }
          ]
        };
        let main = document.getElementById("sankey-seek");
        this.$echarts.init(main).setOption(option);
      }
    },
    mounted() {
      this.echartsInit();
    }
  }
</script>

<style scoped>
  #sankey-seek {
    width: 650px;
    height: 550px;
  }
</style>
