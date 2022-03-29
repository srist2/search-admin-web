<template>
  <div id="sankey-seek"></div>
</template>

<script>
  export default {
    name: "sankey-seek",
    props: {
      sankeyList: []
    },
    methods: {
      echartsInit() {
        let data = this.sankeyList
        let option = {
          title: {
            text: '寻找类型'
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          legend: {
            data: ['登记人数', '失踪者人数']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '家寻亲人', max: 50 },
              { name: '亲人寻家', max: 50 },
              { name: '寻找朋友', max: 50 },
              { name: '寻找同学', max: 50 },
              { name: '寻找战友', max: 50 },
              { name: '其他寻找', max: 50 }
            ],
            center: ['50%', '50%'],
            radius: 80
          },
          series: [
            {
              // name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: data,
                  name: '登记人数'
                },
                // {
                //   value: [5, 14, 28, 26, 42, 21],
                //   name: '失踪者人数'
                // }
              ]
            }
          ]
        };
        let main = document.getElementById("sankey-seek");
        this.$echarts.init(main).setOption(option);
      }
    },
    mounted() {
      setTimeout(() => {
        this.echartsInit();
      }, 500)
    }
  }
</script>

<style scoped>
  #sankey-seek {
    width: 300px;
    height: 300px;
  }
</style>
